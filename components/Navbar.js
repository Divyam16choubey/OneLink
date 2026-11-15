"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname()
    const showNavbar = ["/", "/generate"].includes(pathname)

    return (<>{showNavbar && <nav className='fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/70 bg-white/70 p-3 px-4 shadow-xl shadow-slate-900/10 backdrop-blur-xl sm:top-6 sm:w-[calc(100%-3rem)] sm:rounded-full sm:px-6'>
        <div className="logo flex min-w-0 items-center gap-3 sm:gap-10">
            <Link href="/" aria-label="OneLink Home">
                <svg
                    className="h-10 w-auto sm:h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 440 112"
                    fill="none"
                    role="img"
                    aria-label="OneLink"
                >
                    <defs>
                        <linearGradient id="olgrad" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#6758E8" />
                            <stop offset="100%" stopColor="#268BEE" />
                        </linearGradient>
                    </defs>

                    <g transform="translate(8 8)">
                        <path
                            d="M43 13 L26 13 C12 13 5 23 5 36 C5 49 14 58 27 58 L44 58 C56 58 64 50 64 39"
                            stroke="url(#olgrad)"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />

                        <path
                            d="M45 58 L62 58 C76 58 83 48 83 35 C83 22 74 13 61 13 L44 13 C32 13 24 21 24 32"
                            stroke="url(#olgrad)"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                    </g>

                    <text
                        x="112"
                        y="69"
                        fontFamily="Inter, Arial, sans-serif"
                        fontSize="51"
                        fontWeight="700"
                        letterSpacing="-2.5"
                        fill="#171A2D"
                    >
                        One<tspan fill="url(#olgrad)">Link</tspan>
                    </text>
                </svg>
            </Link>

            <ul className='hidden gap-6 text-sm font-medium text-slate-600 lg:flex'>
                <Link href="/"><li>Templates </li></Link>
                <Link href="/"><li>Marketplace</li></Link>
                <Link href="/"><li>Discover</li></Link>
                <Link href="/"><li>Pricing</li></Link>
                <Link href="/"><li>Learn</li></Link>
            </ul>
        </div>

        <div className='flex gap-2'>
            <button className="login rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 sm:px-4 sm:py-3">Log in</button>
            <button className="signup rounded-xl bg-gray-900 px-3 py-2 text-sm font-bold text-white hover:bg-slate-700 sm:rounded-full sm:px-5 sm:py-3">Sign up free</button>
        </div>
    </nav>}
    </>

    )
}

export default Navbar