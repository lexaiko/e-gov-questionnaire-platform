// resources/js/Pages/Pengguna/Dashboard.jsx

import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
export default function Dashboard({ name }) {

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Selamat Datang, {name} 👋</h1>

        <p className="text-gray-600">
          Ini adalah dashboard pengguna kamu. Dari sini, kamu bisa kelola profil, lihat data, atau fitur lainnya yang kamu tambahkan nanti.
        </p>

        <div className="mt-6 flex justify-between">
          <Link
            href=""
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Mulai Assessment
          </Link>
          <Link
            href={route('pengguna.logout')}
            method="post"
            as="button"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
