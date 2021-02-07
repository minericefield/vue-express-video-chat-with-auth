<template>
  <div class="form-group">
    <label
      :for="target"
    >
      {{ label }}
    </label>
    <input
      :value="value"
      :type="type"
      :id="target"
      :placeholder="placeholder"
      @input="$emit('input')"
      class="form-control"
      :class="{ 'border-danger': errorMessage }"
    >
    <p
      v-if="errorMessage"
      class="text-danger"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserForm',
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    target: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    }
  }
})
</script>
