"use client"
import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

const GenerateForm = () => {
    const searchParams = useSearchParams()
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [pic, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }

    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "pic": pic,
            "desc": desc
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            toast.success(result.message)
            setLinks([{ link: "", linktext: "" }])
            setpic("")
            sethandle("")
            setdesc("")
        }
        else {
            toast.error(result.message)
        }
    }

    return (
        <div className='min-h-screen bg-[radial-gradient(circle_at_top_left,_#f7d8f7,_#e9c0e9_45%,_#d9b8e9)] px-4 pb-16 pt-32 sm:px-8 lg:px-16'>
            <div className='mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16'>
                <div className="flex w-full justify-center text-gray-900 lg:justify-start">
                    <div className='w-full max-w-xl space-y-8 rounded-[2rem] border border-white/70 bg-white/45 p-6 shadow-2xl shadow-purple-900/10 backdrop-blur-xl sm:p-10'>
                        <div className="space-y-2">
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-pink-700">Build your profile</p>
                            <h1 className='text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl'>Create your OneLink</h1>
                        </div>
                        <div className="space-y-3">
                            <h2 className='text-2xl font-semibold text-slate-900'>Step 1: Claim your Handle</h2>
                            <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30' type="text" placeholder='Choose a Handle' />
                        </div>
                        <div className="space-y-3">
                            <h2 className='text-2xl font-semibold text-slate-900'>Step 2: Add Links</h2>
                            {links && links.map((item, index) => {
                                return <div key={index} className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                                    <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30' type="text" placeholder='Enter link text' />
                                    <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30' type="text" placeholder='Enter link' />
                                </div>
                            })}
                            <button onClick={() => addLink()} className='rounded-xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-700 active:translate-y-0'>+ Add Link</button>
                        </div>

                        <div className="space-y-3">
                            <h2 className='text-2xl font-semibold text-slate-900'>Step 3: Add Picture and Description</h2>
                            <div className='flex flex-col gap-3'>
                                <input value={pic || ""} onChange={e => { setpic(e.target.value) }} className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30' type="text" placeholder='Enter link to your Picture' />
                                <input value={desc || ""} onChange={e => { setdesc(e.target.value) }} className='w-full rounded-2xl border border-white/80 bg-white/75 px-5 py-3 text-gray-900 shadow-sm outline-none placeholder:text-gray-500 focus:border-pink-400 focus:ring-4 focus:ring-pink-300/30' type="text" placeholder='Enter description' />
                                <button disabled={pic == "" || handle == "" || links.length === 0 || links[0].linktext == ""} onClick={() => { submitLinks() }} className='mt-2 w-fit rounded-xl bg-slate-900 px-6 py-3 font-bold text-white shadow-lg shadow-slate-900/15 hover:-translate-y-0.5 hover:bg-slate-700 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:shadow-none'>Create your OneLink</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex min-h-[20rem] items-center justify-center rounded-[2rem] border border-white/50 bg-white/20 p-5 shadow-xl backdrop-blur-sm lg:min-h-0">
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
