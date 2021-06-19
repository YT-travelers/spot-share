<?php

namespace App\Http\Services;

use App\Infrastructure\StorageService;
use App\Models\Restaurant;
use App\Models\RestaurantImage;
use JetBrains\PhpStorm\Pure;

class RestaurantService
{
    #[Pure] public function __construct(private Restaurant $restaurant, private StorageService $storageService)
    {
    }

    public function saveRestaurant(array $restaurantData, array $restaurantImages, array $uploadFiles, ?int $restaurantId = null): array
    {
        $restaurant = $this->restaurant->findOrNew($restaurantId);
        $restaurant->fill($restaurantData)->save();

        //DBと突き合わせて不要な画像を削除
        $deletedRestaurantImageIdList = $restaurant->restaurantImages
        ->filter(function (RestaurantImage $restaurantImage) use($restaurantImages) {
            //DBに存在するが新しいデータには存在しないレコードをフィルタ
            return !collect($restaurantImages)
                ->contains('restaurant_image_id', $restaurantImage->restaurant_image_id);
        })->map(function (RestaurantImage $restaurantImage) {
            if (!env('IS_MOCK_IMAGE')) {
                $this->storageService->delete($restaurantImage->restaurant_image_key);
            }
            return $restaurantImage->restaurant_image_id;
        });

        //削除された画像に対応するレコードを削除
        $restaurant
            ->restaurantImages()
            ->whereIn('restaurant_image_id', $deletedRestaurantImageIdList)
            ->delete();

        //画像をストレージへ保存
        $storedRestaurantImages = collect($uploadFiles)
            ->map(function (string $base64Data) use ($restaurant, $restaurantImages) {
                if (env('IS_MOCK_IMAGE')) {
                    return ['restaurant_image_key' => 'restaurant/sample.png'];
                }

                $key = $this->storageService->storeDataEncodedByBase64WithUUid($base64Data, 'restaurant/');
                return ['restaurant_image_key' => $key, 'restaurant_id' => $restaurant->restaurant_id];
            });

        //TODO: 複合主キー対応後に実装する
        //restaurant_image_idを採番
//        $storeData = collect(array_merge($storedRestaurantImages, $restaurantImages))
//            ->map(function ($restaurantImage, $index) {
//                $restaurantImage['restaurant_image_id'] = $index + 1;
//                return $restaurantImage;
//            });

        $restaurant->restaurantImages()->createMany(
            $storedRestaurantImages
        );

        return $restaurant->find($restaurant->restaurant_id)->toArray();
    }

    public function deleteImage(int $restaurantId)
    {
        if (env('IS_MOCK_IMAGE')) {
            return;
        }
        $restaurant = $this->restaurant->findOrFail($restaurantId);
        $restaurant->restaurantImages->each(function (RestaurantImage $restaurantImage) {
            $this->storageService->delete($restaurantImage->restaurant_image_key);
        });
    }
}
