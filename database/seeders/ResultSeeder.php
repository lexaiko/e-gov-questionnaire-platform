<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Result;
use App\Models\ResultDetail;
use App\Models\Pengguna;

class ResultSeeder extends Seeder
{
    public function run(): void
    {
        $penggunas = Pengguna::take(5)->get(); // ambil 5 pengguna pertama

        foreach ($penggunas as $pengguna) {
            $result = Result::create([
                'pengguna_id' => $pengguna->id,
                'skor_total' => rand(10, 20),
                'hasil' => collect(['Rendah', 'Sedang', 'Tinggi'])->random(),
            ]);

            foreach (range(1, 4) as $questionId) {
                ResultDetail::create([
                    'result_id' => $result->id,
                    'question_id' => $questionId,
                    'answer_id' => rand(1, 3),
                    'bobot' => rand(1, 3),
                ]);
            }
        }
    }
}
