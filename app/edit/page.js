"use client"

import Link from "next/link"
import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const BIO_MAX = 160

const isValidUrl = (value) => {
    try {
        const url = new URL(value)
        return url.protocol === "http:" || url.protocol === "https:"
    } catch {
        return false
    }
}

function EditDashboard() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const requestedHandle = searchParams.get("handle")?.trim().toLowerCase()
    const [handle, setHandle] = useState("")
    const [pin, setPin] = useState("")
    const [ownerToken, setOwnerToken] = useState("")
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const savedSession = sessionStorage.getItem("onelink-edit-session")

        if (!requestedHandle || !savedSession) {
            router.replace("/login")
            return
        }

        let session
        try {
            session = JSON.parse(savedSession)
        } catch {
            sessionStorage.removeItem("onelink-edit-session")
            router.replace("/login")
            return
        }

        if (session.handle !== requestedHandle || (!session.pin && !session.ownerToken)) {
            router.replace("/login")
            return
        }

        const loadProfile = async () => {
            try {
                const response = await fetch(`/api/profile?handle=${encodeURIComponent(requestedHandle)}`)
                const result = await response.json()

                if (!response.ok) {
                    setError(result.message || "Unable to load this profile.")
                    return
                }

                setHandle(result.profile.handle)
                setPin(session.pin)
                setOwnerToken(session.ownerToken)
                setPic(result.profile.pic || "")
                setDesc(result.profile.desc || "")
                setLinks(result.profile.links?.length ? result.profile.links : [{ linktext: "", link: "" }])
            } catch {
                setError("Unable to load this profile. Please try again.")
            } finally {
                setLoading(false)
            }
        }

        loadProfile()
    }, [requestedHandle, router])

    const updateLink = (index, field, value) => {
        setLinks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item))
    }

    const addLink = () => setLinks((current) => [...current, { linktext: "", link: "" }])
    const removeLink = (index) => setLinks((current) => current.filter((_, itemIndex) => itemIndex !== index))

    const saveChanges = async () => {
        const cleanedLinks = links.filter((item) => item.linktext.trim() || item.link.trim())

        if (!pic.trim() || !isValidUrl(pic.trim())) {
            toast.error("Enter a valid profile picture URL.")
            return
        }

        if (!cleanedLinks.length || cleanedLinks.some((item) => !item.linktext.trim() || !isValidUrl(item.link.trim()))) {
            toast.error("Each link needs a label and valid http/https URL.")
            return
        }

        setSaving(true)
        try {
            const response = await fetch("/api/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ handle, pin, ownerToken, pic: pic.trim(), desc: desc.trim(), links: cleanedLinks }),
            })
            const result = await response.json()

            if (!response.ok) {
                toast.error(response.status === 401 ? "Your edit authorization is no longer valid." : result.message || "Unable to save your profile.")
                return
            }

            setLinks(cleanedLinks)
            toast.success("Profile updated successfully!")
        } catch {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <main className="min-h-screen bg-[#fffafd] px-4 pt-32" />
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#fffafd] px-4 pt-24">
                <div className="max-w-md rounded-3xl border border-white/80 bg-white/60 p-8 text-center shadow-xl shadow-fuchsia-950/10 backdrop-blur-md">
                    <p className="text-lg font-semibold text-slate-900">{error}</p>
                    <Link href="/login" className="mt-5 inline-flex rounded-xl bg-pink-700 px-5 py-3 font-semibold text-white">Return to login</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(60%_120%_at_50%_50%,rgba(252,205,238,.35)_0,rgba(253,232,245,.55)_60%,#fff_100%)] px-4 pb-16 pt-28 sm:px-8 lg:px-16">
            <div aria-hidden="true" className="absolute inset-0 z-[-1] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] rotate-180" />
            <div className="mx-auto w-full max-w-3xl rounded-[2rem] border border-white/80 bg-white/60 p-6 shadow-2xl shadow-fuchsia-950/10 backdrop-blur-md sm:p-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.16em] text-pink-600">Profile editor</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Edit @{handle}</h1>
                        <p className="mt-2 text-slate-600">Keep your profile current, clear, and ready to share.</p>
                    </div>
                    <Link href={`/${handle}`} target="_blank" className="shrink-0 rounded-xl border border-pink-100 bg-white/70 px-4 py-2 text-sm font-semibold text-pink-700 transition hover:bg-white">
                        View live profile
                    </Link>
                </div>

                <div className="mt-8 space-y-8">
                    <section className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-slate-900">Your links</h2>
                            <button onClick={addLink} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Add link</button>
                        </div>
                        <div className="space-y-3">
                            {links.map((item, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="grid flex-1 gap-2 sm:grid-cols-2">
                                        <input value={item.linktext} onChange={(event) => updateLink(index, "linktext", event.target.value)} className="w-full rounded-xl border border-pink-100 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/50" placeholder="Link label" />
                                        <input value={item.link} onChange={(event) => updateLink(index, "link", event.target.value)} className="w-full rounded-xl border border-pink-100 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/50" type="url" placeholder="https://example.com" />
                                    </div>
                                    <button onClick={() => removeLink(index)} disabled={links.length === 1} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-100 bg-rose-50 text-lg text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40" aria-label={`Remove link ${index + 1}`}>×</button>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-slate-900">Profile details</h2>
                        <label className="block space-y-2">
                            <span className="text-sm font-medium text-slate-700">Profile picture URL</span>
                            <input value={pic} onChange={(event) => setPic(event.target.value)} className="w-full rounded-xl border border-pink-100 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/50" type="url" placeholder="https://example.com/avatar.jpg" />
                        </label>
                        <label className="block space-y-2">
                            <span className="flex items-center justify-between text-sm font-medium text-slate-700">Bio <span className="font-normal text-slate-400">{desc.length}/{BIO_MAX}</span></span>
                            <textarea value={desc} onChange={(event) => setDesc(event.target.value.slice(0, BIO_MAX))} rows={4} className="w-full resize-none rounded-xl border border-pink-100 bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-pink-400 focus:ring-4 focus:ring-pink-200/50" placeholder="Tell people what you do..." />
                        </label>
                    </section>

                    <button onClick={saveChanges} disabled={saving} className="w-full rounded-2xl bg-gradient-to-r from-pink-700 to-fuchsia-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-950/20 transition hover:-translate-y-0.5 hover:from-pink-600 hover:to-fuchsia-500 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60">
                        {saving ? "Saving changes..." : "Save Changes"}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </main>
    )
}

export default function EditPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-[#fffafd]" />}>
            <EditDashboard />
        </Suspense>
    )
}
