<?php

namespace App\Http\Controllers;

use App\Models\Code\Code;
use JetBrains\PhpStorm\Pure;

class CodeController extends CrudController
{
    #[Pure] public function __construct(private Code $codeModel)
    {
        parent::__construct($this->codeModel);
    }
}
