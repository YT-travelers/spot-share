<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailMemoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_memo', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id')->primary();
            $table->foreign('route_detail_id')->references('route_detail_id')->on('route_details');
            $table->string('memo_content');
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
        Schema::dropIfExists('route_detail_memo');
    }
}
