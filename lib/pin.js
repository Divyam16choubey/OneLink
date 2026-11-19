import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"

const scrypt = promisify(scryptCallback)

export const PIN_RE = /^(?:\d{4,6}|[A-Za-z0-9]{4,64})$/
export const OWNER_TOKEN_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const isValidPin = (pin) => typeof pin === "string" && PIN_RE.test(pin.trim())
export const isValidOwnerToken = (token) => typeof token === "string" && OWNER_TOKEN_RE.test(token.trim())

async function hashValue(value) {
    const salt = randomBytes(16).toString("hex")
    const hash = await scrypt(value, salt, 64)

    return `${salt}:${hash.toString("hex")}`
}

async function verifyValue(value, storedValue) {
    if (typeof storedValue !== "string") return false

    const [salt, storedHash] = storedValue.split(":")
    if (!salt || !storedHash || !/^[a-f0-9]+$/i.test(storedHash)) return false

    const inputHash = await scrypt(value, salt, 64)
    const expectedHash = Buffer.from(storedHash, "hex")

    return expectedHash.length === inputHash.length && timingSafeEqual(expectedHash, inputHash)
}

export const hashPin = hashValue
export const verifyPin = verifyValue
export const hashOwnerToken = hashValue
export const verifyOwnerToken = verifyValue
