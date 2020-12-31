<?php

namespace Database\Factories;

use App\Models\Code\HotelKindDiv;
use App\Models\Hotel;
use Illuminate\Database\Eloquent\Factories\Factory;

class HotelFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Hotel::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $hotelKindDivList = HotelKindDiv::pluck('div_value');
        $hotelKindDivIndex = rand(0, $hotelKindDivList->count() - 1);
        return [
            'hotel_name' => $this->faker->word,
            'hotel_kind_div' => $hotelKindDivList->get($hotelKindDivIndex),
            'hotel_summary' => $this->faker->sentence,
            'hotel_address' => $this->faker->address,
            'hotel_url' => $this->faker->url,
        ];
    }
}
