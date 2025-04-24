<template>
	<v-btn :icon="themeModeIcon" title="Theme" @click="toggleThemeMode()"></v-btn>
</template>

<script setup lang="ts">
	import { onBeforeMount, computed } from 'vue';
	import { useTheme } from 'vuetify';

	const theme = useTheme();
	const themeModeIcon = computed(() => {
		return theme.global.current.value.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny';
	});

	onBeforeMount(() => {
		theme.global.name.value = 'dark';
	});

	function toggleThemeMode() {
		theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
	}
</script>
