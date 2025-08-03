<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengguna;
use App\Models\ProfilUsaha;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function showLoginForm()
    {
        return inertia('Auth/Login');
    }
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }


    public function showRegisterForm()
    {
        return inertia('Auth/Register'); // ⬅️ path ke form register
    }
    public function showProfilForm()
    {
        return Inertia::render('Auth/Profil');
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::guard('pengguna')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended(route('pengguna.dashboard'));
        }

        return back()->withErrors([
            'email' => 'Email atau password salah',
        ]);
    }



public function register(Request $request)
{
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'unique:penggunas,email'],
        'password' => ['required', 'min:6', 'confirmed'],
    ]);

    // Simpan data akun ke session dulu
    Session::put('register_data', [
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => $validated['password'], // belum di-hash dulu, nanti pas insert
    ]);

    return redirect()->route('auth.profil.form')->with('success', 'Silakan lengkapi profil usaha Anda.');
}

public function storeProfil(Request $request)
{
    $request->validate([
        'nama_usaha'      => 'required|string|max:255',
        'tahun_bergabung' => 'required|date',
        'kecamatan'       => 'required|string|max:255',
        'nama_pendamping' => 'required|string|max:255',
    ]);

    // Ambil data akun dari session
    $akun = Session::get('register_data');

    if (!$akun) {
        $error = 'Data akun tidak ditemukan. Silakan daftar ulang.';
        return redirect()->route('auth.register')->with('error', 'Data akun tidak ditemukan. Silakan daftar ulang.');
    }

    // dd($akun, $request->all());


    DB::beginTransaction();

    try {
        $pengguna = Pengguna::create([
            'name' => $akun['name'],
            'email' => $akun['email'],
            'password' => Hash::make($akun['password']),
        ]);

        ProfilUsaha::create([
            'nama_usaha'      => $request->nama_usaha,
            'tahun_bergabung' => $request->tahun_bergabung,
            'kecamatan'       => $request->kecamatan,
            'nama_pendamping' => $request->nama_pendamping,
            'pengguna_id'     => $pengguna->id,
        ]);
// dd($request->all());


        DB::commit();
        Session::forget('register_data'); // hapus session setelah selesai

        Auth::guard('pengguna')->login($pengguna);
        return redirect()->route('pengguna.dashboard')->with('success', 'Akun dan profil usaha berhasil dibuat!');;
    } catch (\Exception $e) {
        DB::rollBack();
        return redirect()->route('auth.profil.form')->with(['error' => 'Gagal menyimpan data.']);
    }
}


    public function logout(Request $request)
    {
        Auth::guard('pengguna')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('login');
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengguna $pengguna)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengguna $pengguna)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengguna $pengguna)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengguna $pengguna)
    {
        //
    }
}
