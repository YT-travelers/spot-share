<?php

namespace App\Http\Services;

use App\Infrastructure\StorageService;
use App\Models\Activity;
use App\Models\ActivityImage;
use JetBrains\PhpStorm\Pure;

class ActivityService
{
    #[Pure] public function __construct(private Activity $activity, private StorageService $storageService)
    {
    }

    public function saveActivity(array $activityData, array $activityImages, array $uploadFiles, ?int $activityId = null): array
    {
        $activity = $this->activity->findOrNew($activityId);
        $activity->fill($activityData)->save();

        //DBと突き合わせて不要な画像を削除
        $deletedActivityImageIdList = $activity->activityImages
        ->filter(function (ActivityImage $activityImage) use($activityImages) {
            //DBに存在するが新しいデータには存在しないレコードをフィルタ
            return collect($activityImages)
                ->contains('activity_image_id', $activityImage->activity_image_id);
        })->map(function (ActivityImage $activityImage) {
            if (!env('IS_MOCK_IMAGE')) {
                $this->storageService->delete($activityImage->activity_image_key);
            }
            return $activityImage->activity_image_id;
        });

        //削除された画像に対応するレコードを削除
        $activity
            ->activityImages()
            ->whereIn('activity_image_id', $deletedActivityImageIdList)
            ->delete();

        //画像をストレージへ保存
        $storedActivityImages = collect($uploadFiles)
            ->map(function (string $file) use ($activity, $activityImages) {
                if (env('IS_MOCK_IMAGE')) {
                    return ['activity_image_key' => 'activity/sample.png'];
                }

                $key = $this->storageService->storeWithUuid($file, 'activity/');
                return ['activity_image_key' => $key, 'activity_id' => $activity->activity_id];
            });

        //TODO: 複合主キー対応後に実装する
        //activity_image_idを採番
//        $storeData = collect(array_merge($storedActivityImages, $activityImages))
//            ->map(function ($activityImage, $index) {
//                $activityImage['activity_image_id'] = $index + 1;
//                return $activityImage;
//            });

        $activity->activityImages()->createMany(
            $storedActivityImages
        );

        return $activity->find($activity->activity_id)->toArray();
    }

    public function deleteImage(int $activityId)
    {
        if (env('IS_MOCK_IMAGE')) {
            return;
        }
        $activity = $this->activity->findOrFail($activityId);
        $activity->activityImages->each(function (ActivityImage $activityImage) {
            $this->storageService->delete($activityImage->activity_image_key);
        });
    }
}
