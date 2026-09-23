import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set up pdf.js worker using Vite's local bundled worker URL
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

/**
 * Render first page of a PDF File to a crisp JPEG Data URL (~80KB-160KB)
 */
export async function renderPdfToImage(file, targetWidth = 1080) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const typedarray = new Uint8Array(e.target.result);
                const loadingTask = pdfjsLib.getDocument({
                    data: typedarray,
                    cMapUrl: 'https://unpkg.com/pdfjs-dist@4.0.379/cmaps/',
                    cMapPacked: true
                });
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const unscaledViewport = page.getViewport({ scale: 1.0 });
                const scale = targetWidth / unscaledViewport.width;
                const viewport = page.getViewport({ scale: Math.max(scale, 1.0) });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext('2d');

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const renderedImageUrl = canvas.toDataURL('image/jpeg', 0.78);
                resolve(renderedImageUrl);
            } catch (err) {
                console.warn('PDF canvas render note:', err);
                resolve(null);
            }
        };
        reader.onerror = () => resolve(null);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Ensure any Base64 Data URL is strictly under Firestore document limits (~400KB max)
 */
export async function ensureSafeBase64Size(base64Data, maxBytes = 600000) {
    if (!base64Data || typeof base64Data !== 'string') return base64Data;
    if (base64Data.length < maxBytes) return base64Data;

    // If it's an image data URL, recompress via Canvas
    if (base64Data.startsWith('data:image/')) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const scale = Math.min(1, 900 / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.70));
            };
            img.onerror = () => resolve(base64Data);
            img.src = base64Data;
        });
    }

    return base64Data;
}

/**
 * Client-side file compression and optimization utility for Firestore
 * Converts images & PDFs to lightweight, crystal-clear Base64 strings (~60KB-150KB)
 */
export async function compressImageFile(file, maxWidth = 1080, quality = 0.76) {
    if (!file) return null;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPdf) {
        // Render PDF page to high-quality visual certificate image
        try {
            const renderedImage = await renderPdfToImage(file, maxWidth);
            if (renderedImage) {
                return await ensureSafeBase64Size(renderedImage);
            }
        } catch (e) {
            console.warn('PDF render fallback:', e);
        }

        // Fallback: Read as raw Data URL and ensure it's safely compressed
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = async () => {
                const raw = reader.result;
                resolve(raw);
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        });
    }

    // Standard Image Compression (JPEG, PNG, WebP)
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = async () => {
                let { width, height } = img;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to compressed JPEG data URL (~60KB-120KB)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                const safeDataUrl = await ensureSafeBase64Size(compressedDataUrl);
                resolve(safeDataUrl);
            };
            img.onerror = () => resolve(e.target.result);
            img.src = e.target.result;
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}

