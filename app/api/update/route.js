import clientPromise from "@/lib/mongodb"
import { isValidPin, verifyPin } from "@/lib/pin"

const HANDLE_RE = /^[a-z0-9_]{1,30}$/
const BIO_MAX = 160

function isValidUrl(str) {
    try {
        const url = new URL(str)
        return url.protocol === "http:" || url.protocol === "https:"
    } catch {
        return false
    }
}

function invalid(message) {
    return Response.json({ success: false, error: true, message, result: null }, { status: 400 })
}

export async function POST(request) {
    let body
    try {
        body = await request.json()
    } catch {
        return invalid("Invalid request body.")
    }

    const { handle, pin, pic, desc, links } = body

    if (!handle || typeof handle !== "string" || !HANDLE_RE.test(handle.trim())) {
        return invalid("Handle is required and must be 1â€“30 characters (letters, numbers, underscores only).")
    }

    if (!isValidPin(pin)) {
        return invalid("A valid Edit PIN is required.")
    }

    if (!pic || typeof pic !== "string" || !isValidUrl(pic.trim())) {
        return invalid("A valid profile picture URL (http/https) is required.")
    }

    if (!Array.isArray(links) || links.length === 0) {
        return invalid("At least one link is required.")
    }

    const cleanedLinks = []
    for (let i = 0; i < links.length; i++) {
        const item = links[i]
        const linktext = typeof item?.linktext === "string" ? item.linktext.trim() : ""
        const link = typeof item?.link === "string" ? item.link.trim() : ""

        if (!linktext || !isValidUrl(link)) {
            return invalid(`Link ${i + 1} must include a label and a valid http/https URL.`)
        }

        cleanedLinks.push({ linktext, link })
    }

    const cleanedHandle = handle.trim().toLowerCase()
    const client = await clientPromise
    const collection = client.db("onelink").collection("links")
    const profile = await collection.findOne({ handle: cleanedHandle })

    if (!profile) {
        return Response.json({ success: false, error: true, message: "OneLink profile not found.", result: null }, { status: 404 })
    }

    if (!(await verifyPin(pin.trim(), profile.pin))) {
        return Response.json({ success: false, error: true, message: "Incorrect Edit PIN", result: null }, { status: 401 })
    }

    await collection.updateOne(
        { _id: profile._id },
        {
            $set: {
                pic: pic.trim(),
                desc: typeof desc === "string" ? desc.trim().slice(0, BIO_MAX) : "",
                links: cleanedLinks,
                updatedAt: new Date(),
            },
        }
    )

    return Response.json({
        success: true,
        error: false,
        message: "Your OneLink has been updated!",
        result: null,
    })
}
