<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_details', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id');
            $table->unsignedBigInteger('route_id');
            $table->primary(['route_id', 'route_detail_id']);
            $table->foreign('route_id')->references('route_id')->on('routes')->cascadeOnDelete();
            $table->integer('bean_kind_div');
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
        Schema::dropIfExists('route_details');
    }
}
