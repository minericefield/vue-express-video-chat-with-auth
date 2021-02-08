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

// import router from '../router/'

import { UseLoaderKey } from '../modules/useLoader'
import { UseToastingKey } from '../modules/useToasting'
// import { UseAuthMeKey } from '../modules/useAuthMe'
import { useAuthLogin } from '../modules/useAuthLogin'

import FormTextInput from '../components/FormTextInput.vue'

export default defineComponent({
  name: 'AuthLogin',
  components: {
    FormTextInput
  },
  setup () {
    const loader = inject(UseLoaderKey)
    const toasting = inject(UseToastingKey)
    // const { updateMyInfo } = inject(UseAuthMeKey)

    // const onLoginSucceed = ({ name, email }: { name: string; email: string }) => {
    //   toasting?.displayToasting({ shouldBeVisible: true, message: 'Login succeed.', isError: false })
    //   updateMyInfo({ isAuthenticated: true, name, email })
    //   router.push({ name: 'Top' })
    // }

    // const onLoginFailed = () => {

    // }

    const { userForm, onFormUpdate, onSubmit } = useAuthLogin({ loader, toasting })

    return {
      userForm,

      onFormUpdate,
      onSubmit
    }
  }
})
</script>
