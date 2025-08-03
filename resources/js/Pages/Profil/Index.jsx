import { Link, usePage } from '@inertiajs/react';

export default function Index() {
  const { pengguna, profilUsaha, flash } = usePage().props;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl text-yellow-500 font-bold mb-4">Profil</h2>

      {flash.success && <div className="text-green-600 mb-4">{flash.success}</div>}

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Akun Pengguna</h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <dt className="text-sm font-medium text-gray-500">
              Nama
            </dt>
            <dd className="text-sm text-gray-900">{pengguna.name}</dd>
            <dt className="text-sm font-medium text-gray-500">
              Email
            </dt>
            <dd className="text-sm text-gray-900">{pengguna.email}</dd>
        </dl>
        <Link
          href={route('profil.edit.akun')}
          className="text-blue-500 text-sm inline-block"
        >
          ✏️ Edit Akun
        </Link>
      </div>

      <div className="border-t border-gray-200 py-4">
        <h3 className="font-semibold mb-2">Profil Usaha</h3>
        {profilUsaha ? (
          <dl className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <dt className="text-sm font-medium text-gray-500">
              Nama Usaha
            </dt>
            <dd className="text-sm text-gray-900">{profilUsaha.nama_usaha}</dd>

            <dt className="text-sm font-medium text-gray-500">
              Tahun Bergabung
            </dt>
            <dd className="text-sm text-gray-900">{profilUsaha.tahun_bergabung}</dd>

            <dt className="text-sm font-medium text-gray-500">
              Kecamatan
            </dt>
            <dd className="text-sm text-gray-900">{profilUsaha.kecamatan}</dd>

            <dt className="text-sm font-medium text-gray-500">
              Nama Pendamping
            </dt>
            <dd className="text-sm text-gray-900">{profilUsaha.nama_pendamping}</dd>
          </dl>
        ) : (
          <p className="text-gray-500">Belum ada data usaha.</p>
        )}
        <Link
          href={route('profil.edit.usaha')}
          className="text-blue-500 text-sm mt-2 inline-block"
        >
          ✏️ Edit Profil Usaha
        </Link>
      </div>
    </div>
  );
}

