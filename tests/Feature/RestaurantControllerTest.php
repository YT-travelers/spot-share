<?php

namespace Tests\Feature;

use Tests\TestCase;

class RestaurantControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/restaurants');

        $response->assertJsonStructure([[
            'restaurantId',
            'restaurantName',
            'restaurantOpenTime',
            'restaurantCloseTime',
            'restaurantSummary',
            'restaurantAddress',
            'restaurantUrl',
            'country' => [
                'countryCode',
                'countryName',
                'currency',
                'timezone',
            ],
            'cuisineGenre' => [
                'divKeyName',
                'divValue'
            ],
            'restaurantKind' => [
                'divKeyName',
                'divValue'
            ],
        ]]);
    }
}
