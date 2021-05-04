<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activity_images', function (Blueprint $table) {
            $table->id('activity_image_id');
            $table->unsignedBigInteger('activity_id');
//            $table->unsignedBigInteger('activity_id');
//            $table->unsignedBigInteger('activity_image_id');
//            $table->primary(['activity_id', 'activity_image_id']);
            $table->foreign('activity_id')->references('activity_id')->on('activities')->cascadeOnDelete();
            $table->string('activity_image_key');
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
        Schema::dropIfExists('activity_images');
    }
}
