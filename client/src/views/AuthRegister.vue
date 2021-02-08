<template>
  <div class="auth-register p-5">
    <form-text-input
      :text="userForm.name.text"
      target="name"
      label="Your name"
      placeholder="Enter your name"
      :errorMessage="userForm.name.errorMessage"
      @on-update="onFormUpdate({ key: 'name', value: $event })"
    />
    <form-text-input
      :text="userForm.email.text"
      type="email"
      target="email"
      label="Email address"
      placeholder="Enter your email address"
      :errorMessage="userForm.email.errorMessage"
      @on-update="onFormUpdate({ key: 'email', value: $event })"
    />
    <form-text-input
      :text="userForm.password.text"
      type="password"
      target="password"
      label="Password"
      placeholder="Enter your password"
      :errorMessage="userForm.password.errorMessage"
      @on-update="onFormUpdate({ key: 'password', value: $event })"
    />

    <div class="text-center">
      <button @click="onSubmit" class="btn btn-primary">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue'

import { UseLoaderKey } from '../modules/useLoader'
import { UseToastingKey } from '../modules/useToasting'
import FormTextInput from '../components/FormTextInput.vue'

import AuthApi from '../api/Auth'

export default defineComponent({
  name: 'AuthRegister',
  components: {
    FormTextInput
  },
  setup () {
    const loader = inject(UseLoaderKey)
    const toasting = inject(UseToastingKey)

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

    const onSubmit = () => {
      validate()
    }

    return {
      userForm,

      onFormUpdate,
      register
    }
  }
})
</script>
