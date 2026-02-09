"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* HERO - PRODUCT IDENTITY */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            {/* <p className="text-green-300 font-semibold tracking-widest mb-4">
              SAFE ROUTE ANALYZER
            </p> */}

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Redefining Safety <br />
              in <span className="text-emerald-300">Every Journey</span>
            </h1>

            <p className="text-lg text-white/90 mb-8 max-w-xl">
              A next-generation navigation intelligence platform that analyzes real-time risk signals, user reports, and route data to deliver the safest possible travel experience.
            </p>

            <div className="flex gap-4 flex-wrap">
                <Link href="/">
              <button className="bg-white text-green-800 px-6 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 transition">
                Explore Product
              </button>
              </Link>
              <Link href="/reports" >
              <button className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 transition">
                Go to report sectiom
              </button>
              </Link>
            </div>
          </div>

          {/* PRODUCT PREVIEW MOCKUP */}
          <div className="relative">
            <div className="absolute -inset-6 bg-emerald-400/40 blur-3xl rounded-full"></div>
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl">
              <Image
                src="/map-ui.png" // map screenshot or mockup
                alt="Product Preview"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { value: "10K+", label: "Active Users" },
            { value: "120K+", label: "Routes Analyzed" },
            { value: "98.7%", label: "Accuracy Rate" },
            { value: "24/7", label: "Real-Time Monitoring" },
          ].map((item, i) => (
            <div key={i}>
              <h3 className="text-4xl font-extrabold text-green-700 mb-2">
                {item.value}
              </h3>
              <p className="text-gray-600 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="bg-gradient-to-b from-green-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-green-900 mb-6">
              The Problem We Solve
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Traditional navigation systems focus only on distance and time — not safety. Millions of travelers unknowingly pass through high-risk areas every day.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Safe Route Analyzer introduces a new dimension to navigation by integrating safety intelligence into route planning.
            </p>
          </div>

          <div className="relative">
            <Image
              src="/mission-illustration.png"
              alt="Mission"
              width={500}
              height={500}
              className="rounded-3xl shadow-2xl border border-green-100"
            />
          </div>
        </div>
      </section>

      {/* CORE VALUES - BIG TECH STYLE */}
      <section className="bg-green-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Core Principles</h2>
          <p className="text-white/70 text-lg">
            Built on innovation, trust, and data-driven intelligence.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Safety First",
              desc: "Every algorithm is designed with user safety as the top priority.",
            },
            {
              title: "Data Intelligence",
              desc: "We transform raw data into meaningful safety insights.",
            },
            {
              title: "Scalable Technology",
              desc: "Built with modern architecture to scale globally.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK SECTION */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-green-900 mb-4">
            Powered by Modern Technology
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6">
          {["Next.js", "Node.js", "MongoDB", "Google Maps API", "AI Models"].map(
            (tech, i) => (
              <span
                key={i}
                className="px-6 py-3 rounded-full border border-green-200 text-green-700 font-semibold bg-green-50 hover:bg-green-100 transition"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-600 text-white py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Experience the Future of Safe Navigation
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
          Safe Route Analyzer is not just a product — it's a movement towards safer journeys worldwide.
        </p>
        {/* <button className="bg-white text-green-800 px-10 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition">
          Get Started 🚀
        </button> */}
      </section>
    </>
  );
}
