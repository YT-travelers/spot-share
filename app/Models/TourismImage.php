<?php

namespace App\Models;

use App\Http\Services\ImageUrlGenerator;
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
        $generator = app(ImageUrlGenerator::class);
        return $generator->generate($this->tourism_image_key);
    }
}
