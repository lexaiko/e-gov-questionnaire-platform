import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Landing() {
    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
            <div className="my-16 max-w-4xl w-full text-center p-8 bg-white/50 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl">
                <img
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/932aa6ee-a06f-4591-a9d7-1ecbbb989090.png"
                    alt="Assessment Ilustration"
                    className="w-full max-h-80 object-contain rounded-xl border-4 border-yellow-300 mb-6 shadow-md hover:border-yellow-400 transition-all duration-500"
                />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 drop-shadow-md">
                    Aplikasi Self Assessment
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Nilai kemampuanmu dengan kuisioner sederhana. Temukan keunggulanmu dan area yang bisa ditingkatkan!
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link
                        href={route("login")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Masuk
                    </Link>
                    <Link
                        href={route("register")}
                        className="bg-white border-2 border-yellow-500 hover:bg-yellow-100 text-yellow-600 px-8 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-105"
                    >
                        Daftar
                    </Link>
                </div>
            </div>
        </div>
    );
}
