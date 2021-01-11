<?php

namespace App\Models;

use App\Models\Code\CuisineGenreDiv;
use App\Models\Code\RestaurantKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Restaurant extends Model
{
    use HasFactory;

    protected $primaryKey = 'restaurant_id';

    protected $guarded = ['restaurant_id'];

    public function cuisineGenre(): BelongsTo
    {
        return $this->belongsTo(CuisineGenreDiv::class, 'cuisine_genre_div', 'div_value');
    }

    public function restaurantKind(): BelongsTo
    {
        return $this->belongsTo(RestaurantKindDiv::class, 'restaurant_kind_div', 'div_value');
    }
}
