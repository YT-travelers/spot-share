<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id('restaurant_id');
            $table->string('restaurant_name');
            $table->integer('cuisine_genre_div')->nullable();
            $table->integer('restaurant_kind_div')->nullable();
            $table->dateTime('restaurant_open_time')->nullable();
            $table->dateTime('restaurant_close_time')->nullable();
            $table->string('restaurant_summary')->default('');
            $table->string('restaurant_address')->default('');
            $table->string('restaurant_url')->default('');
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
        Schema::dropIfExists('restaurants');
    }
}
