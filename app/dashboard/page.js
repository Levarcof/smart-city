"use client"
import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { LayoutDashboard, Search, X } from "lucide-react"

export default function Page() {
  const [reports, setReports] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
  })

  const [adminEmail, setAdminEmail] = useState("")
  const [adminLoading, setAdminLoading] = useState(false)
  const [showAdminModal, setShowAdminModal] = useState(false)

  const fetchReports = async () => {
    const res = await fetch("/api/report/all")
    const data = await res.json()
    setReports(data.reports || [])
  }

  const fetchStats = async () => {
    const res = await fetch("/api/users/state")
    const data = await res.json()
    setStats(data)
  }

  useEffect(() => {
    fetchReports()
    fetchStats()
  }, [])

  const filteredReports = reports.filter((r) => {
    const createdAt = new Date(r.createdAt)
    const today = new Date()

    if (filter === "today") {
      return createdAt.toDateString() === today.toDateString()
    }

    if (filter === "month") {
      const lastMonth = new Date()
      lastMonth.setMonth(today.getMonth() - 1)
      return createdAt >= lastMonth
    }

    if (search) {
      return (
        r.address?.toLowerCase().includes(search.toLowerCase()) ||
        r.message?.toLowerCase().includes(search.toLowerCase()) ||
        r.user?.name?.toLowerCase().includes(search.toLowerCase())
      )
    }

    return true
  })

  const resolveReport = async (id) => {
    if (!confirm("Resolve & delete this report?")) return

    const report = reports.find((r) => r._id === id)
    const email = report?.email

    setLoading(true)
    try {
      const res = await fetch("/api/report/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, email }),
      })
      const data = await res.json()
      if (data.success) fetchReports()
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const createAdmin = async () => {
    if (!adminEmail) return alert("Enter email first")

    setAdminLoading(true)
    try {
      const res = await fetch("/api/makeAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail }),
      })
      const data = await res.json()
      alert(data.message)
      setAdminEmail("")
      setShowAdminModal(false)
      fetchStats()
    } catch (err) {
      console.log(err)
    }
    setAdminLoading(false)
  }

  return (
    <>
      <Navbar />

      {/* ✅ BACKGROUND FULL PAGE FIX */}
      <div
        className="min-h-screen w-full text-white"
        style={{
          background: `
          radial-gradient(1200px 600px at 10% 10%, #064e3b 0%, transparent 40%),
          radial-gradient(800px 400px at 90% 20%, #065f46 0%, transparent 40%),
          #020617
        `,
        }}
      >
        {/* TOP BAR */}
        <div className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 flex justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} className="text-green-400" />
            {/* <h1 className="text-xs sm:text-lg font-bold text-green-300 tracking-wide">
              Enterprise Dashboard
            </h1> */}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative w-[150px] sm:w-[280px]">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <button
              onClick={() => setShowAdminModal(true)}
              className="md:px-3  px-4 py-1  md:py-1.5 text-xs sm:text-sm rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition"
            >
              + Make Admin
            </button>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex gap-2 px-4 sm:px-8 mt-5 flex-wrap">
          {["all", "today", "month"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all
                ${
                  filter === f
                    ? "bg-green-500 text-black shadow-lg"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
            >
              {f === "all"
                ? "All Reports"
                : f === "today"
                ? "Today"
                : "Last 30 Days"}
            </button>
          ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-8 py-6">
          {[
            { label: "Active Reports", value: reports.length },
            { label: "Total Reports", value: reports.length },
            { label: "Total Users", value: stats.totalUsers },
            { label: "Admins", value: stats.totalAdmins },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-4 bg-black/70 border border-white/10 backdrop-blur-xl shadow-lg"
            >
              <p className="text-gray-400 text-xs">{item.label}</p>
              <h2 className="text-2xl sm:text-3xl font-black text-green-400 mt-1">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block mx-4 sm:mx-8 mb-12 rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="flex justify-between items-center px-6 py-3 border-b border-white/10">
            <h2 className="text-sm sm:text-lg font-semibold text-green-300">
              Reports
            </h2>
            <span className="text-xs text-gray-400">
              {filteredReports.length} records
            </span>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-2 text-left">Location</th>
                <th className="px-6 py-2 text-left">Type</th>
                <th className="px-6 py-2 text-left">Date</th>
                <th className="px-6 py-2 text-left">User</th>
                <th className="px-6 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-white/5 hover:bg-green-500/5 transition"
                >
                  <td className="px-6 py-2">{r.address}</td>
                  <td className="px-6 py-2 text-gray-300">{r.message}</td>
                  <td className="px-6 py-2 text-gray-500 text-xs">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-2 text-green-400 font-semibold">
                    {r?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-2 text-right">
                    <button
                      onClick={() => resolveReport(r._id)}
                      className="px-2 py-1 rounded-md bg-red-500/80 hover:bg-red-500 text-xs font-semibold"
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4 px-4 sm:px-8 pb-12">
          {filteredReports.map((r) => (
            <div
              key={r._id}
              className="bg-black/70 border border-white/10 rounded-xl p-4 backdrop-blur-xl shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-green-400 font-semibold text-sm">
                  {r?.name || "Unknown"}
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-2 text-sm">{r.address}</p>
              <p className="text-xs text-gray-400 mt-1">{r.message}</p>

              <button
                onClick={() => resolveReport(r._id)}
                className="mt-3 w-full py-2 rounded-lg bg-red-500/80 text-xs font-semibold"
              >
                Resolve Report
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ ADMIN MODAL WITH CROSS BUTTON */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-[90%] max-w-sm bg-black/80 border border-white/10 rounded-xl p-6 shadow-xl">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              <X size={18} />
            </button>

            <h2 className="text-lg font-bold text-green-400 mb-4">
              Promote User to Admin
            </h2>

            <input
              type="email"
              placeholder="Enter user email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:ring-2 focus:ring-green-500 outline-none text-sm"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowAdminModal(false)}
                className="flex-1 py-2 rounded-lg bg-white/10 text-sm hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                disabled={adminLoading}
                onClick={createAdmin}
                className="flex-1 py-2 rounded-lg bg-green-500 text-black font-semibold text-sm hover:bg-green-400"
              >
                {adminLoading ? "Processing..." : "Make Admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
