import fetch from "node-fetch";

const webhooks = new Set<string>();

export function registerWebhook(url: string): void {
    webhooks.add(url);
}

export function unregisterWebhook(url: string): void {
    webhooks.delete(url);
}

export async function emitEvent(event: string, payload: unknown): Promise<void> {
    const body = JSON.stringify({ event, payload });
    for (const url of webhooks) {
        try {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body,
            });
        } catch (err) {
            console.error(`Failed to send webhook to ${url}:`, err);
        }
    }
}
