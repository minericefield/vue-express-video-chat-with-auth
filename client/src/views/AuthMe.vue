<template>
  <layout-default>
    <div class="auth-me">
      <nav class="navbar">
        <button
          @click="isAccountDeletionConfirmModalVisible = true"
          class="btn btn-danger ml-auto"
        >
          Delete Account
        </button>
      </nav>
      <div class="px-5 pb-5">
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
    </div>

    <teleport to="#modal-overlay">
      <confirm-modal
        v-if="isAccountDeletionConfirmModalVisible"
        title-text="Account Deletion"
        @on-cancel="isAccountDeletionConfirmModalVisible = false"
        @on-submit="deleteAccount"
      >
        Sure you want to delete your account?
      </confirm-modal>
    </teleport>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, ref, inject, onMounted } from 'vue'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { UseAuthMeKey, authMeDefault, useAuthMeForm } from '../modules/useAuthMe'

import LayoutDefault from '../layouts/LayoutDefault.vue'
import FormTextInput from '../components/FormTextInput.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default defineComponent({
  name: 'AuthMe',
  components: {
    LayoutDefault,
    FormTextInput,
    ConfirmModal
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)

    const { name, email, updateMyInfo, deleteAccount } = inject(UseAuthMeKey, authMeDefault)
    const { userForm, onFormUpdate, onSubmit: onSubmitAuthMeForm } = useAuthMeForm({ loader, toasting })

    const isAccountDeletionConfirmModalVisible = ref(false)

    const onSubmit = async () => {
      const result = await onSubmitAuthMeForm()
      if (result && result.succeed) updateMyInfo(true, result.data)
    }

    onMounted(() => {
      onFormUpdate({ key: 'name', value: name.value })
      onFormUpdate({ key: 'email', value: email.value })
    })

    return {
      userForm,
      isAccountDeletionConfirmModalVisible,

      onFormUpdate,
      onSubmit,
      deleteAccount
    }
  }
})
</script>
