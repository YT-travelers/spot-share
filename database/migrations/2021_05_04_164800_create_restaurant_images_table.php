<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRestaurantImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurant_images', function (Blueprint $table) {
            $table->id('restaurant_image_id');
            $table->unsignedBigInteger('restaurant_id');
//            $table->unsignedBigInteger('restaurant_id');
//            $table->unsignedBigInteger('restaurant_image_id');
//            $table->primary(['restaurant_id', 'restaurant_image_id']);
            $table->foreign('restaurant_id')->references('restaurant_id')->on('restaurants')->cascadeOnDelete();
            $table->string('restaurant_image_key');
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
        Schema::dropIfExists('restaurant_images');
    }
}
