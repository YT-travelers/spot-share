<?php

namespace App\Models;

use App\Http\Services\ImageUrlGenerator;
use App\Infrastructure\StorageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RestaurantImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'restaurant_image_id';

    protected $guarded = ['restaurant_image_id'];

    //HACK: restaurant_image_keyはバックエンド側でのみ使用される値
    protected $hidden = ['restaurant_image_key'];

    protected $appends = ['restaurant_image_url'];

    public function getRestaurantImageUrlAttribute(): string
    {
        /**
         * @var StorageService $storageService
         */
        $storageService = app(StorageService::class);
        return $storageService->createPreSignedUrl($this->restaurant_image_key);
    }
}
