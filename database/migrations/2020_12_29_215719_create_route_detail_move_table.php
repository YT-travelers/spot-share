<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailMoveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_move', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id')->primary();
            $table->foreign('route_detail_id')->references('route_detail_id')->on('route_details');
            $table->string('move_kind_div_key')->nullable();
            $table->foreign('move_kind_div_key')->references('div_key')->on('codes');
            $table->integer('move_minutes')->nullable();
            $table->integer('move_cost')->nullable();
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
        Schema::dropIfExists('route_detail_move');
    }
}
