<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Country extends Model
{
    use HasFactory;

    public function countryCurrencies(): HasMany
    {
        return $this->hasMany(CountryCurrency::class, 'country_code', 'country_code');
    }
}
