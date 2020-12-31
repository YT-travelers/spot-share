<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\Code\CheckDiv;
use App\Models\RouteDetailActivity;
use App\Models\RouteDetailChecklist;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailActivityFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailActivity::class;

    /**
     * Define the model's default state.
     * activitiesテーブルにデータが入ってることを前提にしてます
     *
     * @return array
     */
    public function definition()
    {
        $idList = Activity::pluck('activity_id');
        $idIndex = rand(0, $idList->count() - 1);
        return [
            'activity_id' => $idList->get($idIndex),
            'activity_rate' => rand(1, 5),
            'activity_minutes' => rand(5, 180),
            'activity_start_time' => $this->faker->dateTime,
            'activity_end_time' => $this->faker->dateTime,
            'activity_cost' => rand(0, 500000),
        ];
    }
}
