<?php

namespace App\Http\Controllers;

use App\Models\Country;

class CountryController extends Controller
{
    public function __construct(private Country $countryModel)
    {
    }

    public function index(): array
    {
        return $this->countryModel->get()->map(function (Country $county) {
            return [
                'countryCode' => $county->country_code,
                'countryName' => $county->country_name,
                'currency' => $county->currency,
                'timezone' => $county->timezone,
            ];
        })->toArray();
    }
}
