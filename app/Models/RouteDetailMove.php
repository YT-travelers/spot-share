<?php

namespace App\Models;

use App\Models\Code\MoveWayDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailMove extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $fillable = [
        'route_id',
        'route_detail_id',
        'move_way_div',
        'move_minutes',
        'move_cost',
    ];

    public function moveWay(): BelongsTo
    {
        return $this->belongsTo(MoveWayDiv::class, 'move_way_div', 'div_value');
    }
}
