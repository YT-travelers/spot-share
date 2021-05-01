<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\ActivityImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActivityImageFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ActivityImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'activity_id' => Activity::factory(),
            'path' => '/activity/sample.png'
        ];
    }

    public function setActivityId(int $activityId)
    {
        return $this->state(function () use ($activityId) {
            return [
                'activity_id' => $activityId,
            ];
        });
    }
}
