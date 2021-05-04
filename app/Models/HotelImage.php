<?php

namespace App\Models;

use App\Http\Services\ImageUrlGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HotelImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'hotel_image_id';

    protected $guarded = ['hotel_image_id'];

    //HACK: hotel_image_keyはバックエンド側でのみ使用される値
    protected $hidden = ['hotel_image_key'];

    protected $appends = ['hotel_image_url'];

    public function getHotelImageUrlAttribute(): string
    {
        $generator = app(ImageUrlGenerator::class);
        return $generator->generate($this->hotel_image_key);
    }
}
