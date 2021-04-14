<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

abstract class CrudController extends Controller
{
    public function __construct(protected Model $model)
    {
    }

    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(
            $this->model->get()->toArray()
        );
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $_postData = $request->toArray();
        $postData = makeArraySnakeRecursively($_postData);
        $model = $this->model->create($postData);

        return response()->json($model);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $model = $this->model->findOrFail($id);

        return response()->json($model);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $model = $this->model->findOrFail($id);
        $_updateData = $request->toArray();
        $updateData = makeArraySnakeRecursively($_updateData);
        $model->save($updateData);

        return response()->json($model);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $model = $this->model->findOrFail($id);
        $model->delete();
        return response()->json($model);
    }
}
