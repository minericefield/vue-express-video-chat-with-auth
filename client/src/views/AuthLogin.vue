<template>
  <div class="auth-login p-5">
    <h2 class="mb-2">
      Login
    </h2>

    <router-link 
      to="/register"
      class="d-flex justify-content-end mb-2 font-weight-bold text-info under-lined cursor-pointer"
    >
      Or you can register your account from here
    </router-link>

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
import { defineComponent, inject } from 'vue'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'
import { useAuthLogin } from '../modules/useAuthLogin'

import FormTextInput from '../components/FormTextInput.vue'

export default defineComponent({
  name: 'AuthLogin',
  components: {
    FormTextInput
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)
    const { updateMyInfo } = inject(UseAuthMeKey, authMeDefault)

    const { userForm, onFormUpdate, onSubmit: onSubmitExec } = useAuthLogin()

    return {
      userForm,

      onFormUpdate,
      onSubmit: () => { onSubmitExec({ loader, toasting }, updateMyInfo) } 
    }
  }
})
</script>
