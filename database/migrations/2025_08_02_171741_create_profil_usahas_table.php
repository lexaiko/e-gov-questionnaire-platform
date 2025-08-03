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
        Schema::create('profil_usahas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_usaha');
            $table->date('tahun_bergabung');
            $table->string('kecamatan');
            $table->string('nama_pendamping');
            $table->unsignedBigInteger('pengguna_id'); // foreign key
            $table->timestamps();

            $table->foreign('pengguna_id')->references('id')->on('penggunas')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profil_usahas');
    }
};
