<?php

namespace App\Http\Controllers;

use App\Models\Hotel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class HotelController extends CrudController
{
    #[Pure] public function __construct(protected Hotel $hotel)
    {
        parent::__construct($this->hotel);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->except(['hotelKindDivName']);
        return parent::store($request->replace($data));
    }
}
