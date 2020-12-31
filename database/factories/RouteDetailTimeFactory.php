<?php

namespace Database\Factories;

use App\Models\RouteDetailTime;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailTimeFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailTime::class;

    /**
     * Define the model's default state.
     * codesテーブルに初期データが入ってることを前提にしてます
     *
     * @return array
     */
    public function definition()
    {
        return [
            'schedule_date_time' => $this->faker->dateTime,
        ];
    }
}
