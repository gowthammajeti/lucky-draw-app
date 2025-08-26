export default function RunDraw({ canDraw, onDraw, loading, winner }) {
    return (
        <div className="space-y-4">
            <button
                onClick={onDraw}
                disabled={loading || !canDraw}
                className="w-full rounded-xl bg-green-600 px-4 py-3 text-white font-semibold shadow hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "Drawing..." : "🎯 Pick a Winner"}
            </button>

            {winner && (
                <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                    <div className="text-sm text-green-700">Winner</div>
                    <div className="text-lg font-semibold">{winner.name || winner.message}</div>
                    {winner.email && <div className="text-sm text-gray-600">{winner.email}</div>}
                </div>
            )}

            {!canDraw && (
                <div className="text-sm text-gray-500">
                    Add at least one participant to enable drawing.
                </div>
            )}
        </div>
    );
}
