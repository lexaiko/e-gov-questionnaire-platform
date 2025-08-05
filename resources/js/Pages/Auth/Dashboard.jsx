import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Dashboard({ name, results }) {
  const { flash } = usePage().props;
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-8">
        {flash.message && (
          <div className="bg-green-500 text-white py-2 px-4 rounded-lg shadow mb-4">
            {flash.message}
          </div>
        )}
        {flash.success && (
          <div className="bg-green-500 text-white py-2 px-4 rounded-lg shadow mb-4">
            {flash.success}
          </div>
        )}
        {flash.error && (
          <div className="bg-red-500 text-white py-2 px-4 rounded-lg shadow mb-4">
            {flash.error}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Selamat Datang, {name} 👋
        </h1>

        <p className="text-gray-600 mb-8">
          Di sini, kamu dapat melihat hasil self asessment terbaru kamu. Kamu dapat melihat data Assessment yang kamu input di sini.
        </p>

        <div className="flex justify-between mb-8">
          <Link
            href={route('kuisioner.index')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow"
          >
            Mulai Assessment
          </Link>
          <Link
            href={route('pengguna.logout')}
            method="post"
            as="button"
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg shadow"
          >
            Logout
          </Link>
        </div>

        <div className="mt-8 bg-white p-5 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">Riwayat Kuisioner Kamu</h2>

          {results && results.length > 0 ? (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 text-left text-sm text-gray-700">
                  <tr>
                    <th className="py-3 px-4 border">#</th>
                    <th className="py-3 px-4 border">Tanggal</th>
                    <th className="py-3 px-4 border whitespace-nowrap">Skor (%)</th>
                    <th className="py-3 px-4 border">Kategori</th>
                    <th className="py-3 px-4 border">Rekomendasi</th>
                    <th className="py-3 px-4 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id} className="text-sm text-gray-800 hover:bg-gray-50">
                      <td className="py-3 px-4 border">{index + 1}</td>
                      <td className="py-3 px-4 border">{new Date(result.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4 border whitespace-nowrap">
                        <span
                          className="inline-block w-4 h-4 mr-2 rounded-full"
                          style={{
                            backgroundColor:
                              result.skor_total < 62
                                ? 'red'
                                : result.skor_total < 78
                                ? 'yellow'
                                : 'green',
                          }}
                        />
                        {result.skor_total} %
                      </td>
                      <td className="py-3 px-4 border">{result.kategori}</td>
                      <td className="py-3 px-4 border">{result.rekomendasi}</td>
                      <td className="py-3 px-4 border">
                        <Link
                          href={route('kuisioner.hasil', { id: result.id })}
                          className="text-blue-600 flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 2C6.686 2 4 4.686 4 8c0 3.314 2.686 6 6 6s6-2.686 6-6c0-3.314-2.686-6-6-6zm0 11c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z" />
                          </svg>
                          Lihat Hasil
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-sm">Belum ada kuisioner yang diisi.</p>
          )}
        </div>
      </div>
    </div>
  );
}

