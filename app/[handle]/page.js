import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export const instant = false;

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("onelink")
    const collection = db.collection("links")

    // If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({ handle: handle })
    if (!item) {
        return notFound()
    }

    return <div className="flex min-h-screen items-start justify-center bg-[radial-gradient(circle_at_top,_#d8b4fe,_#a78bfa_45%,_#7c3aed)] px-4 py-28 sm:px-6">
        {item && <div className="photo flex w-full max-w-lg flex-col items-center justify-center gap-5 rounded-[2rem] border border-white/35 bg-white/15 px-5 py-8 shadow-2xl shadow-purple-950/25 backdrop-blur-xl sm:px-10">
            <img className="h-24 w-24 rounded-full border-4 border-white/80 object-cover shadow-xl" src={item.pic} alt="" />
            <span className="text-2xl font-bold tracking-tight text-white">@{item.handle}</span>
            <span className="desc w-full max-w-sm text-center leading-7 text-white/85">{item.desc}</span>
            <div className="links w-full space-y-3 pt-2">
                {item.links.map((item, index) => {
                    return <Link className="block" key={index} href={item.link}><div className="flex min-h-14 items-center justify-center rounded-2xl border border-white/50 bg-white/80 px-4 py-4 text-center font-semibold text-slate-900 shadow-lg shadow-purple-950/10 backdrop-blur-md hover:-translate-y-1 hover:bg-white hover:shadow-xl active:translate-y-0">
                        {item.linktext}
                    </div></Link>
                })}
            </div>
        </div>}
    </div>
}