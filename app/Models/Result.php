<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Result extends Model
{
    public $incrementing = false; // karena pakai UUID
    protected $keyType = 'string'; // UUID adalah string

    protected $fillable = ['pengguna_id', 'skor_total', 'kategori', 'rekomendasi'];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class);
    }

    public function resultDetails()
    {
        return $this->hasMany(ResultDetail::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }
}

