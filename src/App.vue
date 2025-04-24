<template>
  <v-app>
    <v-main>
      <AppMenu />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import AppMenu from './components/AppMenu.vue';
</script>