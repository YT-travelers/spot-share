<?php

namespace App\Models;

use App\Http\Services\ImageUrlGenerator;
use App\Infrastructure\StorageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ActivityImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_image_id';

    protected $guarded = ['activity_image_id'];

    //HACK: activity_image_keyはバックエンド側でのみ使用される値
    protected $hidden = ['activity_image_key'];

    protected $appends = ['activity_image_url'];

    public function getActivityImageUrlAttribute(): string
    {
        /**
         * @var StorageService $storageService
         */
        $storageService = app(StorageService::class);
        return $storageService->createPreSignedUrl($this->activity_image_key);
    }
}
