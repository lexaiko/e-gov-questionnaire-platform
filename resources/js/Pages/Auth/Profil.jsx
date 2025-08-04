import { useForm, usePage } from '@inertiajs/react';

export default function Profil() {
  const { data, setData, post, processing, errors } = useForm({
    nama_usaha: '',
    tahun_bergabung: '',
    kecamatan: '',
    nama_pendamping: '',
  }, {
    error: (props) => props.errors ?? {},
  });

  const { flash } = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('auth.profil.submit'));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Profil Usaha</h2>

        {flash.message && <p className="text-green-500 text-sm mb-4">{flash.message}</p>}
        {flash.success && <p className="text-green-500 text-sm mb-4">{flash.success}</p>}
        {flash.error && <p className="text-red-500 text-sm mb-4">{flash.error}</p>}

        <div className="mb-4">
          <label>Nama Usaha</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={data.nama_usaha}
            onChange={(e) => setData('nama_usaha', e.target.value)}
            required
          />
          {errors.nama_usaha && <p className="text-red-500 text-sm">{errors.nama_usaha}</p>}
        </div>

        <div className="mb-4">
          <label>Tahun Bergabung</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={data.tahun_bergabung}
            onChange={(e) => setData('tahun_bergabung', e.target.valueAsNumber)}
            maxLength={4}
            required
          />
          {errors.tahun_bergabung && <p className="text-red-500 text-sm">{errors.tahun_bergabung}</p>}
        </div>

        <div className="mb-4">
          <label>Kecamatan</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={data.kecamatan}
            onChange={(e) => setData('kecamatan', e.target.value)}
            required
          />
          {errors.kecamatan && <p className="text-red-500 text-sm">{errors.kecamatan}</p>}
        </div>

        <div className="mb-4">
          <label>Nama Pendamping</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={data.nama_pendamping}
            onChange={(e) => setData('nama_pendamping', e.target.value)}
            required
          />
          {errors.nama_pendamping && <p className="text-red-500 text-sm">{errors.nama_pendamping}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-300"
          disabled={processing}
        >
          Simpan
        </button>
      </form>
    </div>
  );
}

