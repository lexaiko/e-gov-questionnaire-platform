<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use App\Models\Result;
use App\Models\ResultDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ResultExport;
class KuisionerController extends Controller
{

public function download($id)
{
    $result = Result::with([
        'pengguna',
        'resultDetails.question',
        'resultDetails.answer',
    ])->where('id', $id)
      ->where('pengguna_id', auth()->id())
      ->firstOrFail();

    return Excel::download(new ResultExport($result), 'hasil_kuisioner.xlsx');
}
    public function index()
    {
        $questions = Question::with('answers')->orderBy('order')->get();

        return Inertia::render('Kuisioner/Index', [
            'questions' => $questions,
        ]);
    }
    public function dashboard()
{
    if (!Auth::guard('pengguna')->check()) {
        return redirect()->route('login')->with('message', 'Silakan login sebagai pengguna.');
    }

    $user = Auth::guard('pengguna')->user();

    $results = Result::where('pengguna_id', $user->id)->latest()->get();

    return inertia('Auth/Dashboard', [
        'name' => $user->name,
        'results' => $results,
    ]);
}


    public function store(Request $request)
    {
        $pengguna = Auth::user();
        $answers = $request->input('answers'); // [question_id => answer_id]

        $jumlahSoal = count($answers);
        $totalSkor = 0;

        DB::beginTransaction();
        try {
            // 1. Simpan result kosong dulu
            $result = Result::create([
                'pengguna_id' => $pengguna->id,
                'skor_total' => 0,
                'hasil' => '-',
            ]);

            // 2. Simpan detail per jawaban & hitung skor
            foreach ($answers as $question_id => $answer_id) {
                $answer = Answer::findOrFail($answer_id);
                $skorPerSoal = ($answer->bobot / 3) * 100;
                $totalSkor += $skorPerSoal;

                ResultDetail::create([
                    'result_id' => $result->id,
                    'question_id' => $question_id,
                    'answer_id' => $answer_id,
                    'bobot' => $answer->bobot,
                ]);
            }

            // 3. Kalkulasi final skor & hasil
            $finalSkor = round($totalSkor / $jumlahSoal, 2);
            $hasil = $finalSkor < 50 ? 'Cukup' : 'Baik';

            // 4. Update result
            $result->update([
                'skor_total' => $finalSkor,
                'hasil' => $hasil,
            ]);

            DB::commit();

            return redirect()->route('kuisioner.hasil', $result->id);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan kuisioner.']);
        }
    }

    public function hasil($id)
{
    $result = Result::with([
        'pengguna:id,name,email',
        'resultDetails' => function ($query) {
            $query->with([
                'question:id,pertanyaan',
                'answer:id,jawaban,bobot',
            ]);
        }
    ])->findOrFail($id);

    return Inertia::render('Kuisioner/Hasil', [
        'result' => $result
    ]);
}

}
