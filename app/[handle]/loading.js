export default function Loading() {
    return (
        <div className="flex min-h-screen items-start justify-center bg-[radial-gradient(circle_at_top,_#d8b4fe,_#a78bfa_45%,_#7c3aed)] px-4 py-28 sm:px-6">
            <div className="flex w-full max-w-lg flex-col items-center gap-5 rounded-[2rem] border border-white/35 bg-white/15 px-5 py-8 shadow-2xl shadow-purple-950/25 backdrop-blur-xl sm:px-10 animate-pulse">
                <div className="h-24 w-24 rounded-full bg-white/30" />
                <div className="h-6 w-36 rounded-full bg-white/30" />
                <div className="h-4 w-56 rounded-full bg-white/20" />
                <div className="h-4 w-44 rounded-full bg-white/20" />
                <div className="w-full space-y-3 pt-2">
                    <div className="h-14 w-full rounded-2xl bg-white/30" />
                    <div className="h-14 w-full rounded-2xl bg-white/30" />
                    <div className="h-14 w-full rounded-2xl bg-white/25" />
                </div>
            </div>
        </div>
    )
}
