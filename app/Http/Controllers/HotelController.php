<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function __construct(private Hotel $hotel)
    {
    }

    /**
     * @return array
     */
    public function index(): array
    {
        return $this->hotel->get()->map(function (Hotel $hotel) {
            return [
                'hotelId' => $hotel->hotel_id,
                'hotelName' => $hotel->hotel_name,
                'hotelKind' => [
                    'divKeyName' => $hotel->hotelKind->div_key_name,
                    'divValue' => $hotel->hotelKind->div_value,
                ],
                'hotelSummary' => $hotel->hotel_summary,
                'hotelAddress' => $hotel->hotel_address,
                'hotelUrl' => $hotel->hotel_url
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
