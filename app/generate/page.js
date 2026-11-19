"use client"
import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const BIO_MAX = 160;

const GenerateForm = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, setHandle] = useState(searchParams.get('handle') || "")
    const [pic, setPic] = useState("")
    const [desc, setDesc] = useState("")
    const [pin, setPin] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [createdHandle, setCreatedHandle] = useState(null)

    const handleLinkChange = (index, field, value) => {
        setLinks(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        )
    }

    const addLink = () => {
        setLinks(prev => [...prev, { link: "", linktext: "" }])
    }

    const removeLink = (index) => {
        setLinks(prev => prev.filter((_, i) => i !== index))
    }

    const isValidUrl = (str) => {
        try {
            new URL(str)
            return true
        } catch {
            return false
        }
    }

    const hasValidLink = links.some(l => l.linktext.trim() !== "" && l.link.trim() !== "")
    const canSubmit = handle.trim() !== "" && pic.trim() !== "" && pin.trim() !== "" && hasValidLink

    const submitLinks = async () => {
        if (!window.crypto?.randomUUID) {
            toast.error("Your browser cannot create a secure device recovery token.")
            return
        }

        setSubmitting(true)
        const cleanedLinks = links.filter(l => l.linktext.trim() !== "" || l.link.trim() !== "")
        const ownerToken = window.crypto.randomUUID()

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            links: cleanedLinks,
            handle: handle.trim(),
            pic: pic.trim(),
            desc: desc.trim(),
            pin: pin.trim(),
            ownerToken,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const r = await fetch("/api/add", requestOptions)
            const result = await r.json()
            if (result.success) {
                try {
                    localStorage.setItem(`onelink_owner_${handle.trim().toLowerCase()}`, ownerToken)
                } catch {
                    toast.warning("Your OneLink was created, but this browser could not save its device recovery authorization.")
                }
                setCreatedHandle(handle.trim())
            } else {
                toast.error(result.message)
                setSubmitting(false)
            }
        } catch {
            toast.error("Something went wrong. Please try again.")
            setSubmitting(false)
        }
    }

    return (
        <div className='bg-[radial-gradient(circle_at_top_left,_#f7d8f7,_#e9c0e9_45%,_#d9b8e9)] px-4 pb-16 pt-32 sm:px-8 lg:px-16'>

            {createdHandle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
                    <div className="w-full max-w-md space-y-6 rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-2xl shadow-purple-900/20 backdrop-blur-xl text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-8 w-8">
                                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-slate-900">Your OneLink is live!</h2>
                            <p className="text-slate-500">
                                Available at{" "}
                                <span className="font-semibold text-pink-600">onelink.app/{createdHandle}</span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                onClick={() => router.push(`/${createdHandle}`)}
                                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-bold text-white shadow-lg shadow-purple-900/20 hover:-translate-y-0.5 hover:from-purple-500 hover:to-pink-500 active:translate-y-0"
                            >
                                View my profile &rarr;
                            </button>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/${createdHandle}`)
                                    toast.success("Link copied!")
                                }}
                                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-slate-50 active:translate-y-0"
                            >
                                Copy link
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16'>

                <div className="flex w-full justify-center text-gray-900 lg:justify-start">
                    <div className='w-full max-w-xl space-y-8 rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-purple-900/10 backdrop-blur-xl sm:p-10'>
                        <div className="space-y-2">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-700">Build your profile</p>
                            <h1 className='text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl'>Create your OneLink</h1>
                        </div>

                        <div className="space-y-3">
                            <h2 className='text-2xl font-semibold text-slate-900'>Step 1: Claim your Handle</h2>
                            <div className="relative">
                                <span className="pointer-events-none absolute inset-y-0 left-5 flex items-center text-pink-500 font-semibold select-none">@</span>
                                <input
                                    value={handle}
                                    onChange={e => setHandle(e.target.value.replace(/\s/g, "").toLowerCase())}
                                    className='w-full rounded-2xl border border-white/80 bg-white/75 pl-9 pr-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30'
                                    type="text"
                                    placeholder='yourhandle'
                                    maxLength={30}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Choose an Edit PIN</label>
                                <input
                                    value={pin}
                                    onChange={e => setPin(e.target.value)}
                                    className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30'
                                    type="password"
                                    placeholder='4-6 digits or an alphanumeric password'
                                    autoComplete="new-password"
                                    minLength={4}
                                    maxLength={64}
                                />
                                <p className="text-sm leading-6 text-slate-500">You&apos;ll use this PIN whenever you want to edit your profile.</p>
                                <p className="text-sm leading-6 text-slate-500">Save this PIN! There is no email recovery, though this device will remember your session.</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h2 className='text-2xl font-semibold text-slate-900'>Step 2: Add Links</h2>

                            <div className="space-y-3">
                                {links.map((item, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <div className='grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2'>
                                            <input
                                                value={item.linktext}
                                                onChange={e => handleLinkChange(index, "linktext", e.target.value)}
                                                className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30'
                                                type="text"
                                                placeholder='Label (e.g. My Portfolio)'
                                            />
                                            <input
                                                value={item.link}
                                                onChange={e => handleLinkChange(index, "link", e.target.value)}
                                                className={`w-full rounded-2xl border bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:ring-4 focus:ring-pink-300/30 ${item.link && !isValidUrl(item.link) ? 'border-red-400 focus:border-red-400' : 'border-white/80 focus:border-pink-400'}`}
                                                type="url"
                                                placeholder='https://example.com'
                                            />
                                        </div>
                                        <button
                                            onClick={() => removeLink(index)}
                                            disabled={links.length === 1}
                                            title="Remove this link"
                                            className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-100 hover:text-red-700 active:translate-y-0 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={addLink}
                                className='flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-700 active:translate-y-0'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                </svg>
                                Add Link
                            </button>
                        </div>

                        <div className="space-y-3">
                            <h2 className='text-2xl font-semibold text-slate-900'>Step 3: Profile Picture &amp; Bio</h2>
                            <div className='flex flex-col gap-4'>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Avatar URL</label>
                                    <input
                                        value={pic}
                                        onChange={e => setPic(e.target.value)}
                                        className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30'
                                        type="url"
                                        placeholder='https://example.com/avatar.jpg'
                                    />
                                    {pic && (
                                        <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/50 p-3">
                                            <img
                                                src={pic}
                                                alt="Avatar preview"
                                                onError={e => { e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(handle || "?") + "&background=d8b4fe&color=7c3aed&bold=true" }}
                                                className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-white object-cover shadow-md"
                                            />
                                            <span className="text-sm text-slate-600 truncate">{pic}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-slate-700">Bio / Description</label>
                                        <span className={`text-xs font-medium tabular-nums ${desc.length >= BIO_MAX ? 'text-red-500' : desc.length >= BIO_MAX * 0.85 ? 'text-amber-500' : 'text-slate-400'}`}>
                                            {desc.length}/{BIO_MAX}
                                        </span>
                                    </div>
                                    <textarea
                                        value={desc}
                                        onChange={e => setDesc(e.target.value.slice(0, BIO_MAX))}
                                        rows={3}
                                        className='w-full resize-none rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30'
                                        placeholder='Tell people what you do in a few words...'
                                    />
                                </div>

                                <button
                                    disabled={!canSubmit || submitting}
                                    onClick={submitLinks}
                                    className='mt-2 w-fit rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-bold text-white shadow-lg shadow-purple-900/20 hover:-translate-y-0.5 hover:from-purple-500 hover:to-pink-500 active:translate-y-0 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none'
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Creating...
                                        </span>
                                    ) : "Create your OneLink"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex min-h-[20rem] items-center justify-center rounded-[2rem] border border-white/50 bg-white/20 p-5 shadow-xl backdrop-blur-sm lg:sticky lg:top-28 lg:min-h-0">
                    <Image className='max-h-[42rem] w-auto max-w-full object-contain drop-shadow-2xl' src="/generate.png" alt="Generate your links" width={1024} height={1964} priority />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

const Generate = () => (
    <Suspense fallback={<div className="min-h-screen bg-[#E9C0E9]" />}>
        <GenerateForm />
    </Suspense>
)

export default Generate
