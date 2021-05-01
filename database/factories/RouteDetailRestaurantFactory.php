<?php

namespace Database\Factories;

use App\Models\Code\MealKindDiv;
use App\Models\Restaurant;
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
        $restaurantIdList = Restaurant::pluck('restaurant_id');
        $restaurantIdIndex = rand(0, $restaurantIdList->count() - 1);

        return [
            'restaurant_id' => $restaurantIdList->get($restaurantIdIndex),
            'restaurant_meal_kind_div' => $mealKindDivList->get($mealKindDivIndex),
            'restaurant_rate' => rand(1, 5),
            'restaurant_minutes' => rand(0, 600),
            'restaurant_cost' => rand(0, 30000),
        ];
    }
}
