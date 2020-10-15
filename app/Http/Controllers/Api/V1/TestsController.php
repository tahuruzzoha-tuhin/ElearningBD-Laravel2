<?php

namespace App\Http\Controllers\Api\V1;

use App\Test;
use App\Http\Controllers\Controller;
use App\Http\Resources\Test as TestResource;
use App\Http\Requests\Admin\StoreTestsRequest;
use App\Http\Requests\Admin\UpdateTestsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;



class TestsController extends Controller
{
    public function index()
    {
        

        return new TestResource(Test::with(['courses', 'lesson'])->get());
    }

    public function show($id)
    {
        if (Gate::denies('test_view')) {
            return abort(401);
        }

        $test = Test::with(['courses', 'lesson'])->findOrFail($id);

        return new TestResource($test);
    }

    public function store(StoreTestsRequest $request)
    {
        if (Gate::denies('test_create')) {
            return abort(401);
        }

        $test = Test::create($request->all());
        
        

        return (new TestResource($test))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateTestsRequest $request, $id)
    {
        if (Gate::denies('test_edit')) {
            return abort(401);
        }

        $test = Test::findOrFail($id);
        $test->update($request->all());
        
        
        

        return (new TestResource($test))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        if (Gate::denies('test_delete')) {
            return abort(401);
        }

        $test = Test::findOrFail($id);
        $test->delete();

        return response(null, 204);
    }
}
