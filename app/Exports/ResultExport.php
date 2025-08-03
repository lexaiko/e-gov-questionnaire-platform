<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;


class ResultExport implements FromArray, WithHeadings
{
    protected $result;

    public function __construct($result)
    {
        $this->result = $result;
    }

    public function headings(): array
    {
        $headers = ['Nama', 'Email', 'Nama Usaha', 'Tahun Bergabung', 'Kecamatan', 'Nama Pendamping'];
        foreach ($this->result->resultDetails as $index => $detail) {
            $headers[] = 'Jawaban ' . ($index + 1);
        }
        $headers[] = 'Total Skor';
        $headers[] = 'Hasil';
        return $headers;
    }

    public function array(): array
    {
        $row = [
            $this->result->pengguna->name,
            $this->result->pengguna->email,
            $this->result->pengguna->profilUsaha->nama_usaha,
            $this->result->pengguna->profilUsaha->tahun_bergabung,
            $this->result->pengguna->profilUsaha->kecamatan,
            $this->result->pengguna->profilUsaha->nama_pendamping,
        ];

        foreach ($this->result->resultDetails as $detail) {
            $row[] = $detail->answer->bobot;
        }

        $row[] = $this->result->skor_total. '%';
        $row[] = $this->result->hasil;

        return [$row];
    }
}

