<?php

namespace Database\Factories;

use App\Models\Hotel;
use App\Models\HotelImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class HotelImageFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = HotelImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'hotel_id' => Hotel::factory(),
            'hotel_image_key' => 'hotel/sample.png'
        ];
    }

    public function setHotelId(int $hotelId)
    {
        return $this->state(function () use ($hotelId) {
            return [
                'hotel_id' => $hotelId,
            ];
        });
    }
}
