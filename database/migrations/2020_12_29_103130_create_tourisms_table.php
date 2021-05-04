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
            $table->string('tourism_open_time_hours')->nullable();
            $table->string('tourism_open_time_minutes')->nullable();
            $table->string('tourism_close_time_hours')->nullable();
            $table->string('tourism_close_time_minutes')->nullable();
            $table->string('tourism_summary')->nullable();
            $table->string('tourism_address')->nullable();
            $table->string('tourism_url')->nullable();
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
