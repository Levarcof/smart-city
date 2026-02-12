"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [type, setType] = useState("user"); // user | department
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    departmentName: "",
    address: "",
    lat: "",
    lng: "",
  });
  const [file, setFile] = useState(null); // File selected
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    if (!file) return formData.image; // If no file, return previous URL
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET); // Cloudinary preset
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME);

    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const json = await res.json();
      setUploading(false);
      return json.secure_url; // Cloudinary URL
    } catch (error) {
      setUploading(false);
      console.error("Cloudinary Upload Error:", error);
      alert("❌ Image upload failed");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Upload image first
    const imageUrl = await uploadToCloudinary();

    const apiUrl = type === "user" ? "/api/auth/signup" : "/api/auth/garbage";

    const payload =
      type === "user"
        ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          image: imageUrl,
        }
        : {
          departmentName: formData.departmentName,
          email: formData.email,
          password: formData.password,
          address: formData.address,
          location: {
            lat: Number(formData.lat),
            lng: Number(formData.lng),
          },
          image: imageUrl, // Optional department image
        };

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Account created successfully!");
      router.push("/login");
    } else {
      alert(data.message || "❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a3d1c] to-black relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-400/10 blur-[120px]" />

      <div className="relative bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_40px_rgba(34,197,94,0.25)] rounded-3xl p-10 w-full max-w-md">

        {/* Logo / Title */}
        <h1 className="text-2xl font-bold text-center text-white mb-2 tracking-wide">
          Register
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          Join as User or Department
        </p>

        {/* Toggle Buttons */}
        <div className="flex bg-white/10 rounded-full p-1 mb-6">
          <button
            onClick={() => setType("user")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${type === "user"
              ? "bg-green-500 text-black shadow-lg"
              : "text-gray-300 hover:text-white"
              }`}
          >
            👤 User
          </button>
          <button
            onClick={() => setType("department")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${type === "department"
              ? "bg-green-500 text-black shadow-lg"
              : "text-gray-300 hover:text-white"
              }`}
          >
            🏢 Department
          </button>
        </div>

        <h2 className="text-xl font-bold text-center text-green-400 mb-5">
          {type === "user" ? "Create User Account" : "Register Department"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* USER FORM */}
          {type === "user" && (
            <>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                className="spotify-input"
              />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                className="spotify-input"
              />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                className="spotify-input"
              />

              {/* ✅ File input for image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="spotify-input bg-white/10 text-white"
              />
            </>
          )}

          {/* DEPARTMENT FORM */}
          {type === "department" && (
            <>
              <input
                onChange={handleChange}
                type="text"
                name="departmentName"
                value={formData.departmentName}
                placeholder="Department Name"
                className="spotify-input"
              />
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={formData.email}
                placeholder="Department Email"
                className="spotify-input"
              />
              <input
                onChange={handleChange}
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                className="spotify-input"
              />
              <input
                onChange={handleChange}
                type="text"
                name="address"
                value={formData.address}
                placeholder="Department Address"
                className="spotify-input"
              />

              <div className="flex gap-3">
                <input
                  onChange={handleChange}
                  type="text"
                  name="lat"
                  value={formData.lat}
                  placeholder="Latitude"
                  className="spotify-input"
                />
                <input
                  onChange={handleChange}
                  type="text"
                  name="lng"
                  value={formData.lng}
                  placeholder="Longitude"
                  className="spotify-input"
                />
              </div>

              {/* ✅ File input for department image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="spotify-input bg-white/10 text-white"
              />
            </>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-black font-bold tracking-wide hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          >
            {uploading ? "Uploading..." : "🚀 Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-green-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
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
