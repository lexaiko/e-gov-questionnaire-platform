import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Landing() {
    return (
        <div className="flex flex-col  justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
            <div className=" py-16 w-full md:w-3/4 mx-auto">
                <img
                    src="/jumbotron.webp"
                    alt="Assessment Ilustration"
                    className="w-48 h-48 mb-6 rounded-full border-4 border-yellow-300 shadow-md hover:border-yellow-400 transition-all duration-500 mx-auto"
                />
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    Bagaimana Posisi Usahamu Saat ini?
                </h1>
                <p className="text-base sm:text-lg text-gray-700 mb-8">
                    Self Assessment Tenaga Kerja Mandiri Dinas Tenaga Kerja Transmigrasi dan Energi Provinsi DKI Jakarta
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href={route("login")}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl font-semibold transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Masuk
                    </Link>
                    <Link
                        href={route("auth.register.submit")}
                        className="bg-white border-2 border-yellow-500 hover:bg-yellow-100 text-yellow-600 px-6 py-2 rounded-xl font-semibold transition duration-300 transform hover:scale-105"
                    >
                        Daftar
                    </Link>
                </div>
            </div>
        </div>
    );
}

