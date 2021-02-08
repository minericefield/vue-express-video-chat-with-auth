import { reactive } from 'vue'

export const useAuthRegister = (on) => {
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
  }

  const validate = () => { // TODO: make validation module
    userForm.name.errorMessage = ''
    userForm.email.errorMessage = ''
    userForm.password.errorMessage = ''

    if (userForm.name.text.trim() === '') {
      userForm.name.errorMessage = 'Please enter your name'
    }
    if (userForm.email.text.trim() === '') { // TODO: validation for email
      userForm.email.errorMessage = 'Please enter your email address'
    }
    if (userForm.password.text.trim() === '') { // TODO: validation for password and confirmation
      userForm.password.errorMessage = 'Please enter your password'
    }
  }
}