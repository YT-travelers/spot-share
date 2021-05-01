<?php

namespace Database\Factories;

use App\Models\Country;
use App\Models\Tourism;
use Illuminate\Database\Eloquent\Factories\Factory;

class TourismFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Tourism::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $countryCodeList = Country::pluck('country_code');
        $countryCodeIndex = rand(0, $countryCodeList->count() - 1);

        return [
            'tourism_name' => $this->faker->sentence,
            'country_code' => $countryCodeList->get($countryCodeIndex),
            'tourism_open_time_hours' => $this->faker->time('H'),
            'tourism_open_time_minutes' => $this->faker->time('i'),
            'tourism_close_time_hours' => $this->faker->time('H'),
            'tourism_close_time_minutes' => $this->faker->time('i'),
            'tourism_summary' => $this->faker->sentence,
            'tourism_address' => $this->faker->address,
            'tourism_url' => $this->faker->url,
        ];
    }
}
