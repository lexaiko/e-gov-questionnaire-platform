<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;

Route::middleware('guest:pengguna')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::middleware('auth:pengguna')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('pengguna.logout');
    Route::get('/dashboard', fn () => inertia('Auth/Dashboard', ['name' => Auth::user()->name]))->name('pengguna.dashboard');
});


Route::get('/', function () {
    if (Auth::guard('pengguna')->check()) {
    return redirect()->route('pengguna.dashboard');
}

    return Inertia::render('Home');
})->name('landing');


Route::resource('posts', PostController::class);


