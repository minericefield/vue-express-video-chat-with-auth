<template>
  <div class="auth-register p-5">
    <user-form
      :user-form="userForm"
      @on-form-update="updateForm"
      @on-submit-succeed="register"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from 'vue'

import { UseLoaderKey } from '../modules/useLoader'
import { UseToastingKey } from '../modules/useToasting'
import UserForm from '../components/UserForm.vue'

import AuthApi from '../api/Auth'

export default defineComponent({
  name: 'AuthRegister',
  components: {
    UserForm
  },
  setup () {
    const loader = inject(UseLoaderKey)
    const toasting = inject(UseToastingKey)

    const userForm = reactive({
      name: '',
      email: '',
      password: ''
    })

    const updateForm = ({ key, value }: { key: 'name' | 'email' | 'password'; value: string }) => {
      userForm[key] = value
    }

    const register = async () => {
      loader?.displayLoader(true)
      const result = await new AuthApi().register(userForm)
      loader?.displayLoader(false)
      if (result.succeed) {
        toasting?.displayToasting({ shouldBeVisible: true, message: 'Please check your email to verify your account.', isError: false })
      } else {
        toasting?.displayToasting({ shouldBeVisible: true, message: 'Some Error Occured.', isError: true }) // TODO: proper error handling with server response
      }
    }

    return {
      userForm,

      updateForm,
      register
    }
  }
})
</script>
