export default function HistoryTable({ history, participants = [] }) {
    // quick lookup: participantId -> participant
    const byId = new Map(participants.map(p => [p.id || p._id, p]));

    if (history.length === 0) {
        return <div className="text-sm text-gray-500">No draws yet.</div>;
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">#</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Winner</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Email</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">When</th>
                </tr>
                </thead>
                <tbody>
                {history.map((d, idx) => {
                    const email = byId.get(d.winnerId)?.email || "—";
                    const when = d.drawnAt
                        ? new Date(d.drawnAt).toLocaleString()
                        : "—";
                    return (
                        <tr key={d.id || d._id || idx} className="border-t">
                            <td className="px-4 py-2">{idx + 1}</td>
                            <td className="px-4 py-2">{d.winnerName || "—"}</td>
                            <td className="px-4 py-2">{email}</td>
                            <td className="px-4 py-2">{when}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
