<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class RestaurantController extends CrudController
{
    #[Pure] public function __construct(protected Restaurant $restaurant)
    {
        parent::__construct($this->restaurant);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->except(['cuisineGenreDivName', 'restaurantKindDivName']);
        return parent::store($request->replace($data));
    }
}
