<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTourismsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tourisms', function (Blueprint $table) {
            $table->id('tourism_id');
            $table->string('tourism_name');
            $table->string('country_code');
            $table->foreign('country_code')->references('country_code')->on('countries');
            $table->dateTime('tourism_open_time')->nullable();
            $table->dateTime('tourism_close_time')->nullable();
            $table->string('tourism_summary')->default('');
            $table->string('tourism_address')->default('');
            $table->string('tourism_url')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tourisms');
    }
}
