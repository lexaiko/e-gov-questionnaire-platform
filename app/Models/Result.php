<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    protected $fillable = ['pengguna_id', 'skor_total', 'hasil'];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class);
    }

    public function resultDetails()
    {
        return $this->hasMany(ResultDetail::class);
    }
}

