export default function HistoryTable({ history }) {
    return (
        <>
            {history.length === 0 ? (
                <div className="text-sm text-gray-500">No draws yet.</div>
            ) : (
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
                        {history.map((d, idx) => (
                            <tr key={d.id || d._id} className="border-t">
                                <td className="px-4 py-2">{idx + 1}</td>
                                <td className="px-4 py-2">{d.winner?.name || "—"}</td>
                                <td className="px-4 py-2">{d.winner?.email || "—"}</td>
                                <td className="px-4 py-2">
                                    {d.createdAt ? new Date(d.createdAt).toLocaleString() : "—"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
