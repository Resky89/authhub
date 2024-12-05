import Joi from 'joi';

export const ValidationSchemas = {
  // Auth Validation
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Format email tidak valid',
        'any.required': 'Email harus diisi'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password minimal 6 karakter',
        'any.required': 'Password harus diisi'
      })
  }),

  register: Joi.object({
    name: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.min': 'Nama minimal 3 karakter',
        'any.required': 'Nama harus diisi'
      }),
    phoneNumber: Joi.string()
      .pattern(/^(\+62|62|0)[0-9]{9,11}$/)
      .required()
      .messages({
        'string.pattern.base': 'Format nomor telepon tidak valid (gunakan format: +62/62/0 diikuti 9-11 digit angka)',
        'any.required': 'Nomor telepon harus diisi'
      }),
    gender: Joi.string()
      .valid('M', 'F')
      .required()
      .messages({
        'any.only': 'Gender must M atau F',
        'any.required': 'Gender harus diisi'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Format email tidak valid',
        'any.required': 'Email harus diisi'
      }),
    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .required()
      .messages({
        'string.min': 'Password minimal 6 karakter',
        'string.pattern.base': 'Password harus mengandung huruf besar, huruf kecil, dan angka',
        'any.required': 'Password harus diisi'
      })
  }),

  // Update Profile Validation
  updateProfile: Joi.object({
    name: Joi.string()
      .min(3)
      .messages({
        'string.min': 'Nama minimal 3 karakter'
      }),
    phoneNumber: Joi.string()
      .pattern(/^(\+62|62|0)8[1-9][0-9]{6,9}$/)
      .messages({
        'string.pattern.base': 'Format nomor telepon tidak valid (gunakan format: +62/62/0)'
      }),
    gender: Joi.string()
      .valid('L', 'P')
      .messages({
        'any.only': 'Gender harus L atau P'
      }),
    email: Joi.string()
      .email()
      .messages({
        'string.email': 'Format email tidak valid'
      })
  })
};

export const validate = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path[0],
      message: detail.message
    }));
    throw { name: 'ValidationError', errors };
  }

  return value;
}; 