<?php

namespace Database\Factories;

use App\Models\Tourism;
use App\Models\TourismImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class TourismImageFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TourismImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'tourism_id' => Tourism::factory(),
            'tourism_image_key' => 'tourism/sample.png'
        ];
    }

    public function setTourismId(int $tourismId)
    {
        return $this->state(function () use ($tourismId) {
            return [
                'tourism_id' => $tourismId,
            ];
        });
    }
}
