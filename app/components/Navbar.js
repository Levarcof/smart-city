"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "../context/UserContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Navbar = () => {

  const router = useRouter()
  const { user, setUser , loading } = useUser()
  const [showProfile, setShowProfile] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

useEffect(() => {
  if (user?.role) {
    router.refresh()   // 🔥 layout + server components refresh
  }
}, [user?.role])
  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        setUser(null)
        router.push("/login")
      }
    } catch (error) {
      console.log("Logout error:", error)
    }
  }



  

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <span className="text-xl font-bold text-green-700">
            Smart city
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 font-medium hover:text-green-700 transition">
            Home
          </Link>
          {/* <Link href="/reports" className="text-gray-700 font-medium hover:text-green-700 transition">
            Reports
          </Link> */}
          <Link href="/about" className="text-gray-700 font-medium hover:text-green-700 transition">
            About
          </Link>
          { !loading && user?.role == 'admin' && 
          <Link href="/dashboard" className="text-gray-700 font-medium hover:text-green-700 transition">
            Dashboard
          </Link> }
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* MOBILE MENU */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Image src="/menu.png" alt="menu" width={22} height={22} />
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 hover:border-green-500 transition"
            >
              <Image
                src={user?.image || "/default.png"}
                alt="user"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            </button>

            {/* PROFILE DROPDOWN */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden">
                <div className="p-4 border-b flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border">
                    <Image
                      src={user?.image || "/default.png"}
                      alt="user"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {user?.name || "Guest User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "No email"}
                    </p>
                  </div>
                </div>

                <div className="p-3 flex flex-col gap-1">
                  <Link href="/profile" className="px-3 py-2 rounded-lg hover:bg-green-50 text-green-700 transition text-sm">
                    View Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-left transition text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-3 gap-2">
            <Link href="/" className="text-gray-700 hover:text-green-700 font-medium">
              Home
            </Link>
            {/* <Link href="/reports" className="text-gray-700 hover:text-green-700 font-medium">
              Reports
            </Link> */}
            <Link href="/about" className="text-gray-700 hover:text-green-700 font-medium">
              About
            </Link>
             {user?.role == 'admin' && 
          <Link href="/dashboard" className="text-gray-700 font-medium hover:text-green-700 transition">
            Dashboard
          </Link> }
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
