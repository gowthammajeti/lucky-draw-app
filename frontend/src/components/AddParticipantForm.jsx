import { useState } from "react";

export default function AddParticipantForm({ onAdd, loading }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    async function submit(e) {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;
        await onAdd(name.trim(), email.trim());
        setName("");
        setEmail("");
    }

    return (
        <form onSubmit={submit} className="space-y-3">
            <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="name">Name</label>
                <input
                    id="name"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Alice"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="alice@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add"}
            </button>
        </form>
    );
}
