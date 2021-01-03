<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;
use PHPUnit\Framework\Constraint\Count;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Country::insert([
            [ 'country_code' => 'JP', 'country_name' => '日本',    'currency' => '円',   'timezone' => '+09:00' ],
            [ 'country_code' => 'US', 'country_name' => 'アメリカ', 'currency' => 'ドル', 'timezone' => '-05:00' ],
        ]);
    }
}
