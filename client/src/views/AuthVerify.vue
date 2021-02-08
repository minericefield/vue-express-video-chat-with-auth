<template>
  <div class="auth-verify">
    <h3 class="mb-4">
      Verification completed!
    </h3>

    <router-link 
      to="/"
    >
      <button @click="onSubmit" class="btn btn-primary">
        Start Application
      </button>
    </router-link>
  </div>
</template>
