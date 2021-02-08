<template>
  <layout-default>
    <div class="auth-me p-5">
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
          Update
        </button>
      </div>
    </div>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted } from 'vue'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'
import { useAuthRegister } from '../modules/useAuthRegister'

import LayoutDefault from '../layouts/LayoutDefault.vue'
import FormTextInput from '../components/FormTextInput.vue'

import UserApi from '../api/User'

export default defineComponent({
  name: 'AuthMe',
  components: {
    LayoutDefault,
    FormTextInput
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)

    const { name, email, updateMyInfo } = inject(UseAuthMeKey, authMeDefault)
    const { userForm, onFormUpdate, validate } = useAuthRegister({ loader, toasting })

    const onSubmit = async () => {
      validate()

      if (Object.values(userForm).every((value) => value.errorMessage === '')) {
        loader.displayLoader(true)
        const params = {
          name: userForm.name.text,
          email: userForm.email.text,
          password: userForm.password.text
        }
        const result = await new UserApi().update(params)
        loader.displayLoader(false)
        if (result.succeed) {
          toasting.displayToasting({ shouldBeVisible: true, message: 'Profile successfully updated.', isError: false })
          updateMyInfo({ isAuthenticated: true, name: result.data.name, email: result.data.email })
        } else {
          toasting.displayToasting({ shouldBeVisible: true, message: 'Updating failed.', isError: true }) // TODO: proper error handling with server response
        }
      }
    }

    onMounted(() => {
      onFormUpdate({ key: 'name', value: name.value })
      onFormUpdate({ key: 'email', value: email.value })
    })

    return {
      userForm,

      onFormUpdate,
      onSubmit
    }
  }
})
</script>
