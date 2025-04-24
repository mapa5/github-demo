import { createRouter, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';

// import TodoList from '../components/TodoList.vue';
import CrazyCountDown from '../components/CrazyCountDown.vue';
import Home from '../components/Home.vue';
import WhatIsMyLocation from '../components/WhatIsMyLocation.vue';
import TheForm from '../components/TheForm.vue';

export const router = setupRouter();

function setupRouter(): Router {
	const routes: RouteRecordRaw[] = [
    {
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/todo',
			name: 'todo',
			// component: TodoList,
			component: () => import('../components/TodoList.vue')
		},
		{
			path: '/location',
			name: 'location',
			component: WhatIsMyLocation,
		},
		{
			path: '/crazyCountDown',
			name: 'crazyCountDown',
			component: CrazyCountDown,
		},
		{
			path: '/theForm',
			name: 'theForm',
			component: TheForm,
		},
		{
			path: '/periodic',
			name: 'periodic',
			component: () => import('../components/PeriodicElementTable.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: { name: 'home' },
		},
	];

	const router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes,
		// Reset position to top page on navigation change
		scrollBehavior() {
			return { top: 0, left: 0 };
		},
	});

	return router;
}
