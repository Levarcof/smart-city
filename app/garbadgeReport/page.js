"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

export default function GarbageReportPage() {
  const { user } = useUser();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  // ================= LOCATION =================
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject("Geolocation not supported");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await res.json();

            resolve({
              lat,
              lng,
              address: data.display_name || "Unknown location",
            });
          } catch {
            resolve({ lat, lng, address: "Address not found" });
          }
        },
        (err) => reject(err)
      );
    });
  };

  // ================= REMOVE IMAGE =================
  const removeImage = () => {
    setPhotos([]);
    setProgress(0);
  };

  // ================= FILE SELECT =================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempURL = URL.createObjectURL(file);
    setPhotos([{ localURL: tempURL, uploadedURL: null }]);
    await uploadToCloudinary(file, tempURL);
  };

  // ================= CLOUDINARY UPLOAD =================
  const uploadToCloudinary = (file, tempURL) => {
    return new Promise((resolve) => {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      );
      formData.append("folder", "garbage_reports");

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`
      );

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      xhr.onload = () => {
        setLoading(false);
        setProgress(0);

        if (xhr.status === 200) {
          const res = JSON.parse(xhr.responseText);
          setPhotos((prev) =>
            prev.map((p) =>
              p.localURL === tempURL
                ? { ...p, uploadedURL: res.secure_url }
                : p
            )
          );
        }
        resolve();
      };

      xhr.onerror = () => {
        setLoading(false);
        resolve();
      };

      xhr.send(formData);
    });
  };

  // ================= SUBMIT REPORT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❗ Wait until image uploaded
    const uploadedImages = photos
      .filter((p) => p.uploadedURL)
      .map((p) => p.uploadedURL);

    if (photos.length === 0) {
      return alert("❌ Please upload an image first!");
    }

    if (uploadedImages.length === 0) {
      return alert("⏳ Image is still uploading, please wait...");
    }

    setLoading(true);

    try {
      const loc = await getCurrentLocation();
      setLocation(loc);

      const res = await fetch("/api/garbage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user?.name || "Anonymous",
          email: user?.email || "N/A",
          message,
          address: loc.address,
          location: { lat: loc.lat, lng: loc.lng },
          images: uploadedImages, // ✅ FINAL IMAGE URL
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success) {
        alert("✅ Report submitted successfully!");
        setPhotos([]);
        setMessage("");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("❌ Server or location error!");
    }
  };


  // ================= UI =================
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[radial-gradient(circle_at_top,#0f172a,#020617)] text-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-5xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,255,150,0.15)] p-8 md:p-14">

          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Smart Garbage Reporting System
            </h1>
            <p className="text-gray-400 mt-3 text-sm md:text-base">
              AI-enabled civic issue reporting platform 🌍
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-semibold text-gray-300">
                Description / Message
              </label>
              <textarea
                placeholder="Describe the garbage issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full p-4 rounded-xl bg-black/40 border border-green-500/30 text-white outline-none focus:border-green-400 transition"
              />
            </div>

            {/* UPLOAD SECTION */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Upload Box */}
              <div className="border border-dashed border-green-500/40 rounded-2xl p-8 text-center hover:border-green-400 transition group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="text-6xl group-hover:scale-110 transition">
                    📷
                  </div>
                  <p className="text-lg font-semibold text-green-400">
                    Upload Garbage Image
                  </p>
                  <p className="text-xs text-gray-400">
                    High quality image recommended
                  </p>
                </label>
              </div>

              {/* PREVIEW */}
              <div className="flex items-center justify-center">
                {photos.length > 0 ? (
                  <div className="relative group">
                    <img
                      src={photos[0].localURL}
                      className="rounded-2xl w-64 h-44 object-cover border border-green-500/40 shadow-lg"
                    />

                    {/* Status Badge */}
                    <span
                      className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${photos[0].uploadedURL
                        ? "bg-green-500 text-black"
                        : "bg-yellow-400 text-black"
                        }`}
                    >
                      {photos[0].uploadedURL ? "Uploaded" : "Uploading"}
                    </span>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full 
             bg-black/80 text-white text-base font-bold 
             opacity-100 md:opacity-0 md:group-hover:opacity-100 
             hover:bg-red-500 transition"
                    >
                      ✕
                    </button>

                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center md:w-64 md:h-44 px-2 rounded-2xl border border-dashed border-green-500/30 bg-black/40 backdrop-blur-lg text-center gap-2 shadow-lg">
                    <div className="text-5xl hidden md:block animate-pulse">📸</div>
                    <p className="text-sm font-semibold text-green-400">
                      No Image Selected
                    </p>
                    <p className="text-xs hidden md:block text-gray-400">
                      Upload a garbage photo to preview
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PROGRESS BAR */}
            {progress > 0 && (
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {/* LOCATION */}
            {location && (
              <div className="bg-black/50 border border-green-500/30 p-4 rounded-xl text-sm text-green-300">
                📍 {location.address}
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 text-black font-bold text-lg tracking-wide shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit Report"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
