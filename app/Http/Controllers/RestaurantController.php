<?php

namespace App\Http\Controllers;

use App\Http\Services\RestaurantService;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class RestaurantController extends CrudController
{
    #[Pure] public function __construct(protected Restaurant $restaurant, private RestaurantService $restaurantService)
    {
        parent::__construct($this->restaurant);
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
        $restaurantImages = makeArraySnakeRecursively($request->get('restaurantImages', []));
        $restaurantData = makeArraySnakeRecursively($request->except(['cuisineGenreDivName', 'restaurantKindDivName']));
        $response = $this->restaurantService->saveRestaurant($restaurantData, $restaurantImages, $uploadFiles, $id);

        return response()->json($response);
    }
}
