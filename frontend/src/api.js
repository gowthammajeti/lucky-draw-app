// api.js
const base = 'http://localhost:8080';

export async function getParticipants() {
    const r = await fetch(base + "/api/participants");
    if (!r.ok) throw new Error("Failed to load participants");
    return r.json();
}

export async function addParticipant(name, email) {
    const r = await fetch(base + "/api/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function deleteParticipant(id) {
    const r = await fetch(base + "/api/participants/" + id, { method: "DELETE" });
    if (!r.ok) throw new Error("Failed to delete participant");
}

export async function runDraw() {
    const r = await fetch(base + "/api/draws", { method: "POST" });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function getDraws() {
    const r = await fetch(base + "/api/draws");
    if (!r.ok) throw new Error("Failed to load draws");
    return r.json();
}
