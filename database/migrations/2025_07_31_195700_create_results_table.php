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
        Schema::create('results', function (Blueprint $table) {
        $table->uuid('id')->primary();
        $table->foreignId('pengguna_id')->constrained('penggunas')->onDelete('cascade');
        $table->string('skor_total');
        $table->string('kategori');
        $table->string('rekomendasi');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
