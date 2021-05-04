<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTourismImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tourism_images', function (Blueprint $table) {
            $table->id('tourism_image_id');
            $table->unsignedBigInteger('tourism_id');
//            $table->unsignedBigInteger('tourism_id');
//            $table->unsignedBigInteger('tourism_image_id');
//            $table->primary(['tourism_id', 'tourism_image_id']);
            $table->foreign('tourism_id')->references('tourism_id')->on('tourisms')->cascadeOnDelete();
            $table->string('tourism_image_key');
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
        Schema::dropIfExists('tourism_images');
    }
}
