import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

function encrypt(text: string, password: string) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    ALGORITHM,
    crypto.createHash("sha256").update(password).digest(),
    iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string, password: string) {
  try {
    let textParts = text.split(":");
    // @ts-ignore
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      ALGORITHM,
      crypto.createHash("sha256").update(password).digest(),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error(
      "@utils/encryption.ts | Solun Auth Error - Decrypting | " + error
    );
    return "";
  }
}

export { encrypt, decrypt };
