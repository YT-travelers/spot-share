<?php

namespace App\Models;

use App\Models\Code\MealKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailMeal extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    public function mealKind(): BelongsTo
    {
        return $this->belongsTo(MealKindDiv::class, 'meal_kind_div', 'div_value');
    }
}
