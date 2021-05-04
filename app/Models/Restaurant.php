<?php

namespace App\Models;

use App\Models\Code\CuisineGenreDiv;
use App\Models\Code\RestaurantKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Restaurant extends Model
{
    use HasFactory;

    protected $primaryKey = 'restaurant_id';

    protected $guarded = ['restaurant_id'];

    protected $with = ['restaurantImages'];

    public function cuisineGenre(): BelongsTo
    {
        return $this->belongsTo(CuisineGenreDiv::class, 'cuisine_genre_div', 'div_value');
    }

    public function restaurantKind(): BelongsTo
    {
        return $this->belongsTo(RestaurantKindDiv::class, 'restaurant_kind_div', 'div_value');
    }

    public function toArray(): array
    {
        $array = parent::toArray();
        $array['cuisineGenreDiv'] = $this->cuisineGenre->div_value;
        $array['cuisineGenreDivName'] = $this->cuisineGenre->div_key_name;
        $array['restaurantKindDiv'] = $this->restaurantKind->div_value;
        $array['restaurantKindDivName'] = $this->restaurantKind->div_key_name;

        return $array;
    }

    public function restaurantImages(): HasMany
    {
        return $this->hasMany(RestaurantImage::class, 'restaurant_id', 'restaurant_id');
    }
}
