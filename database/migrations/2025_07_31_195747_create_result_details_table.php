<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('result_details', function (Blueprint $table) {
        $table->id();
        $table->foreignId('result_id')->constrained('results')->onDelete('cascade');
        $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');
        $table->foreignId('answer_id')->constrained('answers')->onDelete('cascade');
        $table->integer('bobot');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('result_details');
    }
};
