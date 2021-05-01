<?php

namespace Database\Factories;

use App\Models\Code\YesNoDiv;
use App\Models\Hotel;
use App\Models\RouteDetailHotel;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailHotelFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailHotel::class;

    /**
     * Define the model's default state.
     * codesテーブルに初期データが入ってることを前提にしてます
     *
     * @return array
     */
    public function definition()
    {
        $idList = Hotel::pluck('hotel_id');
        $idIndex = rand(0, $idList->count() - 1);
        $yesNoList = YesNoDiv::pluck('div_value');
        $yesNoIndex = rand(0, $yesNoList->count() - 1);
        return [
            'hotel_id' => $idList->get($idIndex),
            'hotel_breakfast_yes_no_div' => $yesNoList->get($yesNoIndex),
            'hotel_dinner_yes_no_div' => $yesNoList->get($yesNoIndex),
            'hotel_rate' => rand(1, 5),
            'hotel_minutes' => rand(0, 600),
            'hotel_check_in_time_hours' => $this->faker->time('H'),
            'hotel_check_in_time_minutes' => $this->faker->time('i'),
            'hotel_check_out_time_hours' => $this->faker->time('H'),
            'hotel_check_out_time_minutes' => $this->faker->time('i'),
            'hotel_cost' => rand(0, 500000),
        ];
    }
}
