export default function Header() {
    return (
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                <div className="text-xl font-semibold">🎰 Lucky Draw</div>
                <div className="text-sm text-gray-500">Spring Boot + MongoDB</div>
            </div>
        </header>
    );
}
