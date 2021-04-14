<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use JetBrains\PhpStorm\Pure;

class ActivityController extends CrudController
{
    #[Pure] public function __construct(private Activity $activity)
    {
        parent::__construct($this->activity);
    }
}
