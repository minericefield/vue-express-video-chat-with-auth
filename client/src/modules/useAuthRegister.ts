import { Ref, reactive, ref } from 'vue'

import { Form } from '../types/Form'

import { Loader } from './useLoader'
import { Toasting } from './useToasting'

import AuthApi from '../api/Auth'

import { isNotEmpty, isEmail, isLengthLowerThan, isPassword, areNoErrorsExistInForm } from '../services/validator'

export const useAuthRegister = ({ loader, toasting }: { loader: Loader; toasting: Toasting }) => {
  const userForm = reactive<Form>({
    name: {
      text: '',
      errorMessage: ''
    },
    email: {
      text: '',
      errorMessage: ''
    },
    password: {
      text: '',
      errorMessage: ''
    }
  })
  const isValidationOnGoing = ref(false)

  const validate = () => {
    isValidationOnGoing.value = true
    userForm.name.errorMessage = isNotEmpty(userForm.name.text.trim()) || isLengthLowerThan(userForm.name.text.trim(), 20)
    userForm.email.errorMessage = isNotEmpty(userForm.email.text.trim()) || isEmail(userForm.email.text.trim())
    userForm.password.errorMessage = isNotEmpty(userForm.password.text.trim()) || isPassword(userForm.password.text.trim())
    return areNoErrorsExistInForm(userForm)
  }

  const onFormUpdate = ({ key, value }: { key: 'name' | 'email' | 'password'; value: string }) => {
    userForm[key].text = value
    if (isValidationOnGoing.value) {
      validate()
    }
  }

  const register = async () => {
    loader.displayLoader(true)
    const params = {
      name: userForm.name.text,
      email: userForm.email.text,
      password: userForm.password.text
    }
    const result = await new AuthApi().register(params)
    loader.displayLoader(false)
    if (result.succeed) {
      toasting.displayToasting({ message: 'Please check your email to verify your account.' })
    } else {
      toasting.displayToasting({ message: 'Registration failed.', isError: true }) // TODO: proper error handling with server response
    }
  }

  const onSubmit = async () => {
    if (validate()) {
      await register()
    }
  }

  const resendEmail = async (email: Ref<string>) => {
    loader.displayLoader(true)
    const params = {
      email: email.value
    }
    const result = await new AuthApi().resend(params)
    loader.displayLoader(false)
    if (result.succeed) {
      toasting.displayToasting({ message: 'Please check your email to verify your account.' })
    } else {
      toasting.displayToasting({ message: 'Resending failed.', isError: true }) // TODO: proper error handling with server response
    }
  }

  return {
    userForm,

    onFormUpdate,
    validate,
    onSubmit,
    resendEmail
  }
}
