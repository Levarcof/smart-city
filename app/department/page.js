"use client";

import React, { useEffect, useState } from "react";
import { Search, Trash2, Calendar, MapPin } from "lucide-react";
import { useUser } from "../context/UserContext";
import DepartmentNavbar from "../components/DepartmentNavbar";

export default function DepartmentReportsPage() {
    const { user } = useUser(); // department user
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all"); // all | today | month

    const [confirmBox, setConfirmBox] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    // 🔥 Fetch reports
    const fetchReports = async () => {
        try {
            setLoading(true);

            const res = await fetch("/api/myReport/garbage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user?.email }),
            });

            const data = await res.json();

            if (data.success) {
                setReports(data.reports);
                setFilteredReports(data.reports);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) fetchReports();
    }, [user]);

    // 🔍 Search + Filter logic
    useEffect(() => {
        let temp = [...reports];

        // search by address
        if (search) {
            temp = temp.filter((r) =>
                r.address.toLowerCase().includes(search.toLowerCase())
            );
        }

        // filter by date
        if (filter !== "all") {
            const now = new Date();

            temp = temp.filter((r) => {
                const created = new Date(r.createdAt);

                if (filter === "today") {
                    return created.toDateString() === now.toDateString();
                }

                if (filter === "month") {
                    const diff = (now - created) / (1000 * 60 * 60 * 24);
                    return diff <= 30;
                }
            });
        }

        setFilteredReports(temp);
    }, [search, filter, reports]);

    // 🗑️ Solve / Delete report
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setConfirmBox(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch("/api/garbage/solve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedId }),
            });

            const data = await res.json();

            if (data.success) {
                setReports((prev) => prev.filter((r) => r._id !== selectedId));
            }
        } catch (err) {
            console.error("Delete Error:", err);
        } finally {
            setConfirmBox(false);
            setSelectedId(null);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">

            <DepartmentNavbar />
            <div className="min-h-screen bg-black text-white p-4 md:p-8">


                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="flex items-center bg-zinc-900 rounded-lg px-3 py-2 w-full md:w-1/3">
                        <Search size={18} className="text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search by address..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent outline-none text-sm w-full"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2">
                        {["all", "today", "month"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === f
                                    ? "bg-green-500 text-black"
                                    : "bg-zinc-800 hover:bg-zinc-700"
                                    }`}
                            >
                                {f === "all" ? "All" : f === "today" ? "Today" : "Last 30 Days"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading */}
                {loading && <p className="text-gray-400">Loading reports...</p>}

                {/* Desktop Table */}
                <div className="hidden md:block bg-zinc-900 rounded-xl overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-zinc-800 text-gray-300">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Address</th>
                                <th className="p-3 text-left">Message</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((rep) => (
                                <tr
                                    key={rep._id}
                                    className="border-b border-zinc-800 hover:bg-zinc-800 transition"
                                >
                                    <td className="p-3">{rep.name}</td>
                                    <td className="p-3">{rep.address}</td>
                                    <td className="p-3 text-gray-400">{rep.message}</td>
                                    <td className="p-3 text-gray-400">
                                        {new Date(rep.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => handleDeleteClick(rep._id)}

                                            className="text-red-400 hover:text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredReports.length === 0 && (
                        <p className="text-center text-gray-500 py-6">No reports found.</p>
                    )}
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {filteredReports.map((rep) => (
                        <div
                            key={rep._id}
                            className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-green-400">{rep.name}</h3>
                                <button
                                    onClick={() => handleDeleteClick(rep._id)}

                                    className="text-red-400"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                <MapPin size={12} /> {rep.address}
                            </p>

                            <p className="text-sm mt-2 text-gray-300">{rep.message}</p>

                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date(rep.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    ))}

                    {filteredReports.length === 0 && (
                        <p className="text-center text-gray-500">No reports found.</p>
                    )}
                </div>
            </div>

            {/* ✅ Confirm Modal */}
            {confirmBox && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 w-full max-w-sm text-center shadow-2xl">

                        <h2 className="text-lg font-semibold text-green-400">
                            Problem Solved?
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">
                            Are you sure this issue has been resolved?
                        </p>

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={() => setConfirmBox(false)}
                                className="flex-1 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition"
                            >
                                Resolve
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
