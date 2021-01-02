<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailTourism extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    public function tourism(): BelongsTo
    {
        return $this->belongsTo(Tourism::class, 'tourism_id', 'tourism_id');
    }
}
