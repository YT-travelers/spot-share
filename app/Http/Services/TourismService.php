<?php

namespace App\Http\Services;

use App\Models\Tourism;
use App\Models\TourismImage;
use JetBrains\PhpStorm\Pure;

class TourismService
{
    #[Pure] public function __construct(private Tourism $tourism)
    {
    }

    public function saveTourism(array $tourismData, array $tourismImages, array $uploadFiles, ?int $tourismId = null): array
    {
        $tourism = $this->tourism->findOrNew($tourismId);
        $tourism->fill($tourismData)->save();

        //DBと突き合わせて不要な画像を削除
        $deletedTourismImageIdList = $tourism->tourismImages
        ->filter(function (TourismImage $tourismImage) use($tourismImages) {
            //DBに存在するが新しいデータには存在しないレコードをフィルタ
            return !collect($tourismImages)
                ->contains('tourism_image_id', $tourismImage->tourism_image_id);
        })->map(function (TourismImage $tourismImage) {
            if (!env('IS_MOCK_IMAGE')) {
                //TODO: S3から画像を削除
            }
            return $tourismImage->tourism_image_id;
        });

        //削除された画像に対応するレコードを削除
        $tourism
            ->tourismImages()
            ->whereIn('tourism_image_id', $deletedTourismImageIdList)
            ->delete();

        //画像をストレージへ保存
        $storedTourismImages = collect($uploadFiles)
            ->map(function (\Illuminate\Http\UploadedFile $file) use ($tourism, $tourismImages) {
                if (env('IS_MOCK_IMAGE')) {
                    return ['tourism_image_key' => '/tourism/sample.png'];
                }

                //TODO: $fileをS3に保存してキーを返す
                $key = 'error.png';
                return ['tourism_image_key' => $key, 'tourism_id' => $tourism->tourism_id];
            });

        //TODO: 複合主キー対応後に実装する
        //tourism_image_idを採番
//        $storeData = collect(array_merge($storedTourismImages, $tourismImages))
//            ->map(function ($tourismImage, $index) {
//                $tourismImage['tourism_image_id'] = $index + 1;
//                return $tourismImage;
//            });

        $tourism->tourismImages()->createMany(
            $storedTourismImages
        );

        return $tourism->find($tourism->tourism_id)->toArray();
    }
}
