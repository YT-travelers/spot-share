<?php

namespace App\Models;

use App\Models\Code\YesNoDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailHotel extends Model
{
    use HasFactory;

    protected $primaryKey = 'route_detail_id';

    public function hotelBreakfastYesNo(): BelongsTo
    {
        return $this->belongsTo(YesNoDiv::class, 'hotel_breakfast_yes_no_div', 'div_value');
    }

    public function hotelDinnerYesNo(): BelongsTo
    {
        return $this->belongsTo(YesNoDiv::class, 'hotel_dinner_yes_no_div', 'div_value');
    }

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class, 'hotel_id', 'hotel_id');
    }
}
