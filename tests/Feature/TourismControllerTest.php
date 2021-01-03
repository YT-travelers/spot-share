<?php

namespace Tests\Feature;

use Tests\TestCase;

class TourismControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/tourisms');

        $response->assertJsonStructure([[
            'tourismId',
            'tourismName',
            'country',
            'tourismOpenTime',
            'tourismCloseTime',
            'tourismSummary',
            'tourismAddress',
            'tourismUrl'
        ]]);
    }
}
