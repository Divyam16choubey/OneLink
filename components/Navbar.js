"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    const showNavbar = ["/", "/generate"].includes(pathname)

    if (!showNavbar) return null

    return (
        <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-2xl border border-white/60 bg-white/70 px-3 py-2.5 shadow-lg shadow-slate-900/10 backdrop-blur-md sm:top-6 sm:w-[calc(100%-3rem)] sm:rounded-full sm:px-4">
            <Link
                href="/"
                aria-label="OneLink home"
                className="group flex shrink-0 items-center rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
                <svg
                    className="h-7 w-auto sm:h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 440 112"
                    fill="none"
                    role="img"
                    aria-label="OneLink"
                >
                    <defs>
                        <linearGradient id="oneLinkGradient" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#6758E8" />
                            <stop offset="100%" stopColor="#268BEE" />
                        </linearGradient>
                    </defs>
                    <g transform="translate(8 8)">
                        <path
                            d="M43 13 L26 13 C12 13 5 23 5 36 C5 49 14 58 27 58 L44 58 C56 58 64 50 64 39"
                            stroke="url(#oneLinkGradient)"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        <path
                            d="M45 58 L62 58 C76 58 83 48 83 35 C83 22 74 13 61 13 L44 13 C32 13 24 21 24 32"
                            stroke="url(#oneLinkGradient)"
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
                        One<tspan fill="url(#oneLinkGradient)">Link</tspan>
                    </text>
                </svg>
            </Link>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
                <Link
                    href="/#about"
                    className="text-sm font-medium text-slate-600 outline-none transition-colors hover:text-slate-950 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                    About
                </Link>
                <Link
                    href="/#how-it-works"
                    className="text-sm font-medium text-slate-600 outline-none transition-colors hover:text-slate-950 focus-visible:text-slate-950 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                    How It Works
                </Link>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <Link
                    href="/login"
                    className="rounded-full px-2.5 py-2 text-xs font-semibold text-slate-700 outline-none transition-colors hover:bg-slate-900/5 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:px-4 sm:text-sm"
                >
                    Log In
                </Link>
                <Link
                    href="/generate"
                    className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm outline-none transition-all hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md active:translate-y-0 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:px-5 sm:text-sm"
                >
                    <span className="sm:hidden">Join</span>
                    <span className="hidden sm:inline">Create Profile</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
