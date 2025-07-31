<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['question_id', 'jawaban', 'bobot'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function resultDetails()
    {
        return $this->hasMany(ResultDetail::class);
    }
}
