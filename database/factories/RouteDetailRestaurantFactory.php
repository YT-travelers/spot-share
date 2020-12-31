<?php

namespace Database\Factories;

use App\Models\Code\CheckDiv;
use App\Models\RouteDetailChecklist;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailChecklistFactory extends Factory
{
    use SetRouteDetailId;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetailChecklist::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $checkStatusList = CheckDiv::pluck('div_value');
        $checkStatusIndex = rand(0, $checkStatusList->count() - 1);
        return [
            'check_status' => $checkStatusList->get($checkStatusIndex),
            'check_content' => $this->faker->sentence
        ];
    }
}
