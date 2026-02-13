"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const Page = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const [type, setType] = useState("user"); // user | department

  const [formData, setFormData] = useState({
    // departmentName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl =
      type === "user" ? "/api/auth/login" : "/api/auth/login/garbage";

    // ✅ Only email & password send
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Login successful!");
      setUser(data.user);
      if(type == "user"){
        router.push("/");
      }
      else{
         router.push("/department")
      }
     
    } else {
      alert(data.message || "❌ Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a3d1c] to-black px-4">

      <div className="w-full max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(34,197,94,0.25)] rounded-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SECTION */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white flex flex-col items-center justify-center p-10">

          <div className="w-34 h-34 relative mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain "
            />
          </div>

          <h1 className="text-3xl font-bold mb-3 tracking-wide">
            Smart City
          </h1>
          <p className="text-center text-sm opacity-90">
            Smart city traffic & garbage management system.
            Login as User or Department.
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-white mb-2">
            Login
          </h2>
          <p className="text-gray-400 mb-6">
            Choose account type and continue
          </p>

          {/* ✅ TOGGLE BUTTONS */}
          <div className="flex bg-white/10 rounded-full p-1 mb-6">
            <button
              onClick={() => setType("user")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                type === "user"
                  ? "bg-green-500 text-black shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              👤 User
            </button>
            <button
              onClick={() => setType("department")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                type === "department"
                  ? "bg-green-500 text-black shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              🏢 Department
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* ✅ Department Name only for Department */}
            {/* {type === "department" && (
            //   <input
            //     type="text"
            //     name="departmentName"
            //     value={formData.departmentName}
            //     onChange={handleChange}
            //     placeholder="Department Name"
            //     className="spotify-input"
            //   />
            )} */}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="spotify-input"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="spotify-input"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-bold tracking-wide hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            >
              🚀 Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            Not registered yet?{" "}
            <Link href="/signup" className="text-green-400 font-semibold hover:underline">
              Create your account
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .spotify-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          font-size: 14px;
          transition: 0.25s;
        }
        .spotify-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .spotify-input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Page;
