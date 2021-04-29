<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteDetailMemo extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $guarded = [];
}
