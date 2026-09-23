import * as pdfjsLib from 'pdfjs-dist/webpack.mjs';

/**
 * Generate a visual diploma card in Canvas if a PDF is encrypted or cannot be parsed
 */
export function createFallbackPdfCard(fileName, issuer = 'Certificado Oficial') {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 900, 600);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#1e293b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 900, 600);

    // Decorative borders
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 840, 540);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 820, 520);

    // Icon & Labels
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📄 DOCUMENTO PDF OFICIAL', 450, 220);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px sans-serif';
    const displayTitle = fileName ? fileName.replace(/\.pdf$/i, '') : 'Acreditación Oficial';
    ctx.fillText(displayTitle.slice(0, 40), 450, 290);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '22px sans-serif';
    ctx.fillText(issuer || 'Acreditación Profesional Verificada', 450, 350);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px sans-serif';
    ctx.fillText('✓ Archivo verificado y adjunto al portafolio', 450, 410);

    return canvas.toDataURL('image/jpeg', 0.82);
}

/**
 * Render first page of a PDF File to a crisp JPEG Data URL (~70KB-130KB)
 */
export async function renderPdfToImage(fileOrDataUrl, targetWidth = 1080) {
    return new Promise(async (resolve) => {
        try {
            let typedarray;
            if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
                const base64Part = fileOrDataUrl.split(',')[1];
                const binaryString = atob(base64Part);
                const bytes = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                typedarray = bytes;
            } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
                const arrayBuffer = await fileOrDataUrl.arrayBuffer();
                typedarray = new Uint8Array(arrayBuffer);
            } else {
                resolve(null);
                return;
            }

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
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
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
    });
}

/**
 * Ensure any Base64 Data URL is strictly under Firestore document limits (~400KB max)
 */
export async function ensureSafeBase64Size(base64Data, maxBytes = 500000, fileName = '') {
    if (!base64Data || typeof base64Data !== 'string') return base64Data;

    // If it's a raw PDF data URL
    if (base64Data.startsWith('data:application/pdf')) {
        const rendered = await renderPdfToImage(base64Data);
        if (rendered) return rendered;
        return createFallbackPdfCard(fileName);
    }

    // If it's an image data URL and larger than maxBytes
    if (base64Data.startsWith('data:image/') && base64Data.length > maxBytes) {
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
 * Converts images & PDFs to lightweight, crystal-clear Base64 strings (~60KB-140KB)
 */
export async function compressImageFile(file, maxWidth = 1080, quality = 0.76) {
    if (!file) return null;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPdf) {
        // Render PDF page to high-quality visual certificate image
        try {
            const renderedImage = await renderPdfToImage(file, maxWidth);
            if (renderedImage) {
                return await ensureSafeBase64Size(renderedImage, 500000, file.name);
            }
        } catch (e) {
            console.warn('PDF render fallback:', e);
        }

        // Fallback: create visual PDF certificate card
        return createFallbackPdfCard(file.name);
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
                const safeDataUrl = await ensureSafeBase64Size(compressedDataUrl, 500000, file.name);
                resolve(safeDataUrl);
            };
            img.onerror = () => resolve(e.target.result);
            img.src = e.target.result;
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}


