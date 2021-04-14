<?php

namespace Tests\Feature;

use App\Models\Activity;
use Tests\TestCase;

class ActivityControllerTest extends TestCase
{
    private const ACTIVITY_STRUCTURE = [
        'activityId',
        'activityName',
        'activityOpenTime',
        'activityCloseTime',
        'activitySummary',
        'activityAddress',
        'activityUrl',
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

        $response = $this->post('activities', Activity::factory()->make()->toArray());

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
        $response = $this->put("/activities/$activityId", Activity::factory()->make()->toArray());

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
