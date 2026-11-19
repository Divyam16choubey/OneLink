"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function LoginPage() {
    const router = useRouter()
    const [handle, setHandle] = useState("")
    const [pin, setPin] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const recoverWithDevice = async () => {
        const cleanedHandle = handle.trim().toLowerCase()
        if (!cleanedHandle) {
            toast.error("Enter your handle to recover access from this device.")
            return
        }

        let ownerToken
        try {
            ownerToken = localStorage.getItem(`onelink_owner_${cleanedHandle}`)
        } catch {
            ownerToken = null
        }

        if (!ownerToken) {
            toast.error("Device authorization not found. For your security, PINs cannot be recovered from unverified devices.")
            return
        }

        setSubmitting(true)
        try {
            const response = await fetch("/api/recover", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ handle: cleanedHandle, ownerToken }),
            })
            const result = await response.json()

            if (!response.ok) {
                toast.error(result.message || "Unable to verify this device.")
                return
            }

            sessionStorage.setItem("onelink-edit-session", JSON.stringify({ handle: result.handle, ownerToken }))
            router.push(`/edit?handle=${encodeURIComponent(result.handle)}`)
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const submit = async (event) => {
        event.preventDefault()
        setSubmitting(true)

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ handle: handle.trim(), pin }),
            })
            const result = await response.json()

            if (!response.ok) {
                toast.error(result.message || "Unable to unlock your profile.")
                return
            }

            sessionStorage.setItem("onelink-edit-session", JSON.stringify({ handle: result.handle, pin }))
            router.push(`/edit?handle=${encodeURIComponent(result.handle)}`)
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-28 sm:px-6">
            <div aria-hidden="true" className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" />
            <form onSubmit={submit} className="w-full max-w-md rounded-[2rem] border border-white/80 bg-white/60 p-6 shadow-2xl shadow-fuchsia-950/10 backdrop-blur-md sm:p-10">
                <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-pink-600">Welcome back</p>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Edit your OneLink</h1>
                    <p className="leading-7 text-slate-600">Enter your handle and Edit PIN to unlock your profile.</p>
                </div>

                <div className="mt-8 space-y-5">
                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Handle</span>
                        <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center font-semibold text-pink-600">@</span>
                            <input
                                value={handle}
                                onChange={(event) => setHandle(event.target.value.replace(/\s/g, "").toLowerCase())}
                                className="w-full rounded-2xl border border-pink-100 bg-white/80 py-3 pl-9 pr-5 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/50"
                                placeholder="yourhandle"
                                autoComplete="username"
                                maxLength={30}
                                required
                            />
                        </div>
                    </label>
                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-700">Secret PIN</span>
                        <input
                            value={pin}
                            onChange={(event) => setPin(event.target.value)}
                            className="w-full rounded-2xl border border-pink-100 bg-white/80 px-5 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/50"
                            type="password"
                            placeholder="Enter your Edit PIN"
                            autoComplete="current-password"
                            required
                        />
                    </label>
                    <button
                        disabled={submitting}
                        className="w-full rounded-2xl bg-gradient-to-r from-pink-700 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-950/20 transition hover:-translate-y-0.5 hover:from-pink-600 hover:to-fuchsia-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Unlocking..." : "Unlock profile"}
                    </button>
                    <button
                        type="button"
                        onClick={recoverWithDevice}
                        disabled={submitting}
                        className="mx-auto block text-sm font-medium text-slate-500 underline decoration-slate-300 underline-offset-4 transition hover:text-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Forgot PIN? Recover via this device
                    </button>
                </div>
            </form>
            <ToastContainer />
        </main>
    )
}
