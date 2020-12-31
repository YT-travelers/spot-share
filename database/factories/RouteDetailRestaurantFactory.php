<?php

namespace Database\Factories;

use App\Models\Code\MealKindDiv;
use App\Models\RouteDetailRestaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailRestaurantFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailRestaurant::class;

    /**
     * codesテーブルが存在することを前提にしています
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $mealKindDivList = MealKindDiv::pluck('div_value');
        $mealKindDivIndex = rand(0, $mealKindDivList->count() - 1);
        return [
            'restaurant_meal_kind_div' => $mealKindDivList->get($mealKindDivIndex),
            'restaurant_rate' => rand(1, 5),
            'restaurant_minutes' => rand(0, 600),
            'restaurant_start_time' => $this->faker->dateTime,
            'restaurant_end_time' => $this->faker->dateTime,
            'restaurant_cost' => rand(0, 30000),
        ];
    }
}
