import { reactive } from 'vue'

import router from '../router/'

import { Loader } from './useLoader'
import { Toasting } from './useToasting'
import { AuthMe } from './useAuthMe'

import AuthApi from '../api/Auth'

export const useAuthLogin = ({ loader, toasting }: { loader: Loader; toasting: Toasting }, onLoginSucceed: AuthMe["updateMyInfo"]) => { // NOTE: better to pass variables as onSuccessLogin and onFailLogin functions
  const userForm = reactive({
    email: {
      text: '',
      errorMessage: ''
    },
    password: {
      text: '',
      errorMessage: ''
    }
  })

  const onFormUpdate = ({ key, value }: { key: 'email' | 'password'; value: string }) => {
    userForm[key].text = value
  }

  const validate = () => { // TODO: make validation module
    userForm.email.errorMessage = ''
    userForm.password.errorMessage = ''

    if (userForm.email.text.trim() === '') { // TODO: validation for email
      userForm.email.errorMessage = 'Please enter your email address.'
    }
    if (userForm.password.text.trim() === '') { // TODO: validation for password and confirmation
      userForm.password.errorMessage = 'Please enter your password.'
    }
  }

  const login = async () => {
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

  const onSubmit = async () => {
    validate()

    if (Object.values(userForm).every((value) => value.errorMessage === '')) {
      await login()
    }
  }

  return {
    userForm,

    onFormUpdate,
    onSubmit
  }
}
