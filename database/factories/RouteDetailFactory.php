<?php

namespace Database\Factories;

use App\Models\Route;
use App\Models\RouteDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class RouteDetailFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = RouteDetail::class;

    /**
     * @return RouteDetailFactory
     */
    public function configure(): RouteDetailFactory
    {
        return $this->afterCreating(function (RouteDetail $routeDetail) {
            $relevantModel = $routeDetail->newRelevantModel();
            $className = get_class($relevantModel);
            /** @var Factory $factory */
            $factory = $className::factory();
            $factory->setRouteDetailId($routeDetail->route_detail_id)->create();
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'route_id' => Route::factory(),
            'bean_kind_div' => 0,
        ];
    }

    public function setBeanKindDiv(int $beanKindDiv): RouteDetailFactory
    {
        return $this->state(function () use ($beanKindDiv) {
            return [
                'bean_kind_div' => $beanKindDiv,
            ];
        });
    }
}
