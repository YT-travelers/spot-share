<?php

namespace Tests\Feature;

use Tests\TestCase;

class CountryControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/countries');

        $response->assertJsonStructure([['countryCode', 'countryName', 'currency', 'timezone']]);
    }
}
