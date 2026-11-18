"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

const SectionDivider = () => (
  <div aria-hidden="true" className="relative mx-auto my-12 h-px w-[calc(100%-3rem)] max-w-6xl sm:my-16 sm:w-[calc(100%-5rem)] lg:w-[calc(100%-20vw)]">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
    <div className="absolute left-1/2 top-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 bg-fuchsia-300/40 blur-sm" />
  </div>
)

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
    <main className="relative isolate min-h-screen overflow-hidden bg-white text-slate-900">
      <div aria-hidden="true" className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" />
      <section className="relative grid min-h-screen grid-cols-1 items-center gap-12 px-6 py-32 sm:px-10 lg:grid-cols-2 lg:px-[10vw] lg:py-24">
        <div className="flex flex-col justify-center gap-5">
          <div className="max-w-3xl space-y-1">
            <p className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Everything you</p>
            <p className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">are. In one,</p>
            <p className="bg-gradient-to-r from-pink-700 to-fuchsia-600 bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl">simple link in bio.</p>
          </div>
          <p className="my-2 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">Bring your work, ideas, and every important connection together in one elegant link for your entire online presence.</p>
          <div className="input flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/70 bg-white/60 p-3 shadow-xl shadow-fuchsia-950/10 backdrop-blur-md sm:flex-row">
            <input value={text} onChange={(e) => setText(e.target.value)} className="min-w-0 flex-1 rounded-xl border border-violet-100 bg-white/80 px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-200/50" type="text" placeholder="Enter your Handle" />
            <button onClick={() => createTree()} className="rounded-xl bg-pink-400 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-950/20 hover:-translate-y-0.5 hover:bg-pink-500 active:translate-y-0">Claim your OneLink</button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-xl shadow-fuchsia-950/10 backdrop-blur-md sm:p-8">
            <img className="h-auto w-full max-w-md drop-shadow-2xl" src="/home.png" alt="homepage image" />
          </div>
        </div>
      </section>
      <SectionDivider />
      <section id="how-it-works" className="scroll-mt-28 relative px-6 py-24 sm:px-10 sm:py-32 lg:px-[10vw]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-pink-600">How it works</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Your online presence, simplified.</h2>
            <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">Set up a beautiful home for everything you create in just a few thoughtful steps.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-7">
            {steps.map((step) => (
              <article key={step.number} className="group rounded-3xl border border-white/70 bg-white/60 p-6 shadow-xl shadow-fuchsia-950/10 backdrop-blur-md transition-transform duration-200 hover:-translate-y-1 hover:bg-white/75 sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-pink-100 bg-pink-50 text-sm font-semibold text-pink-700 shadow-md shadow-pink-950/10">
                  {step.number}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />
      <section id="about" className="scroll-mt-28 relative px-6 py-20 sm:px-10 sm:py-28 lg:px-[10vw]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-xl shadow-fuchsia-950/10 backdrop-blur-md sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-pink-600">About OneLink</p>
            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">One elegant place for everything you make.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">OneLink gives creators, teams, and curious humans a fast, beautiful home for their online presence. Gather your work, your ideas, and the places people can find you into one link that feels unmistakably yours.</p>
          </div>
          <div className="rounded-3xl border border-white/70 bg-white/60 p-6 shadow-lg shadow-fuchsia-950/10 backdrop-blur-md sm:p-8">
            <p className="text-lg font-semibold leading-8 text-slate-900">Less searching. More sharing.</p>
            <p className="mt-3 leading-7 text-slate-600">Whether you are sharing a portfolio, a new project, or the next big idea, OneLink keeps every important connection close at hand.</p>
            <div className="mt-6 h-px w-full bg-violet-100" />
            <p className="mt-5 text-sm font-semibold text-pink-700">One link. Entirely yours.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
