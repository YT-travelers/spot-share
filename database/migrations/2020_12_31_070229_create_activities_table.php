<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id('activity_id');
            $table->string('activity_name');
            $table->string('activity_open_time_hours')->nullable();
            $table->string('activity_open_time_minutes')->nullable();
            $table->string('activity_close_time_hours')->nullable();
            $table->string('activity_close_time_minutes')->nullable();
            $table->string('activity_summary')->nullable();
            $table->string('activity_address')->nullable();
            $table->string('activity_url')->nullable();
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
        Schema::dropIfExists('activities');
    }
}
