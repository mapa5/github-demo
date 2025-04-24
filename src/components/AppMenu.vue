<template>
	<v-app-bar :elevation="5" density="comfortable" app>
		<router-link to="/home" class="mx-3">Home</router-link>
		<router-link to="/todo" class="mx-3">TodoList</router-link>
		<router-link to="/location" class="mx-3">Location</router-link>
		<router-link to="/crazyCountDown" class="mx-3">Count Down</router-link>
		<router-link to="/theForm" class="mx-3">The Form</router-link>
		<router-link to="/Periodic" class="mx-3">Periodic</router-link>
		<v-spacer></v-spacer>
		<DarkModeBtn />		
	</v-app-bar>
</template>

<script setup lang="ts">
	import DarkModeBtn from './DarkModeBtn.vue';
</script>

<style scoped>

</style>
