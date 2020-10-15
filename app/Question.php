<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

/**
 * Class Question
 *
 * @package App
 * @property integer $question_id
 * @property string $test
 * @property string $question_text
*/
class Question extends Model implements HasMedia
{
    use SoftDeletes, HasMediaTrait;

    
    protected $fillable = ['question_id', 'question_text', 'test_id'];
    protected $appends = ['question_image', 'question_image_link', 'uploaded_question_image', 'question_file', 'question_file_link', 'uploaded_question_file'];
    protected $with = ['media'];
    

    public static function storeValidation($request)
    {
        return [
            'question_id' => 'integer|max:2147483647|required',
            'test_id' => 'integer|exists:tests,id|max:4294967295|nullable',
            'question_text' => 'max:191|required',
            'question_image' => 'nullable',
            'question_image.*' => 'file|image|nullable',
            'question_file' => 'nullable',
            'question_file.*' => 'file|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'question_id' => 'integer|max:2147483647|required',
            'test_id' => 'integer|exists:tests,id|max:4294967295|nullable',
            'question_text' => 'max:191|required',
            'question_image' => 'sometimes',
            'question_image.*' => 'file|image|nullable',
            'question_file' => 'sometimes',
            'question_file.*' => 'file|nullable'
        ];
    }

    

    public function getQuestionImageAttribute()
    {
        return [];
    }

    public function getUploadedQuestionImageAttribute()
    {
        return $this->getMedia('question_image')->keyBy('id');
    }

    /**
     * @return string
     */
    public function getQuestionImageLinkAttribute()
    {
        $question_image = $this->getMedia('question_image');
        if (! count($question_image)) {
            return null;
        }
        $html = [];
        foreach ($question_image as $file) {
            $html[] = '<a href="' . $file->getUrl() . '" target="_blank">' . $file->file_name . '</a>';
        }

        return implode('<br/>', $html);
    }

    public function getQuestionFileAttribute()
    {
        return [];
    }

    public function getUploadedQuestionFileAttribute()
    {
        return $this->getMedia('question_file')->keyBy('id');
    }

    /**
     * @return string
     */
    public function getQuestionFileLinkAttribute()
    {
        $question_file = $this->getMedia('question_file');
        if (! count($question_file)) {
            return null;
        }
        $html = [];
        foreach ($question_file as $file) {
            $html[] = '<a href="' . $file->getUrl() . '" target="_blank">' . $file->file_name . '</a>';
        }

        return implode('<br/>', $html);
    }
    
    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id')->withTrashed();
    }
    
    
}
