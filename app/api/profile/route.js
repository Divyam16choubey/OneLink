import clientPromise from "@/lib/mongodb"

const HANDLE_RE = /^[a-z0-9_]{1,30}$/

export async function GET(request) {
    const handle = new URL(request.url).searchParams.get("handle")?.trim().toLowerCase()

    if (!handle || !HANDLE_RE.test(handle)) {
        return Response.json({ success: false, message: "Enter a valid handle." }, { status: 400 })
    }

    const client = await clientPromise
    const profile = await client.db("onelink").collection("links").findOne(
        { handle },
        { projection: { _id: 0, handle: 1, pic: 1, desc: 1, links: 1 } }
    )

    if (!profile) {
        return Response.json({ success: false, message: "OneLink profile not found." }, { status: 404 })
    }

    return Response.json({ success: true, profile })
}
