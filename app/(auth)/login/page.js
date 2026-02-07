"use client";
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const page = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const router = useRouter()
    const {setUser} = useUser()
    const handleChange = (e) => {
        setFormData(
            {
                ...formData, [e.target.name]: e.target.value
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await res.json()

        if (res.ok) {
            alert("User find successfully !!")
            setUser(data.user)
            router.push("/")

        }
        else {
            alert(data.message)
        }

    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">

                    {/* Left Section (Logo + Info) */}
                    <div className="md:w-1/2 bg-green-600 text-white flex flex-col items-center justify-center p-10">

                        <div className="w-24 h-24 relative mb-4">
                            <Image
                                src="/map.png"
                                alt="Map Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h1 className="text-3xl font-bold mb-3">Map’s</h1>
                        <p className="text-center text-sm opacity-90">
                            Smart city traffic and route management system.
                            Find best routes and report traffic easily.
                        </p>
                    </div>

                    {/* Right Section (Login Form) */}
                    <div className="md:w-1/2 p-10 flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
                        <p className="text-gray-500 mb-6">Login to continue</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <div className="flex items-center justify-between text-sm text-gray-600">
                                <label className="flex items-center gap-2">
                                    <input type="checkbox" className="accent-green-600" />
                                    Stay signed in
                                </label>
                                <span className="text-green-600 cursor-pointer hover:underline">
                                    Forgot Password?
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                            >
                                LOGIN
                            </button>

                            <p className="text-center text-sm text-gray-600 mt-4">
                                Not registered yet?{" "}
                                <Link href="/signup">
                                    <span className="text-green-600 cursor-pointer hover:underline">
                                        Create your account
                                    </span>
                                </Link>

                            </p>
                        </form>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default page
