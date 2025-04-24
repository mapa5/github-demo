<template>
  <header class="text-center">
    <h1>Todo List</h1>
    <v-img :src="imgNotepad" width="50" class="mx-auto mb-5" ></v-img>
  </header>
  <section class="text-center">
    <input class="mb-5" name="task-field" v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task" >
    <button class="add-task-btn" type="button" @click="addTask">Add</button>
    <table class="task-list">
      <tr v-for="(task, index) in tasks" :key="index" >
        <td><input type="checkbox" v-model="task.completed" /></td>
        <td><span   :data-cy="`task-name-${index}`" class="ml-2 mr-5" :class="{ completed: task.completed }">{{ task.text }}</span></td>
        <td><button :data-cy="`remove-task-${index}`" class="my-1" @click="removeTask(index)">❌</button></td>
      </tr>
    </table>
  </section>
  <v-snackbar 
    v-model="snackbar"
    color="#535bf2"
  >
    <div class="text-center">I'm special</div>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import imgNotepad from '@/assets/notepad.svg';

  interface Task {
    text: string;
    completed: boolean;
  }

  const newTask = ref<string>('');
  const tasks = ref<Task[]>([]);
  const snackbar = ref<boolean>(false);

  const addTask = () => {
    if (newTask.value.trim() !== '') {
      if (newTask.value.toLowerCase() === 'easter egg') {
        snackbar.value = true;
      }
      tasks.value.push({ text: newTask.value, completed: false });
      newTask.value = '';
    }
  };

  const removeTask = (index: number) => {
    tasks.value.splice(index, 1);
  };
</script>

<style scoped>
  .task-list {
    margin-left: auto;
    margin-right: auto;
  }

  .completed {
    text-decoration: line-through;
  }

  .add-task-btn {
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    will-change: box-shadow,transform;
    background: radial-gradient( 100% 100% at 100% 0%, #89E5FF 0%, #5468FF 100% );
    box-shadow: 0px 2px 4px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%), inset 0px -3px 0px rgb(58 65 111 / 50%);
    padding: 0 32px;
    margin-left: 10px;
    border-radius: 6px;
    color: #fff;
    height: 2em;
    font-size: 18px;
    text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
    transition: box-shadow 0.15s ease,transform 0.15s ease;
    :hover {
        box-shadow: 0px 4px 8px rgb(45 35 66 / 40%), 0px 7px 13px -3px rgb(45 35 66 / 30%), inset 0px -3px 0px #3c4fe0;
        transform: translateY(-2px);
    }
    :active{
        box-shadow: inset 0px 3px 7px #3c4fe0;
        transform: translateY(2px);
    }
  }
</style>
