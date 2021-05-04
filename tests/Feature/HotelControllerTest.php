<?php

namespace Tests\Feature;

use App\Models\Hotel;
use App\Models\HotelImage;
use Illuminate\Http\UploadedFile;
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
        'hotelUrl',
        'hotelImages',
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
        $postData = Hotel
            ::factory()
            ->has(HotelImage::factory())
            ->make()
            ->toArray();
        $postData['uploadFiles'] = [
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
        ];

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
        $updateData = Hotel
            ::factory()
            ->has(HotelImage::factory())
            ->make()
            ->toArray();
        $updateData['uploadFiles'] = [
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
        ];
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
