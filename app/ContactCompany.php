<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ContactCompany
 *
 * @package App
 * @property string $name
 * @property string $address
 * @property string $website
 * @property string $email
*/
class ContactCompany extends Model
{
    
    protected $fillable = ['name', 'address', 'website', 'email'];
    

    public static function storeValidation($request)
    {
        return [
            'name' => 'max:191|nullable',
            'address' => 'max:191|nullable',
            'website' => 'max:191|nullable',
            'email' => 'max:191|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'name' => 'max:191|nullable',
            'address' => 'max:191|nullable',
            'website' => 'max:191|nullable',
            'email' => 'max:191|nullable'
        ];
    }

    

    
    
    
}
