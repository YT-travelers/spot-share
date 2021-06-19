<?php

namespace App\Http\Controllers;

use App\Http\Services\HotelService;
use App\Models\Hotel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class HotelController extends CrudController
{
    #[Pure] public function __construct(protected Hotel $hotel, private HotelService $hotelService)
    {
        parent::__construct($this->hotel);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        return $this->storeAndUpdate($request);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        return $this->storeAndUpdate($request, $id);
    }

    private function storeAndUpdate(Request $request, int $id = null): JsonResponse
    {
        $uploadFiles = $request->get('uploadFiles', []) ?? [];
        $hotelImages = makeArraySnakeRecursively($request->get('hotelImages', []));
        $hotelData = makeArraySnakeRecursively($request->except(['hotelKindDivName']));
        $response = $this->hotelService->saveHotel($hotelData, $hotelImages, $uploadFiles, $id);

        return response()->json($response);
    }
}
