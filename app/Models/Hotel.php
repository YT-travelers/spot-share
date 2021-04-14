<?php

namespace App\Models;

use App\Models\Code\HotelKindDiv;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Hotel extends Model
{
    protected $primaryKey = 'hotel_id';

    protected $guarded = ['hotel_id'];

    use HasFactory;

    public function hotelKind(): BelongsTo
    {
        return $this->belongsTo(HotelKindDiv::class, 'hotel_kind_div', 'div_value');
    }

    public function toArray(): array
    {
        $array = parent::toArray();
        $array['hotelKindDiv'] = $this->hotelKind->div_value;
        $array['hotelKindDivName'] = $this->hotelKind->div_key_name;

        return $array;
    }
}
