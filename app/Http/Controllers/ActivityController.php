<?php

namespace App\Http\Controllers;

use App\Http\Services\ActivityService;
use App\Models\Activity;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\Pure;

class ActivityController extends CrudController
{
    #[Pure] public function __construct(private Activity $activity, private ActivityService $activityService)
    {
        parent::__construct($this->activity);
    }

    public function store(Request $request): JsonResponse
    {
        return $this->storeOrUpdate($request);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        return $this->storeOrUpdate($request, $id);
    }

    private function storeOrUpdate(Request $request, int $id = null): JsonResponse
    {
        $uploadFiles = $request->get('uploadFiles', []) ?? [];
        $activityImages = makeArraySnakeRecursively($request->get('activityImages', []));
        $activityData = makeArraySnakeRecursively($request->except(['activityImages', 'uploadFiles']));
        $response = $this->activityService->saveActivity($activityData, $activityImages, $uploadFiles, $id);

        return response()->json($response);
    }
}
