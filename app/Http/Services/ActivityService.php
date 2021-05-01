<?php

namespace App\Http\Services;

use App\Models\Activity;
use App\Models\ActivityImage;
use JetBrains\PhpStorm\Pure;

class ActivityService
{
    #[Pure] public function __construct(private Activity $activity)
    {
    }

    public function saveActivity(array $activityData, array $activityImages, array $uploadFiles, ?int $activityId = null): array
    {
        $activity = $this->activity->findOrNew($activityId);
        $activity->fill($activityData)->save();
        $activity->activityImages
            ->filter(function (ActivityImage $activityImage) use($activityImages) {
                return !collect($activityImages)
                    ->contains('activity_image_id', $activityImage->activity_image_id);
            })->each(function (ActivityImage $activityImage) {
                $activityImage->delete();
                if (!env('IS_MOCK_IMAGE')) {
                    //TODO: S3から画像を削除
                }
            });

        $activityImagePathList = collect($uploadFiles)
            ->map(function (\Illuminate\Http\UploadedFile $file) {
                if (env('IS_MOCK_IMAGE')) {
                    return ['path' => '/activity/sample.png'];
                }

                //TODO: $fileをS3に保存してキーを返す
                $key = 'error.png';
                return ['path' => $key];
            });
        $activity->activityImages()->createMany($activityImagePathList->toArray());

        return $activity->find($activity->activity_id)->toArray();
    }
}
