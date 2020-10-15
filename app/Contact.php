<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Contact
 *
 * @package App
 * @property string $company
 * @property string $first_name
 * @property string $last_name
 * @property string $phone1
 * @property string $phone2
 * @property string $email
 * @property string $skype
 * @property string $address
*/
class Contact extends Model
{
    
    protected $fillable = ['first_name', 'last_name', 'phone1', 'phone2', 'email', 'skype', 'address', 'company_id'];
    

    public static function storeValidation($request)
    {
        return [
            'company_id' => 'integer|exists:contact_companies,id|max:4294967295|required',
            'first_name' => 'max:191|nullable',
            'last_name' => 'max:191|nullable',
            'phone1' => 'max:191|nullable',
            'phone2' => 'max:191|nullable',
            'email' => 'max:191|nullable',
            'skype' => 'max:191|nullable',
            'address' => 'max:191|nullable'
        ];
    }

    public static function updateValidation($request)
    {
        return [
            'company_id' => 'integer|exists:contact_companies,id|max:4294967295|required',
            'first_name' => 'max:191|nullable',
            'last_name' => 'max:191|nullable',
            'phone1' => 'max:191|nullable',
            'phone2' => 'max:191|nullable',
            'email' => 'max:191|nullable',
            'skype' => 'max:191|nullable',
            'address' => 'max:191|nullable'
        ];
    }

    

    
    
    public function company()
    {
        return $this->belongsTo(ContactCompany::class, 'company_id');
    }
    
    
}
