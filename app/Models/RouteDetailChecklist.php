<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteDetailChecklist extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $fillable = [
        'route_id',
        'route_detail_id',
        'check_status',
        'check_content',
    ];
}
