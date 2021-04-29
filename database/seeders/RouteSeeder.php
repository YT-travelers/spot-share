<?php

namespace Database\Seeders;

use App\Models\Code\BeanKindDiv;
use App\Models\Route;
use App\Models\RouteDetail;
use Illuminate\Database\Seeder;

class RouteSeeder extends Seeder
{
    private const NUMBER_OF_ROUTES = 10;
    private const MIN_ROUTE_DETAILS = 1;
    private const MAX_ROUTE_DETAILS = 10;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * 複数のRouteとそれに紐づく複数のRouteDetailを作成する
         * RouteDetailの数とRouteDetailのBean区分についてはランダムで決定する
         */
        $beanKindDivList = BeanKindDiv::all();
        $minBeanKindIndex = 0;
        $maxBeanKindIndex = $beanKindDivList->count() - 1;
        for ($unused = 0; $unused < self::NUMBER_OF_ROUTES; $unused++) {
            $numberOfRouteDetails = rand(self::MIN_ROUTE_DETAILS, self::MAX_ROUTE_DETAILS);
            $routeFactory = Route::factory();
            for ($index = 0; $index < $numberOfRouteDetails; $index++) {
                $beanKindIndex = rand($minBeanKindIndex, $maxBeanKindIndex);
                $beanKindValue = $beanKindDivList->get($beanKindIndex)->div_value;
                $routeFactory = $routeFactory->has(
                    RouteDetail::factory()
                                ->setBeanKindDiv($beanKindValue)
                                ->setRouteDetailId($index + 1)
                );
            }
            $routeFactory->create();
        }
    }
}
