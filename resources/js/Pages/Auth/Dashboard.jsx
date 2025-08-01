import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Dashboard({ name, results }) {
    console.log('Dashboard results:', results);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Selamat Datang, {name} 👋
        </h1>

        <p className="text-gray-600 mb-6">
          Ini adalah dashboard pengguna kamu. Dari sini, kamu bisa kelola profil, lihat data, atau fitur lainnya yang kamu tambahkan nanti.
        </p>

        <div className="flex justify-between mb-6">
          <Link
            href={route('kuisioner.index')}
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

        {/* TABEL HASIL KUISIONER */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Riwayat Kuisioner Kamu</h2>

          {results && results.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100 text-left text-sm text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">#</th>
                    <th className="py-2 px-4 border">Tanggal</th>
                    <th className="py-2 px-4 border">Skor (%)</th>
                    <th className="py-2 px-4 border">Hasil</th>
                    <th className="py-2 px-4 border">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id} className="text-sm text-gray-800 hover:bg-gray-50">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">{new Date(result.created_at).toLocaleDateString()}</td>
                      <td className="py-2 px-4 border">
                        <span className="inline-block w-4 h-4 mr-2 rounded-full" style={{ backgroundColor: result.skor_total >= 80 ? 'green' : result.skor_total >= 50 ? 'yellow' : 'red' }} />
                        {result.skor_total}
                      </td>
                      <td className="py-2 px-4 border">{result.hasil}</td>
                      <td className="py-2 px-4 border">
                        <Link
                          href={route('kuisioner.hasil', { id: result.id })}
                          className="text-blue-600 hover:underline"
                        >
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
