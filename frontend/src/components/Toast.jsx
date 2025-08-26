import { useEffect } from "react";

export default function Toast({ message, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);
    if (!message) return null;
    return (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-black/80 text-white px-4 py-2 shadow-lg">
            {message}
        </div>
    );
}
