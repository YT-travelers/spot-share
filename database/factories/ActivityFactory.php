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
            'activity_start_time' => $this->faker->dateTime,
            'activity_end_time' => $this->faker->dateTime,
            'activity_summary' => $this->faker->sentence,
            'activity_address' => $this->faker->address,
            'activity_url' => $this->faker->url,
        ];
    }
}
