import { reactive, ref } from 'vue'

import { Form } from '../types/Form'

import router from '../router/'

import { Loader } from './useLoader'
import { Toasting } from './useToasting'
import { AuthMe } from './useAuthMe'

import AuthApi from '../api/Auth'

import { isNotEmpty, isEmail, isPassword, areNoErrorsExistInForm } from '../services/validator'

type Login = ({ loader, toasting }: { loader: Loader; toasting: Toasting }, onLoginSucceed: AuthMe["updateMyInfo"]) => Promise<void>

export const useAuthLogin = () => {
  const userForm = reactive<Form>({
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
    userForm.email.errorMessage = isNotEmpty(userForm.email.text.trim()) || isEmail(userForm.email.text.trim())
    userForm.password.errorMessage = isNotEmpty(userForm.password.text.trim()) || isPassword(userForm.password.text.trim())
    return areNoErrorsExistInForm(userForm)
  }

  const onFormUpdate = ({ key, value }: { key: 'email' | 'password'; value: string }) => {
    userForm[key].text = value
    if (isValidationOnGoing.value) {
      validate()
    }
  }

  const login: Login = async ({ loader, toasting }, onLoginSucceed) => {
    loader.displayLoader(true)
    const params = {
      email: userForm.email.text,
      password: userForm.password.text
    }
    const result = await new AuthApi().login(params)
    if (result.succeed) {
      onLoginSucceed(true, result.data)
      toasting.displayToasting({ message: 'Login succeed.' })
      router.push({ name: 'Top' })
    } else {
      toasting.displayToasting({ message: 'Login failed.', isError: true }) // TODO: proper error handling with server response
    }
    loader.displayLoader(false)
  }

  const onSubmit: ((...args: Parameters<Login>) => Promise<void>) = async ({ loader, toasting }, onLoginSucceed) => {
    if (validate()) {
      await login({ loader, toasting }, onLoginSucceed)
    }
  }

  return {
    userForm,

    onFormUpdate,
    onSubmit
  }
}

/*
factory pattern
const onSubmit: ((...args: Parameters<Login>) => () => Promise<void>) = ({ loader, toasting }, onLoginSucceed) => async () => {
  if (validate()) {
    await login({ loader, toasting }, onLoginSucceed)
  }
}
*/
