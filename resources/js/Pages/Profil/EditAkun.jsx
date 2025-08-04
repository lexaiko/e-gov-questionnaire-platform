import { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function EditAkun({ pengguna }) {
    const { data, setData, put, processing, errors } = useForm({
        name: pengguna.name,
        email: pengguna.email,
    });

    const [clientError, setClientError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        setClientError('');

        if (data.password !== data.password_confirmation) {
            setClientError('Password dan konfirmasi password tidak cocok.');
            return;
        }

        put(route('profil.update.akun'));
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-xl mx-auto mt-10">
            <h2 className="text-2xl text-yellow-500 font-bold mb-4">Edit Akun</h2>

            {clientError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                    {clientError}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password (kosongkan jika tidak mengubah)</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                    <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    {errors.password_confirmation && <p className="text-red-600 text-sm mt-1">{errors.password_confirmation}</p>}
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 mt-6 sm:mt-0">
                    <Link
                        className="w-full sm:w-auto px-5 py-2 rounded-md font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-2 sm:mb-0 text-center"
                        href={route('profil.index')}
                    >
                        Kembali
                    </Link>
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

