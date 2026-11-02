
import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export function getUploadDirectory(): string {
  return process.env.GALLERY_UPLOAD_DIR
    ? path.resolve(process.env.GALLERY_UPLOAD_DIR)
    : path.resolve(process.cwd(), "uploads");
}

function getSafeFilename(key: string): string {
  const filename = path.basename(key);

  if (!/^[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$/i.test(filename)) {
    throw new Error("Invalid gallery upload filename");
  }

  return filename;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  _contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const extension = path.extname(relKey).toLowerCase();

  if (![".jpg", ".jpeg", ".png", ".webp"].includes(extension)) {
    throw new Error("Unsupported gallery image format");
  }

  const filename = `${randomUUID()}${extension}`;
  const directory = getUploadDirectory();

  await mkdir(directory, { recursive: true });

  const fullPath = path.join(directory, filename);
  const contents = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);

  await writeFile(fullPath, contents, { flag: "wx" });

  return {
    key: filename,
    url: `/uploads/${filename}`,
  };
}

export async function deleteLocalUpload(key: string): Promise<void> {
  const filename = getSafeFilename(key);
  const fullPath = path.join(getUploadDirectory(), filename);

  try {
    await unlink(fullPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}
