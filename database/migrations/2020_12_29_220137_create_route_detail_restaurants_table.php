<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_restaurants', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id')->primary();
            $table->foreign('route_detail_id')->references('route_detail_id')->on('route_details');
            $table->integer('restaurant_meal_kind_div')->nullable();
            $table->integer('restaurant_rate')->nullable();
            $table->integer('restaurant_minutes')->nullable();
            $table->dateTime('restaurant_start_time')->nullable();
            $table->dateTime('restaurant_end_time')->nullable();
            $table->integer('restaurant_cost')->nullable();
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
        Schema::dropIfExists('route_detail_restaurants');
    }
}
