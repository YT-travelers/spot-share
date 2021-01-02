<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailTourismsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_tourisms', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id')->primary();
            $table->foreign('route_detail_id')->references('route_detail_id')->on('route_details')->cascadeOnDelete();
            $table->unsignedBigInteger('tourism_id');
            $table->foreign('tourism_id')->references('tourism_id')->on('tourisms');
            $table->integer('tourism_rate')->nullable();
            $table->integer('tourism_minutes')->nullable();
            $table->integer('tourism_cost')->nullable();
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
        Schema::dropIfExists('route_detail_tourisms');
    }
}
