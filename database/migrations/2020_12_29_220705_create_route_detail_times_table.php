<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRouteDetailTimesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('route_detail_times', function (Blueprint $table) {
            $table->unsignedBigInteger('route_detail_id');
            $table->unsignedBigInteger('route_id');
            $table->primary(['route_id', 'route_detail_id']);
            $table->foreign(['route_id', 'route_detail_id'])->references(['route_id', 'route_detail_id'])->on('route_details')->cascadeOnDelete();
            $table->dateTime('schedule_date_time');
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
        Schema::dropIfExists('route_detail_times');
    }
}
