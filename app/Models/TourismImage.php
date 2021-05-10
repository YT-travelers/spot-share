<?php

namespace App\Models;

use App\Infrastructure\StorageService;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TourismImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'tourism_image_id';

    protected $guarded = ['tourism_image_id'];

    //HACK: tourism_image_keyはバックエンド側でのみ使用される値
    protected $hidden = ['tourism_image_key'];

    protected $appends = ['tourism_image_url'];

    public function getTourismImageUrlAttribute(): string
    {
        /**
         * @var StorageService $storageService
         */
        $storageService = app(StorageService::class);
        return $storageService->createPreSignedUrl($this->tourism_image_key);
    }
}
