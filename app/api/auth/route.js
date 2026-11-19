import clientPromise from "@/lib/mongodb"
import { isValidPin, verifyPin } from "@/lib/pin"

const HANDLE_RE = /^[a-z0-9_]{1,30}$/

export async function POST(request) {
    let body
    try {
        body = await request.json()
    } catch {
        return Response.json({ success: false, message: "Invalid request body." }, { status: 400 })
    }

    const { handle, pin } = body
    if (!handle || typeof handle !== "string" || !HANDLE_RE.test(handle.trim())) {
        return Response.json({ success: false, message: "Enter a valid handle." }, { status: 400 })
    }

    if (!isValidPin(pin)) {
        return Response.json({ success: false, message: "Enter a valid Edit PIN." }, { status: 400 })
    }

    const cleanedHandle = handle.trim().toLowerCase()
    const client = await clientPromise
    const profile = await client.db("onelink").collection("links").findOne({ handle: cleanedHandle })

    if (!profile) {
        return Response.json({ success: false, message: "OneLink profile not found." }, { status: 404 })
    }

    if (!(await verifyPin(pin.trim(), profile.pin))) {
        return Response.json({ success: false, message: "Incorrect Edit PIN" }, { status: 401 })
    }

    return Response.json({ success: true, handle: cleanedHandle })
}
