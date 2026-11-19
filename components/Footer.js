"use client"
import Link from "next/link"

const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
}

const Footer = () => (
    <footer className="border-t border-purple-100/60 bg-white/70 px-6 py-6 text-sm text-gray-600 backdrop-blur-md sm:px-10 lg:px-[10vw]">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <Link
                href="/"
                onClick={scrollToTop}
                aria-label="Scroll to top"
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
            <p className="text-gray-500 md:absolute md:left-1/2 md:-translate-x-1/2">
                <span className="text-gray-500">Built with ❤️</span>
            </p>
            <p>&copy; 2026 OneLink. All rights reserved.</p>
        </div>
    </footer>
)

export default Footer
