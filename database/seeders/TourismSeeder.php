<?php

namespace Database\Seeders;

use App\Models\Tourism;
use Illuminate\Database\Seeder;

class TourismSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tourism::factory()
                ->count(30)
                ->create();
    }
}
