<?php

namespace Tests\Feature;

use Tests\TestCase;

class CodeControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/codes');

        $response->assertJsonStructure([['division', 'divKey', 'divName', 'divKeyName', 'divValue']]);
    }
}
