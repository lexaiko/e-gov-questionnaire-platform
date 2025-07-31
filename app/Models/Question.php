<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['pertanyaan', 'order'];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function resultDetails()
    {
        return $this->hasMany(ResultDetail::class);
    }
}
