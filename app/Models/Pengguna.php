<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Pengguna extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password'];

    public function results()
    {
        return $this->hasMany(Result::class);
    }
    public function profilUsaha()
{
    return $this->hasOne(ProfilUsaha::class, 'pengguna_id');
}

}
