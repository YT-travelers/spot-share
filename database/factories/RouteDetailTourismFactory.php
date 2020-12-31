<?php

namespace Database\Factories;

use App\Models\RouteDetailTourism;
use App\Models\Tourism;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailTourismFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailTourism::class;

    /**
     * tourismsテーブルに初期データが入ってることを前提にしてます
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $idList = Tourism::pluck('tourism_id');
        $idIndex = rand(0, $idList->count() - 1);
        return [
            'tourism_id' => $idList->get($idIndex),
            'tourism_rate' => rand(1, 5),
            'tourism_minutes' => rand(0, 900),
            'tourism_cost' => rand(0, 100000),
        ];
    }
}
