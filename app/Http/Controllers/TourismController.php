<?php

namespace App\Http\Controllers;

use App\Models\Tourism;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class TourismController extends CrudController
{
    #[Pure] public function __construct(private Tourism $tourism)
    {
        parent::__construct($this->tourism);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $data = $request->all();
        $data['countryCode'] = $data['country']['countryCode'];
        unset($data['country']);
        return parent::store($request->replace($data));
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $data = $request->all();
        $data['countryCode'] = $data['country']['countryCode'];
        unset($data['country']);
        return parent::update($request->replace($data), $id);
    }
}
