import validator from 'validator'

import { Form } from '../types/Form'

export const isNotEmpty = (str: string, errorMessage = 'Please provide it.') => {
  if (!validator.isEmpty(str)) {
    return ''
  } else {
    return errorMessage
  }
}

export const isEmail = (str: string, errorMessage = 'Please provide correct format for email address.') => {
  if (validator.isEmail(str)) {
    return ''
  } else {
    return errorMessage
  }
}

export const isLengthLowerThan = (str: string, length: number, errorMessage = `Please provide it lower than ${length} characters.`) => {
  if (validator.isLength(str, { max: length })) {
    return ''
  } else {
    return errorMessage
  }
}

export const isAlpha = (str: string, errorMessage = 'Please provide it in alphabet.') => {
  if (validator.isAlpha(str)) {
    return ''
  } else {
    return errorMessage
  }
}

export const isPassword = (str: string, errorMessage = 'Please provide it in more than 6 characters containing alphabet and number.') => {
  if (validator.isStrongPassword(str, { minLength: 6, minUppercase: 0, minSymbols: 0 })) {
    return ''
  } else {
    return errorMessage
  }
}

export const areNoErrorsExistInForm = (form: Form) => {
  return Object.values(form).every((value) => value.errorMessage === '')
}
