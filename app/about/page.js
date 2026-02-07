"use client";
import React from 'react'
import Navbar from '../components/Navbar'
import Image from "next/image";

const page = () => {
    return (
        <>
            <Navbar />
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🌿 About Safe Route Analyzer</h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8">
                        Discover the safest paths in real-time. Our system helps you navigate with minimal risk by analyzing reported alerts along the routes.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <span className="bg-white/20 px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition cursor-default">Live Alerts</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition cursor-default">Safe Routes</span>
                        <span className="bg-white/20 px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition cursor-default">User Friendly</span>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-green-700 mb-4">Our Mission</h2>
                        <p className="text-gray-700 text-lg">
                            Our mission is to make commuting safer by providing a platform that identifies the safest possible routes using real-time reports and data analytics. We aim to reduce risks and increase awareness for travelers.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src="/mission-illustration.png"
                            alt="Mission Illustration"
                            width={400}
                            height={400}
                            className="rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-green-50 py-16 px-4">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Why Choose Us?</h2>
                    <p className="text-green-700 text-base md:text-lg">A powerful, reliable, and easy-to-use system for safe navigation.</p>
                </div>

                <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
                        <h3 className="text-xl font-semibold text-green-700 mb-3">Real-Time Alerts</h3>
                        <p className="text-gray-700">Get instant updates about unsafe spots along your route to stay safe.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
                        <h3 className="text-xl font-semibold text-green-700 mb-3">Safe Route Recommendations</h3>
                        <p className="text-gray-700">Analyze multiple route options and pick the one with minimal risk.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
                        <h3 className="text-xl font-semibold text-green-700 mb-3">User-Friendly Interface</h3>
                        <p className="text-gray-700">Simple, intuitive, and interactive design for all kinds of users.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
                        <h3 className="text-xl font-semibold text-green-700 mb-3">Mobile Compatible</h3>
                        <p className="text-gray-700">Works perfectly on mobile devices to help users on-the-go.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
                        <h3 className="text-xl font-semibold text-green-700 mb-3">Professional Analytics</h3>
                        <p className="text-gray-700">Advanced route scoring and data analysis ensures reliability.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
                        <h3 className="text-xl font-semibold text-green-700 mb-3">Open-Source APIs</h3>
                        <p className="text-gray-700">Leverages trusted mapping APIs for accurate route plotting.</p>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-green-600 text-white py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Stay Safe?</h2>
                    <p className="text-white/90 mb-6">Use Safe Route Analyzer today and travel with confidence.</p>
                    <a
                        href="/"
                        className="bg-white text-green-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                    >
                        🚦 Go Back Home
                    </a>
                </div>
            </section>
        </>
    )
}

export default page
