<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Tourism;
use Database\Factories\RouteDetailActivityFactory;
use Database\Factories\RouteDetailChecklistFactory;
use Database\Factories\RouteDetailHotelFactory;
use Database\Factories\RouteDetailMealFactory;
use Database\Factories\RouteDetailMemoFactory;
use Database\Factories\RouteDetailMoveFactory;
use Database\Factories\RouteDetailRestaurantFactory;
use Database\Factories\RouteDetailTimeFactory;
use Database\Factories\RouteDetailTourismFactory;
use Tests\TestCase;

class RouteControllerTest extends TestCase
{
    /**
     * TODO: beanKindDivに応じてテストケースを修正
     */
    const ROUTE_STRUCTURE = [
        'routeId',
        'routeName',
        'routeDetails' => [
            '*' => [
                'routeDetailId',
                'routeId',
                'beanKindDiv',
                'beanKindDivName',
                'order',
                'routeDetailTourism',
                'routeDetailRestaurant',
                'routeDetailHotel',
                'routeDetailActivity',
                'routeDetailMeal',
                'routeDetailMove',
                'routeDetailTime',
                'routeDetailChecklist',
                'routeDetailMemo',
            ]
        ]
    ];

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/routes');

        $response->assertJsonStructure([['routeId', 'routeName']]);
    }

    public function testShow()
    {
        $response = $this->get('/routes/1');

        $response->assertJsonStructure(self::ROUTE_STRUCTURE);
    }

    public function testStore()
    {
        $response = $this->post('routes', [
            'routeName' => 'sample_name',
            'routeDetails' => [
                [
                    'beanKindDiv' => 0,
                    'order' => 0,
                    'routeDetailTourism' => RouteDetailTourismFactory::new()->definition() + [
                        'tourism' => Tourism::factory()->definition()
                    ]
                ],
                [
                    'beanKindDiv' => 1,
                    'order' => 1,
                    'routeDetailRestaurant' => RouteDetailRestaurantFactory::new()->definition() + [
                        'restaurant' => Restaurant::factory()->definition()
                    ]
                ],
                [
                    'beanKindDiv' => 2,
                    'order' => 2,
                    'routeDetailHotel' => RouteDetailHotelFactory::new()->definition() + [
                        'hotel' => Hotel::factory()->definition()
                    ]
                ],
                [
                    'beanKindDiv' => 3,
                    'order' => 3,
                    'routeDetailActivity' => RouteDetailActivityFactory::new()->definition() + [
                        'activity' => Activity::factory()->definition()
                    ]
                ],
                [
                    'beanKindDiv' => 4,
                    'order' => 4,
                    'routeDetailMeal' => RouteDetailMealFactory::new()->definition()
                ],
                [
                    'beanKindDiv' => 5,
                    'order' => 5,
                    'routeDetailMove' => RouteDetailMoveFactory::new()->definition()
                ],
                [
                    'beanKindDiv' => 6,
                    'order' => 6,
                    'routeDetailTime' => RouteDetailTimeFactory::new()->definition()
                ],
                [
                    'beanKindDiv' => 7,
                    'order' => 7,
                    'routeDetailChecklist' => RouteDetailChecklistFactory::new()->definition()
                ],
                [
                    'beanKindDiv' => 8,
                    'order' => 8,
                    'routeDetailMemo' => RouteDetailMemoFactory::new()->definition()
                ],
            ]
        ]);

        $response->assertJsonStructure(self::ROUTE_STRUCTURE);
    }
}
