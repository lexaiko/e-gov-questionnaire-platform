<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Answer;
use App\Models\Question;

class AnswerSeeder extends Seeder
{
    public function run(): void
    {
        $jawabanSet = [
            ['jawaban' => 'Tidak Pernah', 'bobot' => 1],
            ['jawaban' => 'Kadang-kadang', 'bobot' => 2],
            ['jawaban' => 'Sering', 'bobot' => 3],
        ];

        $questions = Question::all();

        foreach ($questions as $question) {
            foreach ($jawabanSet as $jawaban) {
                Answer::create([
                    'question_id' => $question->id,
                    'jawaban' => $jawaban['jawaban'],
                    'bobot' => $jawaban['bobot'],
                ]);
            }
        }
    }
}
