"use client";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Trash2, HeartPulse, ShieldCheck, Users, Activity } from "lucide-react";

export default function AboutPage() {

  // Floating particles animation
  useEffect(() => {
    const particles = document.querySelectorAll(".particle");
    let angle = 0;
    const rotateParticles = () => {
      angle += 0.002;
      particles.forEach((p, i) => {
        const radius = 100 + i * 20;
        const x = Math.cos(angle + i) * radius;
        const y = Math.sin(angle + i) * radius;
        p.style.transform = `translate(${x}px, ${y}px)`;
      });
      requestAnimationFrame(rotateParticles);
    };
    rotateParticles();
  }, []);

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative md:mt-[-90] mt-[-130]  min-h-screen flex  items-center bg-gradient-to-br from-green-900 via-green-700 to-emerald-600 text-white overflow-hidden">
        {/* Animated floating blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-400/30 rounded-full filter blur-3xl animate-blob mix-blend-screen"></div>
        <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-green-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>

        {/* Floating micro-particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="particle absolute w-3 h-3 bg-green-400 rounded-full opacity-60 mix-blend-screen"></div>
        ))}

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Hero text */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Smart City Solutions <br />
              <span className="text-transparent text-2xl md:text-4xl bg-clip-text bg-gradient-to-r from-green-200 to-emerald-400">
                Safer • Cleaner • Healthier
              </span>
            </h1>
            <p className="text-white/90 text-lg max-w-xl">
              Navigate safely, report garbage, and access medical services instantly. Our platform combines AI, community reports, and real-time data for smarter city living.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/smartRoute">
                <button className="bg-white text-green-800 md:px-6 md:p-2 px-4 py-1 rounded-full font-bold shadow-[0_20px_50px_rgba(0,255,128,0.35)] hover:scale-110 hover:shadow-[0_25px_60px_rgba(0,255,128,0.45)] transition-transform duration-500">
                  Get Started 🚀
                </button>
              </Link>
              <Link href="/profile">
                <button className="border border-white/30 md:px-6 md:p-2 px-5 py-1 rounded-full hover:bg-white/10 transition duration-300">
                  View profile
                </button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-12 bg-white/10 backdrop-blur-3xl rounded-3xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-4 shadow-2xl hover:scale-105 transition-transform duration-700 perspective-1000">
              <div className="transform hover:rotate-y-6 hover:rotate-x-2 transition-transform duration-700">
                <Image
                  src="/city.png"
                  alt="City Preview"
                  width={600}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative bg-gradient-to-b from-green-50 via-white to-green-50 py-36 overflow-hidden">
        <div className="absolute -top-20 left-0 w-72 h-72 bg-green-300/20 rounded-full filter blur-3xl animate-blob animation-delay-1000 mix-blend-screen"></div>
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-emerald-400/30 rounded-full filter blur-3xl animate-blob mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-5xl font-extrabold text-green-900 mb-6">Our Smart Features</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Complete city management solution with navigation, sanitation reporting, and emergency services.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Smart Route Planner",
              desc: "AI-driven route suggestions with safety-first routing, traffic-aware navigation, and incident alerts.",
              icon: <MapPin size={48} className="text-green-400 mb-4 group-hover:text-emerald-300 transition-colors duration-300" />,
              image: "/route-demo.png",
              hoverShadow: "hover:shadow-emerald-400/50",
            },
            {
              title: "Garbage Reporting",
              desc: "Snap photos of overflowing bins and notify authorities instantly to maintain a cleaner city.",
              icon: <Trash2 size={48} className="text-green-400 mb-4 group-hover:text-yellow-400 transition-colors duration-300" />,
              image: "/garbage-demo.png",
              hoverShadow: "hover:shadow-yellow-400/50",
            },
            {
              title: "Medical Assistance",
              desc: "Locate nearby hospitals and medical services instantly for quick emergency response.",
              icon: <HeartPulse size={48} className="text-green-400 mb-4 group-hover:text-red-400 transition-colors duration-300" />,
              image: "/medical-demo.png",
              hoverShadow: "hover:shadow-red-400/50",
            },
          ].map((feature, i) => (
            <div key={i} className={`bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 flex flex-col items-center text-center group ${feature.hoverShadow}`}>
              {feature.icon}
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-white/80 mb-4">{feature.desc}</p>
              <Image
                src={feature.image}
                alt={feature.title}
                width={300}
                height={180}
                className="rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-green-900 py-36 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[ 
            { value: "10K+", label: "Active Users", icon: <Users size={40} className="mx-auto mb-2 text-green-400" /> },
            { value: "120K+", label: "Routes Analyzed", icon: <Activity size={40} className="mx-auto mb-2 text-green-400" /> },
            { value: "5K+", label: "Garbage Reports", icon: <Trash2 size={40} className="mx-auto mb-2 text-yellow-400" /> },
            { value: "24/7", label: "Emergency Support", icon: <HeartPulse size={40} className="mx-auto mb-2 text-red-400" /> },
          ].map((stat, i) => (
            <div key={i} className="transition-transform hover:scale-110 duration-300">
              {stat.icon}
              <h3 className="text-4xl font-extrabold mb-2">{stat.value}</h3>
              <p className="text-gray-200 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE PRINCIPLES */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-36 overflow-hidden">
        <div className="absolute -top-20 left-0 w-72 h-72 bg-green-300/20 rounded-full filter blur-3xl animate-blob animation-delay-1000 mix-blend-screen"></div>
        <div className="absolute -bottom-20 right-0 w-96 h-96 bg-emerald-400/30 rounded-full filter blur-3xl animate-blob mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-5xl font-extrabold text-green-900 mb-6">Our Core Principles</h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Safety, Community Engagement, and AI-driven intelligence guide every aspect of our platform.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { title: "Safety First", desc: "Maximizing safety in every route and alert.", icon: <ShieldCheck size={36} className="text-green-400 mb-4" /> },
            { title: "Community Driven", desc: "Citizen participation improves sanitation & safety.", icon: <Users size={36} className="text-green-400 mb-4" /> },
            { title: "AI Intelligence", desc: "Data-powered insights optimize routes & emergency response.", icon: <Activity size={36} className="text-green-400 mb-4" /> },
          ].map((value, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 flex flex-col items-center text-center group">
              {value.icon}
              <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-white/80">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-gradient-to-r from-green-800 to-emerald-600 text-white py-32 text-center overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-400/20 rounded-full filter blur-3xl animate-blob mix-blend-screen"></div>

        <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-emerald-300">
          Empowering Smarter Cities
        </h2>
        <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">
          Safe Route Analyzer helps citizens and municipalities act in real-time for safer, cleaner, and healthier urban living.
        </p>
        <Link href="/smartRoute">
          <button className="bg-white text-green-800 px-12 py-4 rounded-full font-bold shadow-[0_20px_50px_rgba(0,255,128,0.35)] hover:scale-110 hover:shadow-[0_25px_60px_rgba(0,255,128,0.45)] transition-transform duration-500">
            Get Started 🚀
          </button>
        </Link>
      </section>
    </>
  );
}
