<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\KuisionerController;

Route::middleware('guest:pengguna')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth:pengguna')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('pengguna.logout');
    Route::get('/dashboard', [KuisionerController::class, 'dashboard'])->name('pengguna.dashboard');
    Route::get('/kuisioner', [KuisionerController::class, 'index'])->name('kuisioner.index');
    Route::post('/kuisioner', [KuisionerController::class, 'store'])->name('kuisioner.store');
    Route::get('/kuisioner/hasil/{id}', [KuisionerController::class, 'hasil'])->name('kuisioner.hasil');
    Route::get('/kuisioner/hasil/{id}/download', [KuisionerController::class, 'download'])->name('kuisioner.download');
});


Route::get('/', function () {
    if (Auth::guard('pengguna')->check()) {
    return redirect()->route('pengguna.dashboard');
}

    return Inertia::render('Home');
})->name('landing');


Route::resource('posts', PostController::class);


