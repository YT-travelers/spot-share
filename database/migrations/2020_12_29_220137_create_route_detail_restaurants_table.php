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
            $table->unsignedBigInteger('route_detail_id');
            $table->unsignedBigInteger('route_id');
            $table->primary(['route_id', 'route_detail_id']);
            $table->foreign(['route_id', 'route_detail_id'])->references(['route_id', 'route_detail_id'])->on('route_details')->cascadeOnDelete();
            $table->unsignedBigInteger('restaurant_id');
            $table->foreign('restaurant_id')->references('restaurant_id')->on('restaurants');
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
