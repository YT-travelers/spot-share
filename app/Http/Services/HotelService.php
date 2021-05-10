<?php

namespace App\Http\Services;

use App\Infrastructure\StorageService;
use App\Models\Hotel;
use App\Models\HotelImage;
use JetBrains\PhpStorm\Pure;

class HotelService
{
    #[Pure] public function __construct(private Hotel $hotel, private StorageService $storageService)
    {
    }

    public function saveHotel(array $hotelData, array $hotelImages, array $uploadFiles, ?int $hotelId = null): array
    {
        $hotel = $this->hotel->findOrNew($hotelId);
        $hotel->fill($hotelData)->save();

        //DBと突き合わせて不要な画像を削除
        $deletedHotelImageIdList = $hotel->hotelImages
        ->filter(function (HotelImage $hotelImage) use($hotelImages) {
            //DBに存在するが新しいデータには存在しないレコードをフィルタ
            return !collect($hotelImages)
                ->contains('hotel_image_id', $hotelImage->hotel_image_id);
        })->map(function (HotelImage $hotelImage) {
            if (!env('IS_MOCK_IMAGE')) {
                $this->storageService->delete($hotelImage->hotel_image_key);
            }
            return $hotelImage->hotel_image_id;
        });

        //削除された画像に対応するレコードを削除
        $hotel
            ->hotelImages()
            ->whereIn('hotel_image_id', $deletedHotelImageIdList)
            ->delete();

        //画像をストレージへ保存
        $storedHotelImages = collect($uploadFiles)
            ->map(function (\Illuminate\Http\UploadedFile $file) use ($hotel, $hotelImages) {
                if (env('IS_MOCK_IMAGE')) {
                    return ['hotel_image_key' => 'hotel/sample.png'];
                }

                $key = $this->storageService->storeWithUuid($file, 'hotel/');
                return ['hotel_image_key' => $key, 'hotel_id' => $hotel->hotel_id];
            });

        //TODO: 複合主キー対応後に実装する
        //hotel_image_idを採番
//        $storeData = collect(array_merge($storedHotelImages, $hotelImages))
//            ->map(function ($hotelImage, $index) {
//                $hotelImage['hotel_image_id'] = $index + 1;
//                return $hotelImage;
//            });

        $hotel->hotelImages()->createMany(
            $storedHotelImages
        );

        return $hotel->find($hotel->hotel_id)->toArray();
    }
}
