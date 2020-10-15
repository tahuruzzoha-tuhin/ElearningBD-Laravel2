<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Test
 *
 * @package App
 * @property integer $test_id
 * @property string $courses
 * @property string $lesson
 * @property string $title
 * @property text $description
 * @property tinyInteger $is_published
*/
class Test extends Model
{
    use SoftDeletes;

    
    protected $fillable = ['test_id', 'title', 'description', 'is_published', 'courses_id', 'lesson_id'];
    

    public static function storeValidation($request)
    {
        return [
            'test_id' => 'integer|max:2147483647|required',
            'courses_id' => 'integer|exists:courses,id|max:4294967295|required',
            'lesson_id' => 'integer|exists:lessons,id|max:4294967295|required',
            'title' => 'max:191|nullable',
            'description' => 'max:65535|nullable',
            'is_published' => 'boolean|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'test_id' => 'integer|max:2147483647|required',
            'courses_id' => 'integer|exists:courses,id|max:4294967295|required',
            'lesson_id' => 'integer|exists:lessons,id|max:4294967295|required',
            'title' => 'max:191|nullable',
            'description' => 'max:65535|nullable',
            'is_published' => 'boolean|nullable'
        ];
    }

    

    
    
    public function courses()
    {
        return $this->belongsTo(Course::class, 'courses_id')->withTrashed();
    }
    
    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id')->withTrashed();
    }
    
    
}
