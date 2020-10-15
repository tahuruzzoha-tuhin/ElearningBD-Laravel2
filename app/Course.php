<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

/**
 * Class Course
 *
 * @package App
 * @property integer $user_id
 * @property string $teacher
 * @property string $title
 * @property text $description
 * @property decimal $price
 * @property tinyInteger $is_published
*/
class Course extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    
    protected $fillable = ['user_id', 'title', 'description', 'price', 'is_published', 'teacher_id'];
    protected $appends = ['thumbnail', 'thumbnail_link', 'uploaded_thumbnail'];
    protected $with = ['media'];
    

    public static function storeValidation($request)
    {
        return [
            'user_id' => 'integer|min:1|max:10000|required|unique:courses,user_id',
            'teacher_id' => 'integer|exists:permissions,id|max:4294967295|required',
            'title' => 'min:1|max:191|required',
            'description' => 'max:65535|required',
            'price' => 'numeric|nullable',
            'thumbnail' => 'nullable',
            'thumbnail.*' => 'file|image|nullable',
            'is_published' => 'boolean|nullable',
            'students' => 'array|nullable',
            'students.*' => 'integer|exists:users,id|max:4294967295|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'user_id' => 'integer|min:1|max:10000|required|unique:courses,user_id,'.$request->route('course'),
            'teacher_id' => 'integer|exists:permissions,id|max:4294967295|required',
            'title' => 'min:1|max:191|required',
            'description' => 'max:65535|required',
            'price' => 'numeric|nullable',
            'thumbnail' => 'sometimes',
            'thumbnail.*' => 'file|image|nullable',
            'is_published' => 'boolean|nullable',
            'students' => 'array|nullable',
            'students.*' => 'integer|exists:users,id|max:4294967295|nullable'
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
    
    public function teacher()
    {
        return $this->belongsTo(Permission::class, 'teacher_id');
    }
    
    public function students()
    {
        return $this->belongsToMany(User::class, 'course_user');
    }
    
    
}
