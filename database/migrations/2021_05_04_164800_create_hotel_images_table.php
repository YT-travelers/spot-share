<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHotelImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hotel_images', function (Blueprint $table) {
            $table->id('hotel_image_id');
            $table->unsignedBigInteger('hotel_id');
//            $table->unsignedBigInteger('hotel_id');
//            $table->unsignedBigInteger('hotel_image_id');
//            $table->primary(['hotel_id', 'hotel_image_id']);
            $table->foreign('hotel_id')->references('hotel_id')->on('hotels')->cascadeOnDelete();
            $table->string('hotel_image_key');
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
        Schema::dropIfExists('hotel_images');
    }
}
