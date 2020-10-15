<?php

namespace App\Http\Controllers\Api\V1;

use App\Course;
use App\Http\Controllers\Controller;
use App\Http\Resources\Course as CourseResource;
use App\Http\Requests\Admin\StoreCoursesRequest;
use App\Http\Requests\Admin\UpdateCoursesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

use App\Http\Controllers\Traits\FileUploadTrait;


class CoursesController extends Controller
{
    public function index()
    {
        

        return new CourseResource(Course::with(['teacher', 'students'])->get());
    }

    public function show($id)
    {
        if (Gate::denies('course_view')) {
            return abort(401);
        }

        $course = Course::with(['teacher', 'students'])->findOrFail($id);

        return new CourseResource($course);
    }

    public function store(StoreCoursesRequest $request)
    {
        if (Gate::denies('course_create')) {
            return abort(401);
        }

        $course = Course::create($request->all());
        $course->students()->sync($request->input('students', []));
        if ($request->hasFile('thumbnail')) {
            foreach ($request->file('thumbnail') as $key => $file) {
                $course->addMedia($file)->toMediaCollection('thumbnail');
            }
        }

        return (new CourseResource($course))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateCoursesRequest $request, $id)
    {
        if (Gate::denies('course_edit')) {
            return abort(401);
        }

        $course = Course::findOrFail($id);
        $course->update($request->all());
        $course->students()->sync($request->input('students', []));
        $filesInfo = explode(',', $request->input('uploaded_thumbnail'));
        foreach ($course->getMedia('thumbnail') as $file) {
            if (! in_array($file->id, $filesInfo)) {
                $file->delete();
            }
        }
        if ($request->hasFile('thumbnail')) {
            foreach ($request->file('thumbnail') as $key => $file) {
                $course->addMedia($file)->toMediaCollection('thumbnail');
            }
        }

        return (new CourseResource($course))
            ->response()
            ->setStatusCode(202);
    }

    public function destroy($id)
    {
        if (Gate::denies('course_delete')) {
            return abort(401);
        }

        $course = Course::findOrFail($id);
        $course->delete();

        return response(null, 204);
    }
}
