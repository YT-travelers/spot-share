<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Activity extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_id';

    protected $guarded = ['activity_id'];

    protected $with = ['activityImages'];

    public function activityImages(): HasMany
    {
        return $this->hasMany(ActivityImage::class, 'activity_id', 'activity_id');
    }
}
