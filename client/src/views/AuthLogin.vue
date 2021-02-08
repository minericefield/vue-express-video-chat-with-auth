<template>
  <div class="auth-login p-5">
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

    const { userForm, onFormUpdate, onSubmit } = useAuthLogin({ loader, toasting }, updateMyInfo)

    return {
      userForm,

      onFormUpdate,
      onSubmit
    }
  }
})
</script>
