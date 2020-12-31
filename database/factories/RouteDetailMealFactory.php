<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Code\MealKindDiv;
use App\Models\Code\YesNoDiv;
use App\Models\Hotel;
use App\Models\RouteDetailHotel;
use App\Models\RouteDetailMeal;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailMealFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailMeal::class;

    /**
     * Define the model's default state.
     * codesテーブルに初期データが入ってることを前提にしてます
     *
     * @return array
     */
    public function definition()
    {
        $mealKindDivList = MealKindDiv::pluck('div_value');
        $mealKindDivIndex = rand(0, $mealKindDivList->count() - 1);
        return [
            'meal_kind_div' => $mealKindDivList->get($mealKindDivIndex),
            'meal_minutes' => rand(0, 180),
            'meal_cost' => rand(0, 10000),
        ];
    }
}
