<?php

namespace Database\Factories;

use App\Models\Code\MoveWayDiv;
use App\Models\RouteDetailMove;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailMoveFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailMove::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $moveWayDivList = MoveWayDiv::pluck('div_value');
        $moveWayDivIndex = rand(0, $moveWayDivList->count() - 1);

        return [
            'move_kind_div' => $moveWayDivList->get($moveWayDivIndex),
            'move_minutes' => rand(0, 600),
            'move_cost' => rand(0, 200000),
        ];
    }
}
