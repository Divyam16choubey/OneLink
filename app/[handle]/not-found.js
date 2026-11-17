import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#d8b4fe,_#a78bfa_45%,_#7c3aed)] px-4">
            <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-[2rem] border border-white/35 bg-white/15 px-8 py-12 text-center shadow-2xl shadow-purple-950/25 backdrop-blur-xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-8 w-8 opacity-80">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white">Profile not found</h1>
                    <p className="text-sm leading-6 text-white/70">
                        No OneLink exists for this handle yet. Want to claim it?
                    </p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <Link
                        href="/generate"
                        className="rounded-2xl bg-white px-6 py-3 font-bold text-purple-700 shadow-lg hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0"
                    >
                        Create this OneLink
                    </Link>
                    <Link
                        href="/"
                        className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white/90 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </div>
    )
}
