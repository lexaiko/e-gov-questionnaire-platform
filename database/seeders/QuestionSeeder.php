<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            'Saya merasa tenang dan tidak cemas',
            'Saya masih bisa menikmati aktivitas harian saya',
            'Saya bisa menghadapi masalah dengan baik',
            'Saya merasa percaya diri dengan diri saya sendiri',
        ];

        foreach ($questions as $index => $pertanyaan) {
            Question::create([
                'pertanyaan' => $pertanyaan,
                'order' => $index + 1,
            ]);
        }
    }
}
