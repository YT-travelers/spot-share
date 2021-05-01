<?php

namespace App\Models;

use App\Http\Services\ImageUrlGenerator;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ActivityImage extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_image_id';

    protected $guarded = ['activity_image_id'];

    //HACK: pathはバックエンド側でのみ使用される値
    protected $hidden = ['path'];

    protected $appends = ['url'];

    public function getUrlAttribute(): string
    {
        $generator = app(ImageUrlGenerator::class);
        return $generator->generate($this->path);
    }
}
