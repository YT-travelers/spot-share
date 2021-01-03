<?php

namespace App\Http\Controllers;

use App\Models\Tourism;
use Illuminate\Http\Request;

class TourismController extends Controller
{
    public function __construct(private Tourism $tourism)
    {
    }

    /**
     * @return array
     */
    public function index(): array
    {
        return $this->tourism->get()->map(function (Tourism $tourism) {
            return [
                'tourismId' => $tourism->tourism_id,
                'tourismName' => $tourism->tourism_name,
                'country' => [
                    'countryCode' => $tourism->country->country_code,
                    'countryName' => $tourism->country->country_name,
                    'currency' => $tourism->country->currency,
                    'timezone' => $tourism->country->timezone
                ],
                'tourismOpenTime' => $tourism->tourism_open_time,
                'tourismCloseTime' => $tourism->tourism_close_time,
                'tourismSummary' => $tourism->tourism_summary,
                'tourismAddress' => $tourism->tourism_address,
                'tourismUrl' => $tourism->tourism_url,
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
