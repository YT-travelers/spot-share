<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tourism extends Model
{
    use HasFactory;

    protected $primaryKey = 'tourism_id';

    protected $guarded = ['tourism_id'];

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_code', 'country_code');
    }
}
