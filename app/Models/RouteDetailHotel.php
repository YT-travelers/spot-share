<?php

namespace App\Models;

use App\Models\Code\YesNoDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RouteDetailHotel extends Model
{
    use HasFactory;

    protected $primaryKey = ['route_id', 'route_detail_id'];
    public $incrementing = false;
    protected $fillable = [
        'route_id',
        'route_detail_id',
        'hotel_id',
        'hotel_breakfast_yes_no_div',
        'hotel_dinner_yes_no_div',
        'hotel_rate',
        'hotel_minutes',
        'hotel_check_in_time',
        'hotel_check_out_time',
        'hotel_cost',
    ];

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
