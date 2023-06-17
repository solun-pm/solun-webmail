import crypto from "crypto";

export function generateToken() {
  return crypto
    .randomBytes(128)
    .toString("base64")
    .replace(/\+/g, "0")
    .replace(/\//g, "1")
    .slice(0, 64);
}