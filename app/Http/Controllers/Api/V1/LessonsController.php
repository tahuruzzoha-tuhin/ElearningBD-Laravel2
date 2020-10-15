<?php

namespace App\Http\Controllers\Api\V1;

use App\Lesson;
use App\Http\Controllers\Controller;
use App\Http\Resources\Lesson as LessonResource;
use App\Http\Requests\Admin\StoreLessonsRequest;
use App\Http\Requests\Admin\UpdateLessonsRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

use App\Http\Controllers\Traits\FileUploadTrait;


class LessonsController extends Controller
{
    public function index()
    {
        

        return new LessonResource(Lesson::with(['course'])->get());
    }

    public function show($id)
    {
        if (Gate::denies('lesson_view')) {
            return abort(401);
        }

        $lesson = Lesson::with(['course'])->findOrFail($id);

        return new LessonResource($lesson);
    }

    public function store(StoreLessonsRequest $request)
    {
        if (Gate::denies('lesson_create')) {
            return abort(401);
        }

        $lesson = Lesson::create($request->all());
        
        if ($request->hasFile('thumbnail')) {
            foreach ($request->file('thumbnail') as $key => $file) {
                $lesson->addMedia($file)->toMediaCollection('thumbnail');
            }
        }if ($request->hasFile('video')) {
            foreach ($request->file('video') as $key => $file) {
                $lesson->addMedia($file)->toMediaCollection('video');
            }
        }

        return (new LessonResource($lesson))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateLessonsRequest $request, $id)
    {
        if (Gate::denies('lesson_edit')) {
            return abort(401);
        }

        $lesson = Lesson::findOrFail($id);
        $lesson->update($request->all());
        
        $filesInfo = explode(',', $request->input('uploaded_thumbnail'));
        foreach ($lesson->getMedia('thumbnail') as $file) {
            if (! in_array($file->id, $filesInfo)) {
                $file->delete();
            }
        }$filesInfo = explode(',', $request->input('uploaded_video'));
        foreach ($lesson->getMedia('video') as $file) {
            if (! in_array($file->id, $filesInfo)) {
                $file->delete();
            }
        }
        if ($request->hasFile('thumbnail')) {
            foreach ($request->file('thumbnail') as $key => $file) {
                $lesson->addMedia($file)->toMediaCollection('thumbnail');
            }
        }if ($request->hasFile('video')) {
            foreach ($request->file('video') as $key => $file) {
                $lesson->addMedia($file)->toMediaCollection('video');
            }
        }

        return (new LessonResource($lesson))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        if (Gate::denies('lesson_delete')) {
            return abort(401);
        }

        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return response(null, 204);
    }
}
