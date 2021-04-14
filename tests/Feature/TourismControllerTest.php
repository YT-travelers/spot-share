<?php

namespace Tests\Feature;

use App\Models\Tourism;
use Tests\TestCase;

class TourismControllerTest extends TestCase
{
    private const TOURISM_STRUCTURE = [
        'tourismId',
        'tourismName',
        'country',
        'tourismOpenTime',
        'tourismCloseTime',
        'tourismSummary',
        'tourismAddress',
        'tourismUrl'
    ];
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/tourisms');

        $response->assertJsonStructure([self::TOURISM_STRUCTURE]);
    }

    public function testStore()
    {
        $postData = Tourism::factory()->make()->toArray();
        $response = $this->post('tourisms', $postData);

        $response->assertJsonStructure(self::TOURISM_STRUCTURE);
    }

    public function testShow()
    {
        $tourismId = Tourism::first()->tourism_id;
        $response = $this->get("/tourisms/$tourismId");

        $response->assertJsonStructure(self::TOURISM_STRUCTURE);
    }

    public function testUpdate()
    {
        $updateData = Tourism::factory()->make()->toArray();
        $tourismId = Tourism::first()->tourism_id;
        $response = $this->put("/tourisms/$tourismId", $updateData);

        $response->assertJsonStructure(self::TOURISM_STRUCTURE);
    }

    public function testDestroy()
    {
        //NOTE: 外部キー制約があるので、このクラスのtestStoreで作成したレコードに対してテストを行う
        $tourismId = Tourism::latest()->first()->tourism_id;
        $response = $this->delete("tourisms/$tourismId");

        $response->assertJsonStructure(self::TOURISM_STRUCTURE);
    }
}
