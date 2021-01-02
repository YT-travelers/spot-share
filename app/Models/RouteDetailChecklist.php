<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RouteDetailChecklist extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    protected $guarded = ['route_detail_id'];
}
