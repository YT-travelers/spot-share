<?php

namespace App\Http\Controllers;

use App\Http\Services\TourismService;
use App\Models\Tourism;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class TourismController extends CrudController
{
    #[Pure] public function __construct(private Tourism $tourism, private TourismService $tourismService)
    {
        parent::__construct($this->tourism);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        return $this->storeOrUpdate($request);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        return $this->storeOrUpdate($request, $id);
    }

    private function storeOrUpdate(Request $request, int $id = null)
    {
        $uploadFiles = $request->file('uploadFiles', []);
        $tourismImages = $request->get('tourismImages', []);
        $tourismData = makeArraySnakeRecursively($request->except(['tourismImages', 'uploadFiles']));
        $tourismData['country_code'] = $tourismData['country_code'] ?? $tourismData['country']['country_code'];
        unset($tourismData['country']);
        $response = $this->tourismService->saveTourism($tourismData, $tourismImages, $uploadFiles, $id);

        return response()->json($response);
    }
}
