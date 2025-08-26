export default function Section({ title, right, children }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                {right}
            </div>
            {children}
        </div>
    );
}
