<?php

namespace App\Exports;

use App\Models\Question;
use App\Models\Result;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ResultAllExport implements FromArray, WithHeadings
{
    protected $results;

    public function __construct()
    {
        // Eager load relasi biar hemat query
        $this->results = Result::with([
            'pengguna',
            'pengguna.profilUsaha', // tambahkan profil usaha
            'resultDetails.answer',
        ])->get();
    }

    public function headings(): array
    {
        // Ambil jumlah soal dari database
        $totalSoal = Question::count();

        $headers = ['Nama', 'Email', 'Nama Usaha', 'Tahun Bergabung', 'Kecamatan', 'Nama Pendamping'];
        for ($i = 1; $i <= $totalSoal; $i++) {
            $headers[] = 'Jawaban ' . $i;
        }
        $headers[] = 'Total Skor';
        $headers[] = 'Hasil';
        return $headers;
    }

    public function array(): array
    {
        $data = [];

        foreach ($this->results as $result) {
            $row = [
                $result->pengguna->name,
                $result->pengguna->email,
                $result->pengguna->profilUsaha->nama_usaha,
                $result->pengguna->profilUsaha->tahun_bergabung,
                $result->pengguna->profilUsaha->kecamatan,
                $result->pengguna->profilUsaha->nama_pendamping,
            ];

            // Jawaban berdasarkan jumlah soal
            $answers = [];
            foreach ($result->resultDetails as $detail) {
                $answers[] = $detail->answer->bobot ?? '-';
            }

            // Biar ga error kalo jumlah soal < jumlah data di database
            $answers = array_pad($answers, Question::count(), '-');

            $row = array_merge($row, $answers);
            $row[] = $result->skor_total . '%';
            $row[] = $result->hasil;

            $data[] = $row;
        }

        return $data;
    }
}


