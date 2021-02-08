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
import { defineComponent, inject } from 'vue'

import { UseLoaderKey } from '../modules/useLoader'
import { UseToastingKey } from '../modules/useToasting'
import { useAuthRegister } from '../modules/useAuthRegister'

import FormTextInput from '../components/FormTextInput.vue'

export default defineComponent({
  name: 'AuthRegister',
  components: {
    FormTextInput
  },
  setup () {
    const loader = inject(UseLoaderKey)
    const toasting = inject(UseToastingKey)

    const { userForm, onFormUpdate, onSubmit } = useAuthRegister({ loader, toasting })

    return {
      userForm,

      onFormUpdate,
      onSubmit
    }
  }
})
</script>
