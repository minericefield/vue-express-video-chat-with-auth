<template>
  <transition name="loader-fade">
    <div class="loader d-flex align-items-center justify-content-center fixed-top w-100 h-100">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.loader {
  // background-color: rgba($color: #FFF, $alpha: .8); 
}
.loader-fade-leave-to {
  opacity: 0;
}
.loader-fade-leave-active {
  transition: opacity ease .2s;
}
</style>
