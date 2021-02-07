<template>
  <div>
    <div>
      <router-link to="/">Top</router-link> |
      <router-link to="/communication/hash">Communication</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Regsiter</router-link> |
      <router-link to="/verify/hash">Vefiry</router-link> |
      <router-link to="/me">Me</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
