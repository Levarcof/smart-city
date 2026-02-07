"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";

export default function ProfilePage() {
  const { user, setUser } = useUser();

  const [reports, setReports] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("reports");

  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Fetch reports
  useEffect(() => {
    if (!user?.email) return;

    async function fetchReports() {
      try {
        const res = await fetch("/api/myReport", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await res.json();
        setReports(data.reports || []);
      } catch (err) {
        console.log(err);
      }
    }
    fetchReports();
  }, [user]);

  // Update profile
  const updateProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, email }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setEditMode(false);
        alert("Profile updated ✅");
      } else {
        alert("Update failed ❌");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // Remove report
  const removeReport = async (rep) => {
    try {
      const res = await fetch("/api/report/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rep._id, email: user.email }),
      });

      const data = await res.json();
      if (data.success) {
        setReports(data.allReports);
        alert("Report removed ✅");
      } else {
        alert("Failed ❌");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#050b16] text-white overflow-hidden">

        {/* 🌌 BACKGROUND GLOW */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-green-500/20 blur-[140px]"></div>
          <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-emerald-400/20 blur-[140px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-12 grid lg:grid-cols-3 gap-8">

          {/* ================= LEFT PROFILE CARD ================= */}
          <div className="relative bg-gradient-to-br from-green-600/20 to-emerald-500/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent"></div>

            <div className="relative flex flex-col items-center text-center">

              {/* PROFILE IMAGE */}
              <div className="relative group">
                <img
                  src={image || "/default-avatar.png"}
                  alt="profile"
                  className="w-32 h-32 rounded-full border-4 border-green-400 shadow-2xl object-cover transition group-hover:scale-105"
                />
                <button
                  onClick={() => setEditMode(true)}
                  className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-black text-xs px-3 py-1 rounded-full shadow-lg"
                >
                  Edit
                </button>
              </div>

              {/* NAME + EMAIL */}
              <h1 className="mt-4 text-2xl font-bold tracking-wide">
                {user?.name || "Guest User"}
              </h1>
              <p className="text-gray-300 text-sm">{user?.email}</p>

              {/* TOTAL REPORTS ONLY */}
              <div className="mt-6 w-full">
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-2xl p-5 border border-green-500/20 shadow-xl text-center">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Total Reports
                  </p>
                  <h2 className="text-3xl font-extrabold text-green-400 mt-1">
                    {reports.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">

            {/* TABS */}
            <div className="flex gap-4 mb-6">
              {["reports", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                    activeTab === tab
                      ? "bg-green-500 text-black shadow-lg"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* ================= REPORTS TAB ================= */}
            {activeTab === "reports" && (
              <div className="space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-green-400 tracking-wide">
                    Your Reports
                  </h2>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                    Smart City System
                  </span>
                </div>

                {/* EMPTY STATE */}
                {reports.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-3xl">
                      📭
                    </div>
                    <p className="mt-4 text-gray-400 text-sm">
                      No reports submitted yet.
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {reports.map((rep, i) => (
                      <div
                        key={i}
                        className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-green-500/20"
                      >
                        {/* GLOW */}
                        <div className="absolute inset-0 rounded-2xl bg-green-500/10 opacity-0 group-hover:opacity-100 blur-xl transition"></div>

                        <div className="relative z-10">
                          <h3 className="text-lg font-semibold text-green-300">
                            {rep.message}
                          </h3>

                          <p className="text-sm text-gray-400 mt-2">
                            📍 {rep.address}
                          </p>

                          <p className="text-xs text-gray-500 mt-3">
                            {new Date(rep.createdAt).toLocaleString()}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                              Submitted
                            </span>

                            <button
                              onClick={() => removeReport(rep)}
                              className="px-3 py-1 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ================= SETTINGS TAB ================= */}
            {activeTab === "settings" && (
              <div className="text-gray-300 text-sm space-y-3">
                <p>• Account email: {user?.email}</p>
                <p>• Reports are synced with your profile.</p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-3 px-5 py-2 bg-green-500 text-black rounded-lg shadow-lg hover:bg-green-600 transition"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= EDIT PROFILE DRAWER ================= */}
        {editMode && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-end z-50">
            <div className="w-full sm:w-[420px] bg-[#0b1220] border-l border-white/10 p-6 shadow-2xl animate-slideIn">

              <h2 className="text-xl font-bold text-green-400 mb-4">
                Edit Profile
              </h2>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full mb-3 bg-black/40 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Profile Image URL"
                className="w-full mb-3 bg-black/40 border border-white/10 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
              />
              <input
                value={email}
                disabled
                className="w-full mb-3 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-gray-400"
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={updateProfile}
                  disabled={loading}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-black py-2 rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
