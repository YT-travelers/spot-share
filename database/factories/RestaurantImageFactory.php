<?php

namespace Database\Factories;

use App\Models\Restaurant;
use App\Models\RestaurantImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class RestaurantImageFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RestaurantImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'restaurant_id' => Restaurant::factory(),
            'restaurant_image_key' => '/restaurant/sample.png'
        ];
    }

    public function setRestaurantId(int $restaurantId)
    {
        return $this->state(function () use ($restaurantId) {
            return [
                'restaurant_id' => $restaurantId,
            ];
        });
    }
}
