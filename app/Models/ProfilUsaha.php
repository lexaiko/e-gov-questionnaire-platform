<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilUsaha extends Model
{
    use HasFactory;

    protected $table = 'profil_usahas';

    protected $fillable = [
        'nama_usaha',
        'tahun_bergabung',
        'kecamatan',
        'nama_pendamping',
        'pengguna_id',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class, 'pengguna_id');
    }
}
