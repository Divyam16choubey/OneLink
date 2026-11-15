"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")
  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }
  return (
    <main>
      <section className="grid min-h-screen grid-cols-1 items-center gap-12 overflow-hidden bg-[#254f1a] px-6 py-32 sm:px-10 lg:grid-cols-2 lg:px-[10vw] lg:py-24">
        <div className="flex flex-col justify-center gap-5">
          <div className="max-w-3xl space-y-1">
            <p className="text-5xl font-bold leading-[1.05] tracking-tight text-yellow-300 sm:text-6xl lg:text-7xl">Everything you </p>
            <p className="text-5xl font-bold leading-[1.05] tracking-tight text-yellow-300 sm:text-6xl lg:text-7xl">are. In one,</p>
            <p className="text-5xl font-bold leading-[1.05] tracking-tight text-yellow-300 sm:text-6xl lg:text-7xl">simple link in bio.</p>
          </div>
          <p className="my-2 max-w-2xl text-lg leading-8 text-yellow-50/85 sm:text-xl">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md sm:flex-row">
            <input value={text} onChange={(e) => setText(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:border-pink-300 focus:ring-4 focus:ring-pink-200/30" type="text" placeholder="Enter your Handle" />
            <button onClick={() => createTree()} className="rounded-xl bg-pink-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-pink-950/20 hover:-translate-y-0.5 hover:bg-pink-200 active:translate-y-0">Claim your OneLink</button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md sm:p-8">
            <img className="h-auto w-full max-w-md drop-shadow-2xl" src="/home.png" alt="homepage image" />
          </div>
        </div>
      </section>
      <section className="min-h-[40vh] bg-red-700">

      </section>
    </main>
  );
}
