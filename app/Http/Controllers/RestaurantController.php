<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function __construct(private Restaurant $restaurant)
    {
    }


    /**
     * @return array
     */
    public function index(): array
    {
        return $this->restaurant->get()->map(function (Restaurant $restaurant) {
            return [
                'restaurantId' => $restaurant->restaurant_id,
                'restaurantName' => $restaurant->restaurant_name,
                'country' => [
                    'countryCode' => $restaurant->country->country_code,
                    'countryName' => $restaurant->country->country_name,
                    'currency' => $restaurant->country->currency,
                    'timezone' => $restaurant->country->timezone
                ],
                'cuisineGenre' => [
                    'divKeyName' => $restaurant->cuisineGenre->div_key_name,
                    'divValue' => $restaurant->cuisineGenre->div_value
                ],
                'restaurantKind' => [
                    'divKeyName' => $restaurant->restaurantKind->div_key_name,
                    'divValue' => $restaurant->restaurantKind->div_value,
                ],
                'restaurantOpenTime' => $restaurant->restaurant_open_time,
                'restaurantCloseTime' => $restaurant->restaurant_close_time,
                'restaurantSummary' => $restaurant->restaurant_summary,
                'restaurantAddress' => $restaurant->restaurant_address,
                'restaurantUrl' => $restaurant->restaurant_url,
            ];
        })->toArray();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
