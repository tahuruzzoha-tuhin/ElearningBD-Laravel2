<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

/**
 * Class Lesson
 *
 * @package App
 * @property integer $lesson_id
 * @property string $course
 * @property string $title
 * @property text $short_text
 * @property text $long_text
 * @property integer $position
 * @property tinyInteger $is_published
 * @property tinyInteger $is_free
*/
class Lesson extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    
    protected $fillable = ['lesson_id', 'title', 'short_text', 'long_text', 'position', 'is_published', 'is_free', 'course_id'];
    protected $appends = ['thumbnail', 'thumbnail_link', 'uploaded_thumbnail', 'video', 'video_link', 'uploaded_video'];
    protected $with = ['media'];
    

    public static function storeValidation($request)
    {
        return [
            'lesson_id' => 'integer|min:1|max:10000|required',
            'course_id' => 'integer|exists:courses,id|max:4294967295|required',
            'title' => 'max:191|required',
            'thumbnail' => 'nullable',
            'thumbnail.*' => 'file|image|nullable',
            'short_text' => 'max:65535|nullable',
            'long_text' => 'max:65535|nullable',
            'video' => 'nullable',
            'video.*' => 'file|nullable',
            'position' => 'integer|max:2147483647|nullable',
            'is_published' => 'boolean|nullable',
            'is_free' => 'boolean|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'lesson_id' => 'integer|min:1|max:10000|required',
            'course_id' => 'integer|exists:courses,id|max:4294967295|required',
            'title' => 'max:191|required',
            'thumbnail' => 'sometimes',
            'thumbnail.*' => 'file|image|nullable',
            'short_text' => 'max:65535|nullable',
            'long_text' => 'max:65535|nullable',
            'video' => 'sometimes',
            'video.*' => 'file|nullable',
            'position' => 'integer|max:2147483647|nullable',
            'is_published' => 'boolean|nullable',
            'is_free' => 'boolean|nullable'
        ];
    }

    

    public function getThumbnailAttribute()
    {
        return [];
    }

    public function getUploadedThumbnailAttribute()
    {
        return $this->getMedia('thumbnail')->keyBy('id');
    }

    /**
     * @return string
     */
    public function getThumbnailLinkAttribute()
    {
        $thumbnail = $this->getMedia('thumbnail');
        if (! count($thumbnail)) {
            return null;
        }
        $html = [];
        foreach ($thumbnail as $file) {
            $html[] = '<a href="' . $file->getUrl() . '" target="_blank">' . $file->file_name . '</a>';
        }

        return implode('<br/>', $html);
    }

    public function getVideoAttribute()
    {
        return [];
    }

    public function getUploadedVideoAttribute()
    {
        return $this->getMedia('video')->keyBy('id');
    }

    /**
     * @return string
     */
    public function getVideoLinkAttribute()
    {
        $video = $this->getMedia('video');
        if (! count($video)) {
            return null;
        }
        $html = [];
        foreach ($video as $file) {
            $html[] = '<a href="' . $file->getUrl() . '" target="_blank">' . $file->file_name . '</a>';
        }

        return implode('<br/>', $html);
    }
    
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id')->withTrashed();
    }
    
    
}
