<?php

namespace App\Models;

use App\Http\Services\ImageUrlGenerator;
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
        $generator = app(ImageUrlGenerator::class);
        return $generator->generate($this->activity_image_key);
    }
}
