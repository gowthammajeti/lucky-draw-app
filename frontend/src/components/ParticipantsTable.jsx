export default function ParticipantsTable({ participants, onDelete, loading }) {
    return (
        <>
            {participants.length === 0 ? (
                <div className="text-sm text-gray-500">No participants yet.</div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-600">Email</th>
                            <th className="px-4 py-2 text-right font-medium text-gray-600">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {participants.map((p) => (
                            <tr key={p.id || p._id} className="border-t">
                                <td className="px-4 py-2">{p.name}</td>
                                <td className="px-4 py-2">{p.email}</td>
                                <td className="px-4 py-2 text-right">
                                    <button
                                        onClick={() => onDelete(p.id || p._id)}
                                        className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
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
