<?php

namespace App\Models;

use App\Models\Code\MealKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailRestaurant extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    protected $guarded = ['route_detail_id'];

    public function restaurant(): BelongsTo
    {
        return $this->belongsTo(Restaurant::class, 'restaurant_id', 'restaurant_id');
    }

    public function mealKind(): BelongsTo
    {
        return $this->belongsTo(MealKindDiv::class, 'restaurant_meal_kind_div', 'div_value');
    }
}
