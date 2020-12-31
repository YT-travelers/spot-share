<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            CountrySeeder::class,
            ActivitySeeder::class,
            TourismSeeder::class,
            CodeSeeder::class,
            RestaurantSeeder::class,
            HotelSeeder::class,
            RouteSeeder::class,
        ]);
    }
}
