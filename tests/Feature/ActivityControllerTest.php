<?php

namespace Tests\Feature;

use Tests\TestCase;

class ActivityControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/activities');

        $response->assertJsonStructure([[
            'activityId',
            'activityName',
            'activityStartTime',
            'activityEndTime',
            'activitySummary',
            'activityAddress',
            'activityUrl',
        ]]);
    }
}
