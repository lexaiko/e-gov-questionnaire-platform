import { route } from "ziggy-js";
import { usePage, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Brand di Tengah */}
                        <div className="flex items-center justify-start">
                            <Link
                                href={route("landing")}
                                className="flex items-center gap-2"
                            >
                                <img
                                    src="https://github.githubassets.com/favicons/favicon.png"
                                    alt="Logo"
                                    className="h-6 sm:h-8"
                                />
                                <span className="text-base font-semibold text-gray-900 sm:text-xl">
                                    Self Assessment
                                </span>
                            </Link>
                        </div>

                        {/* Right Side: Burger + Auth */}
                        <div className="flex items-center gap-3">
                            {/* Mobile Auth Button */}
                            <div className="md:hidden">
                                {user ? (
    <Link
                                    href={route("pengguna.dashboard")}
                                    className="bg-transparent border border-yellow-500 text-yellow-500 text-sm font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-3"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            user.name
                                        )}`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="whitespace-nowrap">
                                        {user.name}
                                    </span>
                                </Link>
) : (
    <Link
        href={route("auth.register.submit")}
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow"
    >
        Daftar
    </Link>
)}

                            </div>

                            {/* Burger */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden text-gray-700 hover:text-yellow-600 focus:outline-none"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-6">
                            <Link
                                href={route("landing")}
                                className={`text-sm font-medium transition ${
                                    route().current("landing") ||
                                    route().current("pengguna.dashboard")
                                        ? "text-yellow-600"
                                        : "text-gray-700 hover:text-yellow-700"
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                href="#about"
                                className="text-sm font-medium text-gray-700 hover:text-yellow-700 transition"
                            >
                                About
                            </Link>
                        </div>

                        {/* Desktop Auth */}
                        <div className="hidden md:flex items-center space-x-4 ml-6">
                            {user ? (
                                <Link
                                    href={route("pengguna.dashboard")}
                                    className="bg-transparent border border-yellow-500 text-yellow-500 text-sm font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-3"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            user.name
                                        )}`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="whitespace-nowrap">
                                        {user.name}
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    href={route("auth.register.submit")}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow"
                                >
                                    Daftar
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4 space-y-2">
                            <Link
                                href={route("landing")}
                                className="block text-sm font-medium px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
                            >
                                Home
                            </Link>
                            <Link
                                href="#about"
                                className="block text-sm font-medium px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
                            >
                                About
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Main */}
            <main className="min-h-screen bg-white text-gray-900">
                {children}
            </main>

            {/* Footer */}
            <footer id="about" className="border-t bg-white py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()}{" "}
                        <a
                            href="https://github.com/lexaiko"
                            className="font-medium hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lexaiko™
                        </a>
                    </p>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                        <a href="#about" className="hover:underline">
                            About
                        </a>
                        <a href="#" className="hover:underline">
                            Privacy
                        </a>
                        <a href="#" className="hover:underline">
                            Licensing
                        </a>
                        <a href="#" className="hover:underline">
                            Contact
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
