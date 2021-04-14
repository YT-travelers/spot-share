<?php

namespace Tests\Feature;

use App\Models\Code\HotelKindDiv;
use App\Models\Hotel;
use Tests\TestCase;

class HotelControllerTest extends TestCase
{
    private const HOTEL_STRUCTURE = [
        'hotelId',
        'hotelName',
        'hotelSummary',
        'hotelAddress',
        'hotelUrl',
        'hotelKindDiv',
        'hotelKindDivName',
    ];

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/hotels');

        $response->assertJsonStructure([self::HOTEL_STRUCTURE]);
    }

    public function testStore()
    {
        $postData = Hotel::factory()->make()->toArray();
        $response = $this->post('hotels', $postData);

        $response->assertJsonStructure(self::HOTEL_STRUCTURE);
    }

    public function testShow()
    {
        $hotelId = Hotel::first()->hotel_id;
        $response = $this->get("/hotels/$hotelId");

        $response->assertJsonStructure(self::HOTEL_STRUCTURE);
    }

    public function testUpdate()
    {
        $updateData = Hotel::factory()->make()->toArray();
        $hotelId = Hotel::first()->hotel_id;
        $response = $this->put("/hotels/$hotelId", $updateData);

        $response->assertJsonStructure(self::HOTEL_STRUCTURE);
    }

    public function testDestroy()
    {
        //NOTE: 外部キー制約があるので、このクラスのtestStoreで作成したレコードに対してテストを行う
        $hotelId = Hotel::latest()->first()->hotel_id;
        $response = $this->delete("hotels/$hotelId");

        $response->assertJsonStructure(self::HOTEL_STRUCTURE);
    }
}
