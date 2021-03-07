<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\CountryCurrency;

class CountryController extends Controller
{
    public function __construct(private Country $countryModel)
    {
    }

    public function index(): array
    {
        return $this->countryModel
            ->with('countryCurrencies')
            ->get()
            ->map(function (Country $county) {
                return [
                    'countryCode' => $county->country_code,
                    'countryName' => $county->country_name,
                    'currencies' => $county->countryCurrencies->map(function (CountryCurrency $currency) {
                        return [
                            'countryCurrencyId' => $currency->country_currency_id,
                            'currencyCode' => $currency->currency_code,
                            'currencySymbol' => $currency->currency_symbol
                        ];
                    }),
                    'timezone' => $county->timezone,
                ];
        })->toArray();
    }
}
