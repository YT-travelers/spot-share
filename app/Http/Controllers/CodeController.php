<?php

namespace App\Http\Controllers;

use App\Models\Code\Code;

class CodeController extends Controller
{
    public function __construct(private Code $codeModel)
    {
    }

    public function index(): array
    {
        return $this->codeModel
            ->orderBy('division')
            ->orderBy('div_value')
            ->get()->map(function (Code $code) {
                return [
                    'division' => $code->division,
                    'divKey' => $code->div_key,
                    'divName' => $code->div_name,
                    'divKeyName' => $code->div_key_name,
                    'divValue' => $code->div_value,
                ];
            })->toArray();
    }
}
