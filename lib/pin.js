import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"

const scrypt = promisify(scryptCallback)

export const PIN_RE = /^(?:\d{4,6}|[A-Za-z0-9]{4,64})$/

export const isValidPin = (pin) => typeof pin === "string" && PIN_RE.test(pin.trim())

export async function hashPin(pin) {
    const salt = randomBytes(16).toString("hex")
    const hash = await scrypt(pin, salt, 64)

    return `${salt}:${hash.toString("hex")}`
}

export async function verifyPin(pin, storedPin) {
    if (typeof storedPin !== "string") return false

    const [salt, storedHash] = storedPin.split(":")
    if (!salt || !storedHash || !/^[a-f0-9]+$/i.test(storedHash)) return false

    const inputHash = await scrypt(pin, salt, 64)
    const expectedHash = Buffer.from(storedHash, "hex")

    return expectedHash.length === inputHash.length && timingSafeEqual(expectedHash, inputHash)
}
