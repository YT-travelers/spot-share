<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_activities', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id')->primary();
            $table->foreign('route_detail_id')->references('route_detail_id')->on('route_details')->cascadeOnDelete();
            $table->unsignedBigInteger('activity_id');
            $table->foreign('activity_id')->references('activity_id')->on('activities');
            $table->integer('activity_rate')->nullable();
            $table->integer('activity_minutes')->nullable();
            $table->dateTime('activity_start_time')->nullable();
            $table->dateTime('activity_end_time')->nullable();
            $table->integer('activity_cost')->nullable();
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
        Schema::dropIfExists('route_detail_activities');
    }
}
