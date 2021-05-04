<?php

namespace Database\Factories;

use App\Models\Code\CuisineGenreDiv;
use App\Models\Code\RestaurantKindDiv;
use App\Models\Restaurant;
use App\Models\RestaurantImage;
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
     * @return RestaurantFactory
     */
    public function configure(): RestaurantFactory
    {
        return $this->afterCreating(function (Restaurant $restaurant) {
            $factory = RestaurantImage::factory()->count(3);
            $factory->setRestaurantId($restaurant->restaurant_id)->create();
        });
    }

    /**
     * codesテーブルとcountriesテーブルが存在することを前提にしています
     *
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $cuisineGenreDivList = CuisineGenreDiv::pluck('div_value');
        $cuisineGenreDivIndex = rand(0, $cuisineGenreDivList->count() - 1);
        $restaurantKindDivList = RestaurantKindDiv::pluck('div_value');
        $restaurantKindDivIndex = rand(0, $restaurantKindDivList->count() - 1);

        return [
            'restaurant_name' => $this->faker->sentence,
            'cuisine_genre_div' => $cuisineGenreDivList->get($cuisineGenreDivIndex),
            'restaurant_kind_div' => $restaurantKindDivList->get($restaurantKindDivIndex),
            'restaurant_open_time_hours' => $this->faker->time('H'),
            'restaurant_open_time_minutes' => $this->faker->time('i'),
            'restaurant_close_time_hours' => $this->faker->time('H'),
            'restaurant_close_time_minutes' => $this->faker->time('i'),
            'restaurant_summary' => $this->faker->sentence,
            'restaurant_address' => $this->faker->address,
            'restaurant_url' => $this->faker->url,
        ];
    }
}
