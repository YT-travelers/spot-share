<?php

namespace Tests\Feature;

use Tests\TestCase;

class HotelControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/hotels');

        $response->assertJsonStructure([[
            'hotelId',
            'hotelName',
            'hotelSummary',
            'hotelAddress',
            'hotelUrl',
            'hotelKind' => [
                'divKeyName',
                'divValue'
            ],
        ]]);
    }
}
