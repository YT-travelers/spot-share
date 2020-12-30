<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailCheckListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_check_lists', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id')->primary();
            $table->foreign('route_detail_id')->references('route_detail_id')->on('route_details');
            $table->integer('check_status');
            $table->string('check_content');
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
        Schema::dropIfExists('route_detail_check_lists');
    }
}
