<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_hotels', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id');
            $table->unsignedBigInteger('route_id');
            $table->primary(['route_id', 'route_detail_id']);
            $table->foreign(['route_id', 'route_detail_id'])->references(['route_id', 'route_detail_id'])->on('route_details')->cascadeOnDelete();
            $table->unsignedBigInteger('hotel_id');
            $table->foreign('hotel_id')->references('hotel_id')->on('hotels');
            $table->integer('hotel_breakfast_yes_no_div')->nullable();
            $table->integer('hotel_dinner_yes_no_div')->nullable();
            $table->integer('hotel_rate')->nullable();
            $table->integer('hotel_minutes')->nullable();
            $table->string('hotel_check_in_time_hours')->nullable();
            $table->string('hotel_check_in_time_minutes')->nullable();
            $table->string('hotel_check_out_time_hours')->nullable();
            $table->string('hotel_check_out_time_minutes')->nullable();
            $table->integer('hotel_cost')->nullable();
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
        Schema::dropIfExists('route_detail_hotels');
    }
}
