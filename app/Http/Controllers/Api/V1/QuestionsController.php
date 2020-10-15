<?php

namespace App\Http\Controllers\Api\V1;

use App\Question;
use App\Http\Controllers\Controller;
use App\Http\Resources\Question as QuestionResource;
use App\Http\Requests\Admin\StoreQuestionsRequest;
use App\Http\Requests\Admin\UpdateQuestionsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

use App\Http\Controllers\Traits\FileUploadTrait;


class QuestionsController extends Controller
{
    public function index()
    {
        

        return new QuestionResource(Question::with(['test'])->get());
    }

    public function show($id)
    {
        if (Gate::denies('question_view')) {
            return abort(401);
        }

        $question = Question::with(['test'])->findOrFail($id);

        return new QuestionResource($question);
    }

    public function store(StoreQuestionsRequest $request)
    {
        if (Gate::denies('question_create')) {
            return abort(401);
        }

        $question = Question::create($request->all());
        
        if ($request->hasFile('question_image')) {
            foreach ($request->file('question_image') as $key => $file) {
                $question->addMedia($file)->toMediaCollection('question_image');
            }
        }if ($request->hasFile('question_file')) {
            foreach ($request->file('question_file') as $key => $file) {
                $question->addMedia($file)->toMediaCollection('question_file');
            }
        }

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateQuestionsRequest $request, $id)
    {
        if (Gate::denies('question_edit')) {
            return abort(401);
        }

        $question = Question::findOrFail($id);
        $question->update($request->all());
        
        $filesInfo = explode(',', $request->input('uploaded_question_image'));
        foreach ($question->getMedia('question_image') as $file) {
            if (! in_array($file->id, $filesInfo)) {
                $file->delete();
            }
        }$filesInfo = explode(',', $request->input('uploaded_question_file'));
        foreach ($question->getMedia('question_file') as $file) {
            if (! in_array($file->id, $filesInfo)) {
                $file->delete();
            }
        }
        if ($request->hasFile('question_image')) {
            foreach ($request->file('question_image') as $key => $file) {
                $question->addMedia($file)->toMediaCollection('question_image');
            }
        }if ($request->hasFile('question_file')) {
            foreach ($request->file('question_file') as $key => $file) {
                $question->addMedia($file)->toMediaCollection('question_file');
            }
        }

        return (new QuestionResource($question))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        if (Gate::denies('question_delete')) {
            return abort(401);
        }

        $question = Question::findOrFail($id);
        $question->delete();

        return response(null, 204);
    }
}
