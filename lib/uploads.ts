import { put, del } from "@vercel/blob";
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function isVercelRuntime(): boolean {
  return process.env.VERCEL === "1";
}

function isBlobUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

function buildPathname(originalName: string): string {
  const ext = path.extname(originalName) || ".jpg";
  const random = Math.random().toString(36).slice(2);
  return `properties/${Date.now()}-${random}${ext}`;
}

/**
 * Upload a property image to Vercel Blob when BLOB_READ_WRITE_TOKEN is set.
 * Local/dev without a token falls back to public/uploads.
 * On Vercel, filesystem writes are impossible — require the Blob token.
 */
export async function uploadImage(file: File): Promise<string> {
  const pathname = buildPathname(file.name);

  if (hasBlobToken()) {
    const blob = await put(pathname, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  }

  if (isVercelRuntime()) {
    throw new Error(
      "Image uploads require BLOB_READ_WRITE_TOKEN. Create a Vercel Blob store, connect it to this project, and redeploy."
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  const filename = path.basename(pathname);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

/**
 * Delete an image: Blob URLs via del() when token is present,
 * local /uploads/... files via unlink otherwise.
 */
export async function deleteImage(url: string): Promise<void> {
  if (isBlobUrl(url)) {
    if (!hasBlobToken()) return;
    try {
      await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } catch {
      // ignore missing / already-deleted blobs
    }
    return;
  }

  if (url.startsWith("/uploads/") && !isVercelRuntime()) {
    try {
      await unlink(path.join(process.cwd(), "public", url.replace(/^\//, "")));
    } catch {
      // ignore missing files
    }
  }
}

/**
 * Upload all non-empty image File entries from a FormData field named "images".
 */
export async function uploadImagesFromFormData(
  formData: FormData
): Promise<string[]> {
  const files = formData.getAll("images").filter((f): f is File => {
    return f instanceof File && f.size > 0 && f.name.length > 0;
  });

  if (!files.length) return [];

  const urls: string[] = [];
  for (const file of files) {
    urls.push(await uploadImage(file));
  }
  return urls;
}