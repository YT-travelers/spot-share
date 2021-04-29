<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Country;
use App\Models\Hotel;
use App\Models\Restaurant;
use App\Models\Route;
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
        $routeId = Route::first()->route_id;
        $response = $this->get("/routes/$routeId");

        $response->assertJsonStructure(self::ROUTE_STRUCTURE);
    }

    public function testStore()
    {
        //既存のマスタデータを更新
        $response = $this->post('routes', [
            'routeName' => 'create route',
            'routeDetails' => $this->createTestRouteDetails()
        ]);

        $response->assertJsonStructure(self::ROUTE_STRUCTURE);
    }

    public function testUpdate()
    {
        $routeId = Route::first()->route_id;
        $response = $this->put("routes/$routeId", [
            'routeName' => 'update route',
            'routeDetails' => $this->createTestRouteDetails()
        ]);

        $response->assertJsonStructure(self::ROUTE_STRUCTURE);
    }

    public function testDestroy()
    {
        $routeId = Route::first()->route_id;
        $response = $this->delete("routes/$routeId");

        $response->assertJson(['result' => 'success']);
    }

    private function createTestRouteDetails(): array
    {
        return [
            [
                'beanKindDiv' => 0,
                'routeDetailTourism' => RouteDetailTourismFactory::new()->definition() + [
                        'tourismId' => Tourism::first()->tourism_id,
                    ]
            ],
            [
                'beanKindDiv' => 1,
                'routeDetailRestaurant' => RouteDetailRestaurantFactory::new()->definition() + [
                        'restaurantId' => Restaurant::first()->restaurant_id
                    ]
            ],
            [
                'beanKindDiv' => 2,
                'routeDetailHotel' => RouteDetailHotelFactory::new()->definition() + [
                        'hotelId' => Hotel::first()->hotel_id
                    ]
            ],
            [
                'beanKindDiv' => 3,
                'routeDetailActivity' => RouteDetailActivityFactory::new()->definition() + [
                        'activityId' => Activity::first()->activity_id
                    ]
            ],
            [
                'beanKindDiv' => 4,
                'routeDetailMeal' => RouteDetailMealFactory::new()->definition()
            ],
            [
                'beanKindDiv' => 5,
                'routeDetailMove' => RouteDetailMoveFactory::new()->definition()
            ],
            [
                'beanKindDiv' => 6,
                'routeDetailTime' => RouteDetailTimeFactory::new()->definition()
            ],
            [
                'beanKindDiv' => 7,
                'routeDetailChecklist' => RouteDetailChecklistFactory::new()->definition()
            ],
            [
                'beanKindDiv' => 8,
                'routeDetailMemo' => RouteDetailMemoFactory::new()->definition()
            ],
        ];
    }
}
