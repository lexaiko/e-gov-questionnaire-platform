<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Pengguna;

class PenggunaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'Bagus Susanto',
                'email' => 'bagus@example.com',
                'password' => Hash::make('password123')
            ],
            [
                'name' => 'Dinda Arini',
                'email' => 'dinda@example.com',
                'password' => Hash::make('password123')
            ],
            [
                'name' => 'Raka Pratama',
                'email' => 'raka@example.com',
                'password' => Hash::make('password123')
            ],
            [
                'name' => 'Nina Rahmawati',
                'email' => 'nina@example.com',
                'password' => Hash::make('password123')
            ],
            [
                'name' => 'Ahmad Fauzi',
                'email' => 'ahmad@example.com',
                'password' => Hash::make('password123')
            ],
        ];

        foreach ($data as $user) {
            Pengguna::create($user);
        }
    }
}
