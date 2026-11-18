import clientPromise from "@/lib/mongodb"
import { hashPin, isValidPin } from "@/lib/pin"

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

export async function POST(request) {
    let body
    try {
        body = await request.json()
    } catch {
        return Response.json({ success: false, error: true, message: "Invalid request body.", result: null }, { status: 400 })
    }

    const { handle, pic, desc, links, pin } = body

    if (!handle || typeof handle !== "string" || !HANDLE_RE.test(handle.trim())) {
        return Response.json({
            success: false, error: true,
            message: "Handle is required and must be 1–30 characters (letters, numbers, underscores only).",
            result: null
        }, { status: 400 })
    }

    if (!isValidPin(pin)) {
        return Response.json({
            success: false, error: true,
            message: "An Edit PIN is required. Use a 4â€“6 digit PIN or a 4â€“64 character alphanumeric password.",
            result: null
        }, { status: 400 })
    }

    if (!pic || typeof pic !== "string" || !isValidUrl(pic.trim())) {
        return Response.json({
            success: false, error: true,
            message: "A valid profile picture URL (http/https) is required.",
            result: null
        }, { status: 400 })
    }

    const cleanedDesc = typeof desc === "string" ? desc.trim().slice(0, BIO_MAX) : ""

    if (!Array.isArray(links) || links.length === 0) {
        return Response.json({
            success: false, error: true,
            message: "At least one link is required.",
            result: null
        }, { status: 400 })
    }

    const cleanedLinks = []
    for (let i = 0; i < links.length; i++) {
        const item = links[i]

        if (typeof item !== "object" || item === null) {
            return Response.json({
                success: false, error: true,
                message: `Link at position ${i + 1} is malformed.`,
                result: null
            }, { status: 400 })
        }

        const linktext = typeof item.linktext === "string" ? item.linktext.trim() : ""
        const link = typeof item.link === "string" ? item.link.trim() : ""

        if (!linktext) {
            return Response.json({
                success: false, error: true,
                message: `Link ${i + 1} is missing a label.`,
                result: null
            }, { status: 400 })
        }

        if (!link || !isValidUrl(link)) {
            return Response.json({
                success: false, error: true,
                message: `Link ${i + 1} ("${linktext}") has an invalid URL. Make sure it starts with http:// or https://.`,
                result: null
            }, { status: 400 })
        }

        cleanedLinks.push({ linktext, link })
    }

    const cleanedHandle = handle.trim().toLowerCase()

    const client = await clientPromise
    const db = client.db("onelink")
    const collection = db.collection("links")

    const existing = await collection.findOne({ handle: cleanedHandle })
    if (existing) {
        return Response.json({
            success: false, error: true,
            message: "This OneLink handle is already taken. Please choose a different one.",
            result: null
        }, { status: 409 })
    }

    const doc = {
        handle: cleanedHandle,
        pin: await hashPin(pin.trim()),
        pic: pic.trim(),
        desc: cleanedDesc,
        links: cleanedLinks,
        createdAt: new Date(),
    }

    const result = await collection.insertOne(doc)

    return Response.json({
        success: true, error: false,
        message: "Your OneLink has been created!",
        result: { insertedId: result.insertedId }
    }, { status: 201 })
}
