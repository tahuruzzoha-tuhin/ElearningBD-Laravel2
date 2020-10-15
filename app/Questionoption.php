<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Questionoption
 *
 * @package App
 * @property integer $question_id
 * @property string $question
 * @property string $option_text
 * @property tinyInteger $is_correct
*/
class Questionoption extends Model
{
    use SoftDeletes;

    
    protected $fillable = ['question_id', 'option_text', 'is_correct', 'question_id'];
    

    public static function storeValidation($request)
    {
        return [
            'question_id' => 'integer|max:2147483647|nullable',
            'question_id' => 'integer|exists:questions,id|max:4294967295|nullable',
            'option_text' => 'max:191|required',
            'is_correct' => 'boolean|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'question_id' => 'integer|max:2147483647|nullable',
            'question_id' => 'integer|exists:questions,id|max:4294967295|nullable',
            'option_text' => 'max:191|required',
            'is_correct' => 'boolean|nullable'
        ];
    }

    

    
    
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id')->withTrashed();
    }
    
    
}
