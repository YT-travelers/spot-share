<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\ActivityImage;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ActivityControllerTest extends TestCase
{
    private const ACTIVITY_STRUCTURE = [
        'activityId',
        'activityName',
        'activityOpenTimeHours',
        'activityOpenTimeMinutes',
        'activityCloseTimeHours',
        'activityCloseTimeMinutes',
        'activitySummary',
        'activityAddress',
        'activityUrl',
        'activityImages',
    ];

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->get('/activities');

        $response->assertJsonStructure([
            self::ACTIVITY_STRUCTURE
        ]);
    }

    public function testStore()
    {
        //既存のマスタデータを更新
        $postData = Activity
            ::factory()
            ->has(ActivityImage::factory())
            ->make()
            ->toArray();
        $postData['uploadFiles'] = [
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
        ];

        $response = $this->post('activities', $postData);
        $response->assertJsonStructure(self::ACTIVITY_STRUCTURE);
    }

    public function testShow()
    {
        $activityId = Activity::first()->activity_id;
        $response = $this->get("/activities/$activityId");

        $response->assertJsonStructure(self::ACTIVITY_STRUCTURE);
    }

    public function testUpdate()
    {
        $activityId = Activity::first()->activity_id;
        $updateData = Activity
            ::factory()
            ->has(ActivityImage::factory())
            ->make()
            ->toArray();
        $updateData['uploadFiles'] = [
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
            UploadedFile::fake()->image('dummy.jpg', 800, 800),
        ];
        $response = $this->put("/activities/$activityId", $updateData);

        $response->assertJsonStructure(self::ACTIVITY_STRUCTURE);
    }

    public function testDestroy()
    {
        //NOTE: 外部キー制約があるので、このクラスのtestStoreで作成したレコードに対してテストを行う
        $activityId = Activity::latest()->first()->activity_id;
        $response = $this->delete("activities/$activityId");

        $response->assertJsonStructure(self::ACTIVITY_STRUCTURE);
    }
}
