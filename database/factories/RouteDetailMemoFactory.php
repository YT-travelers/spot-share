<?php

namespace Database\Factories;

use App\Models\RouteDetailMemo;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailMemoFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailMemo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'memo_content' => $this->faker->sentence
        ];
    }
}
