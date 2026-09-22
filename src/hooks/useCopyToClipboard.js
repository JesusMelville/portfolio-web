import { useState } from 'react';

export function useCopyToClipboard(resetDuration = 2500) {
    const [copied, setCopied] = useState(false);

    const copy = async (text) => {
        if (!navigator?.clipboard) {
            try {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopied(true);
                setTimeout(() => setCopied(false), resetDuration);
                return true;
            } catch (err) {
                console.error('Fallback copy failed', err);
                return false;
            }
        }

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), resetDuration);
            return true;
        } catch (err) {
            console.error('Failed to copy', err);
            setCopied(false);
            return false;
        }
    };

    return { copied, copy };
}
