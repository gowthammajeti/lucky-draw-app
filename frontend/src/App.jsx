import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import Section from "./components/Section";
import Toast from "./components/Toast";
import AddParticipantForm from "./components/AddParticipantForm";
import ParticipantsTable from "./components/ParticipantsTable";
import RunDraw from "./components/RunDraw";
import HistoryTable from "./components/HistoryTable";
import {
    addParticipant,
    deleteParticipant,
    getDraws,
    getParticipants,
    runDraw,
} from "./api";

export default function App() {
    const [participants, setParticipants] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [winner, setWinner] = useState(null);

    async function loadAll() {
        try {
            const [p, h] = await Promise.all([getParticipants(), getDraws()]);
            setParticipants(p);
            setHistory(h);
        } catch (e) {
            setToast(e.message || "Unable to reach backend. Start Spring Boot?");
        }
    }

    useEffect(() => {
        loadAll();
    }, []);

    const stats = useMemo(() => ({
        participants: participants.length,
        draws: history.length,
        lastWinner: history[history.length - 1]?.winner?.name || "—",
    }), [participants, history]);

    async function handleAdd(name, email) {
        setLoading(true);
        try {
            await addParticipant(name, email);
            setToast("Participant added");
            await loadAll();
        } catch (e) {
            setToast(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        setLoading(true);
        try {
            await deleteParticipant(id);
            setToast("Deleted");
            await loadAll();
        } catch (e) {
            setToast(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDraw() {
        setLoading(true);
        try {
            const res = await runDraw();
            setWinner(res);
            setToast("Winner selected!");
            await loadAll();
        } catch (e) {
            setToast(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="mx-auto max-w-6xl px-4 py-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard label="Participants" value={stats.participants} />
                    <StatCard label="Total Draws" value={stats.draws} />
                    <StatCard label="Last Winner" value={stats.lastWinner} />
                </div>

                {/* Section A: Add + List */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Section title="Add Participant">
                        <AddParticipantForm onAdd={handleAdd} loading={loading} />
                    </Section>

                    <div className="lg:col-span-2">
                        <Section
                            title="Participants"
                            right={<span className="text-sm text-gray-500">{participants.length} total</span>}
                        >
                            <ParticipantsTable
                                participants={participants}
                                onDelete={handleDelete}
                                loading={loading}
                            />
                        </Section>
                    </div>
                </div>

                {/* Section B: Draw + History */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Section title="Run Draw">
                        <RunDraw
                            canDraw={participants.length > 0}
                            onDraw={handleDraw}
                            loading={loading}
                            winner={winner}
                        />
                    </Section>

                    <div className="lg:col-span-2">
                        <Section
                            title="Draw History"
                            right={<span className="text-sm text-gray-500">{history.length} draws</span>}
                        >
                            <HistoryTable history={history} />
                        </Section>
                    </div>
                </div>
            </main>

            <Toast message={toast} onClose={() => setToast(null)} />
        </div>
    );
}
