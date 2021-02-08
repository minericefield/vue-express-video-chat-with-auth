import { reactive } from 'vue'

import { Loader } from './useLoader'
import { Toasting } from './useToasting'

import AuthApi from '../api/Auth'

export const useAuthRegister = ({ loader, toasting }: { loader?: Loader; toasting?: Toasting }) => {
  const userForm = reactive({
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

  const onFormUpdate = ({ key, value }: { key: 'name' | 'email' | 'password'; value: string }) => {
    userForm[key].text = value
    console.log(userForm)
  }

  const validate = () => { // TODO: make validation module
    userForm.name.errorMessage = ''
    userForm.email.errorMessage = ''
    userForm.password.errorMessage = ''

    if (userForm.name.text.trim() === '') {
      userForm.name.errorMessage = 'Please enter your name.'
    }
    if (userForm.email.text.trim() === '') { // TODO: validation for email
      userForm.email.errorMessage = 'Please enter your email address.'
    }
    if (userForm.password.text.trim() === '') { // TODO: validation for password and confirmation
      userForm.password.errorMessage = 'Please enter your password.'
    }
  }

  const register = async () => {
    loader?.displayLoader(true)
    const params = {
      name: userForm.name.text,
      email: userForm.email.text,
      password: userForm.password.text
    }
    const result = await new AuthApi().register(params)
    loader?.displayLoader(false)
    if (result.succeed) {
      toasting?.displayToasting({ shouldBeVisible: true, message: 'Please check your email to verify your account.', isError: false })
    } else {
      toasting?.displayToasting({ shouldBeVisible: true, message: 'Some Error Occured.', isError: true }) // TODO: proper error handling with server response
    }
  }

  const onSubmit = async () => {
    validate()

    if (Object.values(userForm).every((value) => value.errorMessage === '')) {
      await register()
    }
  }

  return {
    userForm,

    onFormUpdate,
    onSubmit
  }
}