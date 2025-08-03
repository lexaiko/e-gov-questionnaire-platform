import { useForm } from '@inertiajs/react';

export default function EditUsaha({ profilUsaha }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_usaha: profilUsaha.nama_usaha,
        tahun_bergabung: profilUsaha.tahun_bergabung,
        kecamatan: profilUsaha.kecamatan,
        nama_pendamping: profilUsaha.nama_pendamping,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('profil.update.usaha'));
    };

    return (
        <div className="p-8 max-w-xl mx-auto bg-white shadow-lg rounded-md">
            <h2 className="text-2xl text-yellow-500 font-bold mb-4">Edit Profil Usaha</h2>

            <form onSubmit={submit} className="space-y-6">
                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Nama Usaha</label>
                    <input
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={data.nama_usaha}
                        onChange={(e) => setData('nama_usaha', e.target.value)}
                    />
                    {errors.nama_usaha && <div className="text-red-600 mt-1 text-sm">{errors.nama_usaha}</div>}
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Tahun Bergabung</label>
                    <input
                        type="date"
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={data.tahun_bergabung}
                        onChange={(e) => setData('tahun_bergabung', e.target.value)}
                    />
                    {errors.tahun_bergabung && <div className="text-red-600 mt-1 text-sm">{errors.tahun_bergabung}</div>}
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Kecamatan</label>
                    <input
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={data.kecamatan}
                        onChange={(e) => setData('kecamatan', e.target.value)}
                    />
                    {errors.kecamatan && <div className="text-red-600 mt-1 text-sm">{errors.kecamatan}</div>}
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Nama Pendamping</label>
                    <input
                        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        value={data.nama_pendamping}
                        onChange={(e) => setData('nama_pendamping', e.target.value)}
                    />
                    {errors.nama_pendamping && <div className="text-red-600 mt-1 text-sm">{errors.nama_pendamping}</div>}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 mt-6 sm:mt-0">
                    <button
                        type="button"
                        className="w-full sm:w-auto px-5 py-2 rounded-md font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2 sm:mb-0"
                        onClick={() => window.location.href = route('profil.index')}
                    >
                        Kembali
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full sm:w-auto px-5 py-2 rounded-md font-medium text-white transition-all ${
                            processing ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-blue-300`}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    );
}

