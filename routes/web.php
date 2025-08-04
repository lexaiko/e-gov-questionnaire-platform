<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\KuisionerController;

Route::middleware('guest:pengguna')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    // Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    // Route::post('/register', [AuthController::class, 'register']);


    Route::get('/register', [AuthController::class, 'showRegister'])->name('auth.register');
    Route::post('/register', [AuthController::class, 'register'])->name('auth.register.submit');

    Route::get('/register/profil', [AuthController::class, 'showProfilForm'])->name('auth.profil.form');
    Route::post('/register/profil', [AuthController::class, 'storeProfil'])->name('auth.profil.submit');
});

Route::middleware('auth:pengguna')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('pengguna.logout');
    Route::get('/dashboard', [KuisionerController::class, 'dashboard'])->name('pengguna.dashboard');
    Route::get('/kuisioner', [KuisionerController::class, 'index'])->name('kuisioner.index');
    Route::post('/kuisioner', [KuisionerController::class, 'store'])->name('kuisioner.store');
    Route::get('/kuisioner/hasil/{id}', [KuisionerController::class, 'hasil'])->name('kuisioner.hasil');
    Route::get('/kuisioner/hasil/{id}/download', [KuisionerController::class, 'download'])->name('kuisioner.download');
    Route::get('/profil', [ProfilController::class, 'index'])->name('profil.index');
    Route::get('/profil/edit-akun', [ProfilController::class, 'editAkun'])->name('profil.edit.akun');
    Route::put('/profil/edit-akun', [ProfilController::class, 'updateAkun'])->name('profil.update.akun');

    Route::get('/profil/edit-usaha', [ProfilController::class, 'editUsaha'])->name('profil.edit.usaha');
    Route::put('/profil/edit-usaha', [ProfilController::class, 'updateUsaha'])->name('profil.update.usaha');
});

Route::middleware(['auth:web', 'can:view_result'])->group(function () {
    Route::get('/admin/result/{id}/download', [KuisionerController::class, 'exportAdmin'])->name('kuisioner.admin.download');
    Route::get('/admin/result/download', [KuisionerController::class, 'exportAllResults'])->name('kuisioner.export.all');

});


Route::get('/', function () {
    if (Auth::guard('pengguna')->check()) {
    return redirect()->route('pengguna.dashboard');
}

    return Inertia::render('Home');
})->name('landing');



