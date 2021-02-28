<template>
  <div
    @click.self="onCancel"
    class="resend-email-modal modal d-flex align-items-center justify-content-center p-5 bg-overlay-color"
  >
    <transition
      name="resend-email-modal-content-fade"
      @after-leave="onLeft"
      appear
    >
      <div
        v-show="isModalContentVisible"
        class="modal-content mt-n4"
      >
        <div class="modal-header">
          <h5 class="modal-title">
            Resend Email
          </h5>
        </div>
        <div class="modal-body">
          <form-text-input
            :text="email"
            type="email"
            target="email"
            label="Email address"
            placeholder="Enter your email address"
            :errorMessage="errorMessage"
            @on-update="updateEmail"
          />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click.stop="onCancel"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.stop="onSubmit"
          >
            Resend
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'

import FormTextInput from './FormTextInput.vue'

import { isNotEmpty, isEmail } from '../services/validator'

export default defineComponent({
  name: 'ResendEmailModal',
  components: {
    FormTextInput
  },
  props: {
    defaultEmail: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const isModalContentVisible = ref(false)
    const action = ref('')
    const email = ref('')
    const errorMessage = ref('')
    const isValidationOnGoing = ref(false)

    onMounted(async () => {
      email.value = props.defaultEmail
      await nextTick()
      isModalContentVisible.value = true
    })

    const onLeft = ref(() => {
      //
    })
    const onCancel = () => {
      onLeft.value = () => { ctx.emit('on-cancel') }
      isModalContentVisible.value = false
    }

    const validate = () => {
      isValidationOnGoing.value = true
      errorMessage.value = isNotEmpty(email.value.trim()) || isEmail(email.value.trim())
      return !errorMessage.value
    }

    const updateEmail = (_email: string) => {
      email.value = _email
      if (isValidationOnGoing.value) validate()
    }

    const onSubmit = () => {
      if (validate()) {
        onLeft.value = () => { ctx.emit('on-submit', email) }
        isModalContentVisible.value = false
      }
    }

    return {
      isModalContentVisible,
      action,
      email,
      errorMessage,

      onLeft,
      updateEmail,
      onCancel,
      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.resend-email-modal-content-fade-enter-active,
.resend-email-modal-content-fade-leave-active {
  transition: all 0.5s ease;
}

.resend-email-modal-content-fade-enter-from,
.resend-email-modal-content-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}
</style>
