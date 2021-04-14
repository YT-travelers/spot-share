<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Activity extends Model
{
    use HasFactory;

    protected $primaryKey = 'activity_id';

    protected $guarded = ['activity_id'];
}
