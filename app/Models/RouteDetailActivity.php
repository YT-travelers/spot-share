<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailActivity extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $guarded = [];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class, 'activity_id', 'activity_id');
    }
}
