const Joi = require('joi')

const string = Joi.string().allow(null, '');
const stringReq = Joi.string().required();
const numberReq = Joi.number().required();
const number = Joi.string().allow(null, '');
const EmailDTO = Joi.string().email().allow(null, '')
const PhoneDTO = Joi.string().pattern(new RegExp('^\\d{10,15}$')).allow(null, '')
const PasswordDTO = Joi.string()
    .min(6)
    .pattern(new RegExp('^[a-zA-Z\\d]{6,}$')) // Only letters and numbers, no case requirement
    .required()
    .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.pattern.base': 'Password must contain only letters and numbers',
        'any.required': 'Password is required'
    });
const CF_Password = Joi.ref('password')
const passwordReq = Joi.string().min(6)

module.exports = {
    string,
    stringReq,
    numberReq,
    number,
    EmailDTO,
    PasswordDTO,
    CF_Password,
    passwordReq,
    PhoneDTO
}