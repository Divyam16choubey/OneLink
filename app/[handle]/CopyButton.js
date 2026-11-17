"use client"
import { useState } from "react"

export default function CopyButton({ handle }) {
    const [state, setState] = useState("idle")

    const handleCopy = async () => {
        const url = `${window.location.origin}/${handle}`
        try {
            if (navigator.share) {
                await navigator.share({ title: `@${handle} on OneLink`, url })
                return
            }
            await navigator.clipboard.writeText(url)
            setState("copied")
            setTimeout(() => setState("idle"), 2200)
        } catch {
            setState("error")
            setTimeout(() => setState("idle"), 2200)
        }
    }

    const label = {
        idle: (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                    <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                    <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                </svg>
                Share Profile
            </>
        ),
        copied: (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                </svg>
                Copied!
            </>
        ),
        error: (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-shrink-0">
                    <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                Try again
            </>
        ),
    }[state]

    const colours = {
        idle: "border-white/50 bg-white/20 text-white hover:bg-white/30",
        copied: "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30",
        error: "border-red-400/60 bg-red-500/20 text-red-100 hover:bg-red-500/30",
    }[state]

    return (
        <button
            onClick={handleCopy}
            aria-label="Share this profile"
            className={`flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-sm font-semibold shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 active:translate-y-0 ${colours}`}
        >
            {label}
        </button>
    )
}
