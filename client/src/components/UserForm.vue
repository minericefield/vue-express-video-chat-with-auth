<template>
  <div class="user-form">
    <form-text-input
      :text="userForm.name"
      target="name"
      label="Your name"
      placeholder="Enter your name"
      :errorMessage="errorMessages.name"
      @onUpdate="$emit('on-form-update', { key: 'name', value: $event })"
    />
    <form-text-input
      :text="userForm.email"
      type="email"
      target="email"
      label="Email address"
      placeholder="Enter your email address"
      :errorMessage="errorMessages.email"
      @onUpdate="$emit('on-form-update', { key: 'email', value: $event })"
    />
    <form-text-input
      :text="userForm.password"
      type="password"
      target="password"
      label="Password"
      placeholder="Enter your password"
      :errorMessage="errorMessages.password"
      @onUpdate="$emit('on-form-update', { key: 'password', value: $event })"
    />

    <div class="text-center">
      <button @click="onSubmit" class="btn btn-primary">
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'

import { UserForm } from '../types/UserForm'
import FormTextInput from '../components/FormTextInput.vue'

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
    const errorMessages = reactive({
      name: '',
      email: '',
      password: ''
    })

    const validate = () => { // TODO: make validation module
      errorMessages.name = ''
      errorMessages.email = ''
      errorMessages.password = ''

      const { name, email, password } = props.userForm
      if (name.trim() === '') {
        errorMessages.name = 'Please enter your name'
      }
      if (email.trim() === '') { // TODO: validation for email
        errorMessages.email = 'Please enter your email'
      }
      if (password.trim() === '') { // TODO: validation for password and confirmation
        errorMessages.password = 'Please enter your password'
      }
    }

    const onSubmit = () => {
      validate()

      if (Object.values(errorMessages).every((value) => value === '')) {
        ctx.emit('on-submit-succeed')
      }
    }

    return {
      errorMessages,

      onSubmit
    }
  }
})
</script>
