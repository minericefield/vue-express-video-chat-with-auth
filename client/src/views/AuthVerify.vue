<template>
  <div class="auth-verify d-flex flex-column align-items-center justify-content-center p-5">
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
