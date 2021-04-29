<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailTourism extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $fillable = [
        'route_id',
        'route_detail_id',
        'tourism_id',
        'tourism_rate',
        'tourism_minutes',
        'tourism_cost',
    ];

    public function tourism(): BelongsTo
    {
        return $this->belongsTo(Tourism::class, 'tourism_id', 'tourism_id');
    }
}
