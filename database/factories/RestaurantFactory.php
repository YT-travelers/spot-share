<?php

namespace Database\Factories;

use App\Models\Code\CuisineGenreDiv;
use App\Models\Code\RestaurantKindDiv;
use App\Models\Country;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Restaurant::class;

    /**
     * codesテーブルとcountriesテーブルが存在することを前提にしています
     *
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $countryCodeList = Country::pluck('country_code');
        $countryCodeIndex = rand(0, $countryCodeList->count() - 1);
        $cuisineGenreDivList = CuisineGenreDiv::pluck('div_value');
        $cuisineGenreDivIndex = rand(0, $cuisineGenreDivList->count() - 1);
        $restaurantKindDivList = RestaurantKindDiv::pluck('div_value');
        $restaurantKindDivIndex = rand(0, $restaurantKindDivList->count() - 1);

        return [
            'restaurant_name' => $this->faker->sentence,
            'country_code' => $countryCodeList->get($countryCodeIndex),
            'cuisine_genre_div' => $cuisineGenreDivList->get($cuisineGenreDivIndex),
            'restaurant_kind_div' => $restaurantKindDivList->get($restaurantKindDivIndex),
            'restaurant_open_time' => $this->faker->dateTime,
            'restaurant_close_time' => $this->faker->dateTime,
            'restaurant_summary' => $this->faker->sentence,
            'restaurant_address' => $this->faker->address,
            'restaurant_url' => $this->faker->url,
        ];
    }
}
