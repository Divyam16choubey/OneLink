"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")
  const steps = [
    {
      number: "01",
      title: "Claim your handle",
      description: "Choose a simple, memorable OneLink address that feels like you.",
    },
    {
      number: "02",
      title: "Make it yours",
      description: "Add your bio, socials, latest work, and the links that matter most.",
    },
    {
      number: "03",
      title: "Share it everywhere",
      description: "Put one polished link in every profile and let people find your whole world.",
    },
  ]

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main className="overflow-hidden bg-[#faf9ff]">
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
      <section id="how-it-works" className="scroll-mt-28 relative isolate overflow-hidden px-6 py-20 sm:px-10 sm:py-28 lg:px-[10vw]">
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-violet-100/70 to-transparent" />
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-600">How it works</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Your online presence, simplified.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">Set up a beautiful home for everything you create in just a few thoughtful steps.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-7">
            {steps.map((step) => (
              <article key={step.number} className="group rounded-3xl border border-white/80 bg-white/70 p-6 shadow-lg shadow-violet-950/5 backdrop-blur-md transition-transform duration-200 hover:-translate-y-1 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 text-sm font-bold text-white shadow-md shadow-violet-500/25">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 px-6 pb-20 sm:px-10 sm:pb-28 lg:px-[10vw]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-950 via-indigo-900 to-violet-800 px-6 py-10 shadow-2xl shadow-violet-950/20 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-200">About OneLink</p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">One elegant place for everything you make.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-violet-100/85 sm:text-lg">OneLink gives creators, teams, and curious humans a fast, beautiful home for their online presence. Gather your work, your ideas, and the places people can find you into one link that feels unmistakably yours.</p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <p className="text-lg font-semibold leading-8 text-white">Less searching. More sharing.</p>
            <p className="mt-3 leading-7 text-violet-100/80">Whether you are sharing a portfolio, a new project, or the next big idea, OneLink keeps every important connection close at hand.</p>
            <div className="mt-6 h-px w-full bg-white/20" />
            <p className="mt-5 text-sm font-semibold text-violet-200">One link. Entirely yours.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
