<template>
  <div class="user-form">
    <form-text-input
      :value="userForm.name"
      target="name"
      label="Your name"
      placeholder="Enter your name"
      :errorMesssage="errorMesssages.name"
      @input="$emit('on-form-update', { name: $event })"
    />
    <form-text-input
      :value="userForm.email"
      type="email"
      target="email"
      label="Email address"
      placeholder="Enter your email address"
      :errorMesssage="errorMesssages.email"
      @input="$emit('on-form-update', { email: $event })"
    />
    <form-text-input
      :value="userForm.password"
      type="password"
      target="password"
      label="Password"
      placeholder="Enter your password"
      :errorMesssage="errorMesssages.password"
      @input="$emit('on-form-update', { password: $event })"
    />

    <button @click="submit" class="btn btn-primary">Submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import FormTextInput from '../components/FormTextInput.vue'

import { UserForm } from '../types/user'
export default defineComponent({
  name: 'UserForm',
  components: {
    FormTextInput
  },
  props: {
    userForm: {
      type: Object as PropType<UserForm>,
      required: true
    }
  },
  setup (props, ctx) {
    let errorMessages: {[key: string]: string} = {}

    const validate = () => {
      errorMessages = {}

      const { name, email, password } = props.userForm
      if (name.trim() === '') {
        errorMessages.name = 'Please enter your name'
      }
      if (email.trim() === '') { // TODO: validation for email
        errorMessages.name = 'Please enter your email'
      }
      if (password.trim() === '') { // TODO: validation for password and confirmation
        errorMessages.password = 'Please enter your password'
      }
    }

    const onSubmit = () => {
      validate()

      if (Object.keys(errorMessages).length === 0) {
        ctx.emit('onSubmitSucceed')
      }
    }

    return {
      onSubmit
    }
  }
})
</script>
