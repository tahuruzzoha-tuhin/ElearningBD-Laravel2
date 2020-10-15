<?php

namespace App\Http\Controllers\Api\V1;

use App\Questionoption;
use App\Http\Controllers\Controller;
use App\Http\Resources\Questionoption as QuestionoptionResource;
use App\Http\Requests\Admin\StoreQuestionoptionsRequest;
use App\Http\Requests\Admin\UpdateQuestionoptionsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;



class QuestionoptionsController extends Controller
{
    public function index()
    {
        

        return new QuestionoptionResource(Questionoption::with(['question'])->get());
    }

    public function show($id)
    {
        if (Gate::denies('questionoption_view')) {
            return abort(401);
        }

        $questionoption = Questionoption::with(['question'])->findOrFail($id);

        return new QuestionoptionResource($questionoption);
    }

    public function store(StoreQuestionoptionsRequest $request)
    {
        if (Gate::denies('questionoption_create')) {
            return abort(401);
        }

        $questionoption = Questionoption::create($request->all());
        
        

        return (new QuestionoptionResource($questionoption))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateQuestionoptionsRequest $request, $id)
    {
        if (Gate::denies('questionoption_edit')) {
            return abort(401);
        }

        $questionoption = Questionoption::findOrFail($id);
        $questionoption->update($request->all());
        
        
        

        return (new QuestionoptionResource($questionoption))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        if (Gate::denies('questionoption_delete')) {
            return abort(401);
        }

        $questionoption = Questionoption::findOrFail($id);
        $questionoption->delete();

        return response(null, 204);
    }
}
