"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import Navbar from "../components/Navbar";

// ✅ Leaflet dynamic imports
const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then(m => m.Polyline), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });
const Circle = dynamic(() => import("react-leaflet").then(m => m.Circle), { ssr: false });

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState([]);
  const [center, setCenter] = useState([26.9124, 75.7873]);
  const [allReports, setAllReports] = useState([]);
  const [safeRoute, setSafeRoute] = useState(null);
  const [currentCoord, setCurrentCoord] = useState(null);

  const mapRef = useRef(null);

  // Geocode
  async function geocode(place) {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(place)}`);
    const data = await res.json();
    if (!data.features?.length) throw new Error("Location not found");
    const [lng, lat] = data.features[0].geometry.coordinates;
    return [lat, lng];
  }

  // Current Location
  function getCurrentLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported!");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCurrentCoord([lat, lng]);
        setFrom(`Current Location (${lat.toFixed(5)}, ${lng.toFixed(5)})`);
        setCenter([lat, lng]);
      },
      () => alert("Location access denied!")
    );
  }

  // Distance
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // Count reports
  function countReportsOnRoute(coords, reports) {
    const radius = 2;
    let count = 0;
    for (let rep of reports) {
      const lat = rep.location?.lat;
      const lng = rep.location?.lng;
      if (!lat || !lng) continue;
      for (let [lat2, lng2] of coords) {
        if (getDistance(lat, lng, lat2, lng2) <= radius) {
          count++;
          break;
        }
      }
    }
    return count;
  }

  // Find routes
  async function findRoutes() {
    try {
      if (!from || !to) return alert("Enter both locations");

      let fromCoord = currentCoord ? currentCoord : await geocode(from);
      const toCoord = await geocode(to);
      setCenter(fromCoord);

      const osrmRes = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${fromCoord[1]},${fromCoord[0]};${toCoord[1]},${toCoord[0]}?overview=full&geometries=geojson&alternatives=true`
      );
      const osrmData = await osrmRes.json();
      if (!osrmData.routes?.length) return alert("No routes found");

      const repRes = await fetch("/api/report/all");
      const repData = await repRes.json();
      const reports = repData.reports || repData || [];
      setAllReports(reports);

      const scoredRoutes = osrmData.routes.map((route, index) => {
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
        const score = countReportsOnRoute(coords, reports);
        return { id: index + 1, coords, score };
      });

      const scores = scoredRoutes.map(r => r.score);
      const allSame = scores.every(s => s === scores[0]);
      const minScore = Math.min(...scores);

      const finalRoutes = scoredRoutes.map(r => ({
        ...r,
        color: allSame || r.score === minScore ? "green" : "red",
      }));

      setRoutes(finalRoutes);
      const safest = finalRoutes.find(r => r.color === "green");
      setSafeRoute(safest);
    } catch (err) {
      console.error(err);
      alert("Error fetching routes");
    }
  }

  // Auto-focus map
  useEffect(() => {
    if (!safeRoute || !mapRef.current) return;
    const bounds = safeRoute.coords;
    setTimeout(() => {
      mapRef.current.invalidateSize();
      mapRef.current.fitBounds(bounds, { padding: [80, 80] });
    }, 500);
  }, [safeRoute]);

  // Google Maps
  function followInGoogleMaps() {
    if (!safeRoute) return alert("No safe route found!");
    const start = safeRoute.coords[0];
    const end = safeRoute.coords[safeRoute.coords.length - 1];
    const url = `https://www.google.com/maps/dir/?api=1&origin=${start[0]},${start[1]}&destination=${end[0]},${end[1]}&travelmode=driving`;
    window.open(url, "_blank");
  }

  return (
    <>
      <Navbar />

      {/* Modern Gradient Header */}
      <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-8 shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2">🚦 Safe Route Analyzer</h1>
        <p className="text-center text-white/90 text-lg md:text-xl">Visualize the safest routes with live alerts & minimal risk</p>
      </header>

      {/* Input Controls */}
      <section className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 px-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-6xl">
          <input
            className="flex-1 border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            placeholder="From (Jaipur)"
            value={from}
            onChange={(e) => { setFrom(e.target.value); setCurrentCoord(null); }}
          />
          <button
            onClick={getCurrentLocation}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            📍 Current Location
          </button>
          <input
            className="flex-1 border border-gray-300 rounded-xl p-4 shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            placeholder="To (Delhi)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button
            onClick={findRoutes}
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
          >
            Find Safe Routes
          </button>
        </div>

        {safeRoute && (
          <button
            onClick={followInGoogleMaps}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg mt-4 md:mt-0 transition transform hover:scale-105"
          >
            🗺️ Follow Safest Route
          </button>
        )}
      </section>

      {/* Route Analysis Panel */}
      <section className="mt-8 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold mb-4">🧪 Route Analysis</h3>
          {routes.length === 0 ? (
            <p className="text-gray-500 text-base md:text-lg">No routes yet. Enter locations to analyze safest path.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {routes.map(r => (
                <div
                  key={r.id}
                  className={`p-4 rounded-xl shadow-md border-l-4 border-${r.color === "green" ? "green-500" : "red-500"} hover:shadow-xl transition`}
                >
                  <h4 className="font-semibold text-lg">Route {r.id}</h4>
                  <p>Reports Nearby: <span className={r.color === "green" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{r.score}</span></p>
                  <p>Status: <span className={r.color === "green" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{r.color.toUpperCase()}</span></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-8 px-4 mb-12">
        <div className="max-w-7xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-gray-300">
          <MapContainer
            center={center}
            zoom={10}
            style={{ width: "100%", height: "75vh" }}
            whenCreated={(map) => (mapRef.current = map)}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {routes.map((r, i) => (
              <Polyline
                key={i}
                positions={r.coords}
                pathOptions={{ color: r.color, weight: r.color === "green" ? 6 : 3, opacity: 0.9 }}
              />
            ))}

            {allReports.map((rep, i) => (
              <Marker key={i} position={[rep.location.lat, rep.location.lng]}>
                <Popup>
                  🚨 {rep.message} <br />
                  👤 {rep.name}
                </Popup>
                <Circle center={[rep.location.lat, rep.location.lng]} radius={2000} pathOptions={{ color: "blue", fillOpacity: 0.1 }} />
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </>
  );
}
