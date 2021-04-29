<?php

namespace App\Models;

use App\Models\Code\MealKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailMeal extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $fillable = [
        'route_id',
        'route_detail_id',
        'meal_kind_div',
        'meal_minutes',
        'meal_cost',
    ];

    public function mealKind(): BelongsTo
    {
        return $this->belongsTo(MealKindDiv::class, 'meal_kind_div', 'div_value');
    }
}
