<template>
  <div class="form-group">
    <label
      :for="target"
    >
      {{ label }}
    </label>
    <input
      :value="text"
      :type="type"
      :id="target"
      :placeholder="placeholder"
      :class="{ 'border-danger': errorMessage }"
      class="form-control"
      @input.prevent="$emit('on-update', $event.target.value)"
    />
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
    text: { // with value bind, event would be called twice some how...
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
