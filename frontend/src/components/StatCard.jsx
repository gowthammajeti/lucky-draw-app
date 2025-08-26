export default function StatCard({ label, value }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 px-6 py-4 shadow-sm bg-white">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-2xl font-semibold mt-1 text-gray-900">{value}</div>
        </div>
    );
}
