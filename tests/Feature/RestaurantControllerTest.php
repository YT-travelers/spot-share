<?php

namespace Tests\Feature;

use App\Models\Restaurant;
use App\Models\RestaurantImage;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class RestaurantControllerTest extends TestCase
{
    private const RESTAURANT_STRUCTURE = [
        'restaurantId',
        'restaurantName',
        'restaurantOpenTimeHours',
        'restaurantOpenTimeMinutes',
        'restaurantCloseTimeHours',
        'restaurantCloseTimeMinutes',
        'restaurantSummary',
        'restaurantAddress',
        'restaurantUrl',
        'cuisineGenreDiv',
        'cuisineGenreDivName',
        'restaurantKindDiv',
        'restaurantKindDivName',
        'restaurantUrl',
        'restaurantImages',
    ];
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/restaurants');

        $response->assertJsonStructure([self::RESTAURANT_STRUCTURE]);
    }

    public function testStore()
    {
        $postData = Restaurant
            ::factory()
            ->has(RestaurantImage::factory())
            ->make()
            ->toArray();
        $postData['uploadFiles'] = [
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
        ];

        $response = $this->post('restaurants', $postData);
        $response->assertJsonStructure(self::RESTAURANT_STRUCTURE);
    }

    public function testShow()
    {
        $restaurantId = Restaurant::first()->restaurant_id;
        $response = $this->get("/restaurants/$restaurantId");

        $response->assertJsonStructure(self::RESTAURANT_STRUCTURE);
    }

    public function testUpdate()
    {
        $updateData = Restaurant
            ::factory()
            ->has(RestaurantImage::factory())
            ->make()
            ->toArray();
        $updateData['uploadFiles'] = [
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
        ];
        $restaurantId = Restaurant::first()->restaurant_id;
        $response = $this->put("/restaurants/$restaurantId", $updateData);

        $response->assertJsonStructure(self::RESTAURANT_STRUCTURE);
    }

    public function testDestroy()
    {
        //NOTE: 外部キー制約があるので、このクラスのtestStoreで作成したレコードに対してテストを行う
        $restaurantId = Restaurant::latest()->first()->restaurant_id;
        $response = $this->delete("restaurants/$restaurantId");

        $response->assertJsonStructure(self::RESTAURANT_STRUCTURE);
    }
}
