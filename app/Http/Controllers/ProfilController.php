<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

use App\Models\Pengguna;
use App\Models\ProfilUsaha;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfilController extends Controller
{
    public function index()
    {
        $pengguna = Pengguna::findOrFail(Auth::id());
        $profilUsaha = ProfilUsaha::where('pengguna_id', $pengguna->id)->first();

        return Inertia::render('Profil/Index', [
            'pengguna' => $pengguna,
            'profilUsaha' => $profilUsaha,
        ]);
    }

    public function editAkun()
    {
        $pengguna = Pengguna::findOrFail(Auth::id());

        return Inertia::render('Profil/EditAkun', [
            'pengguna' => $pengguna,
        ]);
    }

    public function updateAkun(Request $request)
{
    $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'password' => 'nullable|min:8|confirmed',
    ]);

    $pengguna = Pengguna::findOrFail(Auth::id());
    $pengguna->name = $request->name;
    $pengguna->email = $request->email;

    // hanya update password kalau diisi
    if ($request->filled('password')) {
        $pengguna->password = Hash::make($request->password);
    }

    $pengguna->save();

    return redirect()->route('profil.index')->with('success', 'Akun berhasil diperbarui.');
}


    public function editUsaha()
    {
        $profilUsaha = ProfilUsaha::firstOrCreate(
            ['pengguna_id' => Auth::id()],
            [
                'nama_usaha' => '',
                'tahun_bergabung' => date('Y'), // Set current year as default
                'kecamatan' => '',
                'nama_pendamping' => '',
            ]
        );

        return Inertia::render('Profil/EditUsaha', [
            'profilUsaha' => $profilUsaha,
        ]);
    }

    public function updateUsaha(Request $request)
    {
        $request->validate([
            'nama_usaha' => 'required',
            'tahun_bergabung' => 'required|digits:4|integer|min:1900|max:' . date('Y'),
            'kecamatan' => 'required',
            'nama_pendamping' => 'required',
        ]);

        $profilUsaha = ProfilUsaha::where('pengguna_id', Auth::id())->firstOrFail();
        $profilUsaha->update($request->only('nama_usaha', 'tahun_bergabung', 'kecamatan', 'nama_pendamping'));

        return redirect()->route('profil.index')->with('success', 'Profil usaha berhasil diperbarui.');
    }
}
