<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tourism extends Model
{
    use HasFactory;

    protected $primaryKey = 'tourism_id';

    protected $guarded = ['tourism_id'];

    protected $with = ['tourismImages'];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_code', 'country_code');
    }

    public function toArray(): array
    {
        $array = parent::toArray();
        $array['country'] = [
            'countryCode' => $this->country->country_code,
            'countryName' => $this->country->country_name,
            'currency' => $this->country->currency,
            'timezone' => $this->country->timezone
        ];
        unset($array['countryCode']);

        return $array;
    }

    public function tourismImages(): HasMany
    {
        return $this->hasMany(TourismImage::class, 'tourism_id', 'tourism_id');
    }
}
