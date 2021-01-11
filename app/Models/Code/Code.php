<?php

namespace App\Models\Code;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Code extends Model
{
    use HasFactory;

    protected $table = 'codes';
    protected static $division = null;

    protected static function booted()
    {
        static::addGlobalScope('bean_kind_div', function (Builder $builder) {
            if (static::$division !== null) {
                $builder->where('division', static::$division);
            }
        });
    }
}