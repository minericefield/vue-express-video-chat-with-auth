<template>
  <div class="auth-register p-5">
    <h2 class="mb-2">
      Register
    </h2>

    <router-link 
      to="/login"
      class="d-flex justify-content-end mb-2 font-weight-bold text-info under-lined cursor-pointer"
    >
      Go back to login
    </router-link>

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
        Register
      </button>
    </div>

    <p
      @click="isResendEmailModalVisible = true"
      class="mt-4 mb-0 font-weight-bold text-info text-center under-lined cursor-pointer"
    >
      Resend email
    </p>

    <resend-email-modal
      v-if="isResendEmailModalVisible"
      :default-email="userForm.email.text"
      @on-submit="isResendEmailModalVisible = false, resendEmail($event)"
      @on-cancel="isResendEmailModalVisible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { useAuthRegister } from '../modules/useAuthRegister'

import FormTextInput from '../components/FormTextInput.vue'
import ResendEmailModal from '../components/ResendEmailModal.vue'

export default defineComponent({
  name: 'AuthRegister',
  components: {
    FormTextInput,
    ResendEmailModal
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)

    const isResendEmailModalVisible = ref(false)

    const { userForm, onFormUpdate, onSubmit, resendEmail } = useAuthRegister({ loader, toasting })

    return {
      userForm,
      isResendEmailModalVisible,

      onFormUpdate,
      onSubmit,
      resendEmail
    }
  }
})
</script>
