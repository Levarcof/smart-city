"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

const page = () => {
  const [formData , setFormData] = useState({
    name :"",
    email : "",
    image : "",
    password : ""
  })

  const router = useRouter()

  const handleChange = (e)=>{
    setFormData(
      {
        ...formData , [e.target.name] : e.target.value
      }
    )
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    const res = await fetch("/api/auth/signup" , {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if(res.ok){
      alert("User created successfully !!")
      router.push("/login")
      
    }
    else{
      alert(data.message)
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Full Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              name = "name"
              value={formData.name}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Email
            </label>
            <input
            onChange={handleChange}
              type="email"
               name = "email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Password
            </label>
            <input
            onChange={handleChange}
              type="password"
              name = "password"
              value={formData.password}
              placeholder="Create password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {/* image */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              image
            </label>
            <input
            onChange={handleChange}
              type="text"
              name = "image"
              value={formData.image}
              placeholder="image src"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default page
