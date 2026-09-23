import * as pdfjsLib from 'pdfjs-dist';

// Set up pdf.js worker using unpkg or dynamic worker
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;
}

/**
 * Render first page of a PDF File to a crisp JPEG Data URL (~100KB-180KB)
 */
export async function renderPdfToImage(file, targetWidth = 1280) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const typedarray = new Uint8Array(e.target.result);
                const loadingTask = pdfjsLib.getDocument({ data: typedarray });
                const pdf = await loadingTask.promise;
                const page = await pdf.getPage(1);

                const unscaledViewport = page.getViewport({ scale: 1.0 });
                const scale = targetWidth / unscaledViewport.width;
                const viewport = page.getViewport({ scale: Math.max(scale, 1.2) });

                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const context = canvas.getContext('2d');

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const renderedImageUrl = canvas.toDataURL('image/jpeg', 0.82);
                resolve(renderedImageUrl);
            } catch (err) {
                console.warn('PDF canvas render fallback:', err);
                resolve(null);
            }
        };
        reader.onerror = () => resolve(null);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Client-side file compression and optimization utility for Firestore
 * Converts images & PDFs to lightweight, crystal-clear Base64 strings (~80KB-180KB)
 */
export async function compressImageFile(file, maxWidth = 1280, quality = 0.78) {
    if (!file) return null;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPdf) {
        // Render PDF page to high-quality visual certificate image
        try {
            const renderedImage = await renderPdfToImage(file, maxWidth);
            if (renderedImage) {
                return renderedImage;
            }
        } catch (e) {
            console.warn('Could not render PDF to image:', e);
        }

        // Fallback: Read as raw Data URL if small enough
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
        });
    }

    // Standard Image Compression (JPEG, PNG, WebP)
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
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

                // Convert to compressed JPEG data URL (~60KB-140KB)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };
            img.onerror = () => resolve(e.target.result);
            img.src = e.target.result;
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}
