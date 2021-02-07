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
import UserForm from '../components/UserForm.vue'

import AuthApi from '../api/Auth'

export default defineComponent({
  name: 'AuthRegister',
  components: {
    UserForm
  },
  setup () {
    const loader = inject(UseLoaderKey)

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
      await new AuthApi().register(userForm)
      loader?.displayLoader(false)
    }

    return {
      userForm,

      updateForm,
      register
    }
  }
})
</script>
