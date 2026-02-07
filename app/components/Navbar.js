"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '../context/UserContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const router = useRouter()
    const { user } = useUser()
    const { setUser } = useUser()
    const [showProfile, setShowProfile] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" })
            if (res.ok) {
                setUser(null)
                router.push("/login")
            }
        }
        catch (error) {
            console.log("Logout error: ", error)
        }
    }

    return (
        <div className='flex justify-between items-center m-2 p-3 pl-6 pr-6 bg-gray-200 rounded-2xl'>
            <div className="logo flex justify-center items-center gap-2 ">
                <div className='image'>
                    <Image src="/map.png" alt='logo' width={40} height={40} />
                </div>
                <div className='font-bold text-2xl text-green-700'>
                    <Link href="/">  Map's</Link>
                </div>
            </div>

            <div className=' flex gap-4 justify-center items-center'>
                <div className='md:hidden ' onClick={() => setShowMenu(!showMenu)}>
                    <Image src="/menu.png" alt='menu' width={25} height={25} />
                </div>

                {showMenu && (
                    <div className="absolute flex flex-col top-16 right-12 bg-white shadow-lg rounded-xl p-4 w-fit z-50">
                      <Link className='p-1  text-xl font-medium text-green-700 hover:cursor-pointer hover:text-green-400 ' href="/">Home</Link>
                    <Link className='p-1 text-xl font-medium text-green-700  hover:cursor-pointer hover:text-green-400 ' href="/reports">Report</Link>
                    <Link className='p-1 text-xl font-medium text-green-700  hover:cursor-pointer hover:text-green-400 ' href="/about">About</Link>

                    </div>
                )}
                <ul className='hidden md:block md:flex  md:justify-center md:items-center md:gap-4 text-center '>
                    <Link className='p-1  text-xl font-medium text-green-700 hover:cursor-pointer hover:text-green-400 ' href="/">Home</Link>
                    <Link className='p-1 text-xl font-medium text-green-700  hover:cursor-pointer hover:text-green-400 ' href="/reports">Report</Link>
                    <Link className='p-1 text-xl font-medium text-green-700  hover:cursor-pointer hover:text-green-400 ' href="/about">About</Link>
                </ul>
                <div onClick={() => setShowProfile(!showProfile)} className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                    <Image
                        src={user?.image || "/default.png"}
                        alt="user"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>

                {showProfile && (
                    <div className="absolute top-16 right-6 bg-white shadow-lg rounded-xl p-4 w-60 z-50">
                        <div className="flex items-center gap-3 border-b pb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border">
                                <Image
                                    src={user?.image || "/default.png"}
                                    alt="user"
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">{user?.name || "Guest User"}</p>
                                <p className="text-sm text-gray-500">{user?.email || "No email"}</p>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-col gap-2">
                            <Link href="/profile" className="text-green-700 hover:text-green-500 text-sm">
                                View Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-red-400 text-sm text-left"
                            >
                                Logout
                            </button>
                        </div>

                    </div>
                )}


            </div>


        </div>
    )
}

export default Navbar
