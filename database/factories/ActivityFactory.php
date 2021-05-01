<?php

namespace Database\Factories;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActivityFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Activity::class;

    /**
     * Define the model's default state.
     * activitiesテーブルにデータが入ってることを前提にしてます
     *
     * @return array
     */
    public function definition()
    {
        return [
            'activity_name' => $this->faker->word,
            'activity_open_time_hours' => $this->faker->time('H'),
            'activity_open_time_minutes' => $this->faker->time('i'),
            'activity_close_time_hours' => $this->faker->time('H'),
            'activity_close_time_minutes' => $this->faker->time('i'),
            'activity_summary' => $this->faker->sentence,
            'activity_address' => $this->faker->address,
            'activity_url' => $this->faker->url,
        ];
    }
}
