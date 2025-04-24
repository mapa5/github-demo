<template>
  <header class="text-center">
    <h1>The Crazy Count Down</h1>    
  </header>
  <section class="text-center">
    <h2 class="countDown" data-cy="count-down">{{ countDown }}</h2>
    <v-btn v-if="gameState == gameStates.Init" @click="startGame()" >Start</v-btn>
    <v-btn data-cy="the-button" v-else @click="checkResult()" :disabled="gameState === gameStates.Stopped || checkDisabled" >
      Click on : <span data-cy="expected-value">{{ expectedNumber }}</span>
    </v-btn>

    <div class="mt-15 mb-5">
      <span class="text-h4 mx-5" style="vertical-align: middle;">{{ formattedTime() }}</span>
      <v-btn @click="resetGame()" :disabled="gameState === gameStates.Init" >Reset</v-btn>
    </div>
    <div>Score: <span data-cy="score" >{{ score }}</span> / <span data-cy="max-score">{{ maxScore }}</span></div>
    <div>Failed: <span data-cy="failed">{{ nbErrors }}</span> / {{ maxScore }}</div>
    <div v-if="Number(bestTime) > 0">Best Time: <span data-cy="best-time">{{ formatSeconds(bestTime) }} seconds</span></div>

  </section>
  <v-snackbar
    v-model="snackbarVisibility"
    :color="snackbarColor"
    :timeout=1000
  >
    <div class="text-center">{{ snackbarText }}</div>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const time = ref<number>(0);
  const countDown = ref<number>(0);

  enum gameStates {
    Init, Started, Stopped
  }

  let gameState = ref<gameStates>(gameStates.Init);

  let expectedNumber = ref(3);
  let score = 0;
  let nbErrors = 0;
  let checkDisabled = false;

  let snackbarColor = '';
  let snackbarVisibility = false;
  let snackbarText = '';

  let intervalChrono : number;
  let intervalCountDown : number;

  let bestTime = localStorage.getItem('CCD-BestTime') || '';

  const limit = 10;
  const maxScore = 3;

  const formattedTime = (() => {
    let centi = time.value % 100;
    let seconds = Math.floor(time.value / 100) % 60;
    let minutes = Math.floor(time.value / 6000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centi).padStart(2, '0')}`;
  });

  const formatSeconds = ((time:string) => {
    return `${Number(time) / 100}`;
  });

  const randomCountDown = (() => {
    countDown.value = Math.floor(Math.random()*limit);
  });

  function checkResult() {
    checkDisabled = true;

    if (countDown.value === expectedNumber.value) {
      setTimeout(() => {checkDisabled = false}, 250);
      score++;
      snackbarText = (score === maxScore)? 'YOU WIN !!' : 'Great (+1) !!';
      snackbarColor = 'success';
      expectedNumber.value = Math.floor(Math.random()*limit);
    } else {
      setTimeout(() => {checkDisabled = false}, 1500);
      nbErrors++;
      snackbarText = (nbErrors === maxScore)? 'YOU LOOSE !!' : 'Failed';
      snackbarColor = 'error';
    }
    snackbarVisibility = true;

    if (score === maxScore || nbErrors === maxScore) {
      stopGame();
    }

    if (score === maxScore) {
      if(! localStorage.getItem('CCD-BestTime') ) {
        localStorage.setItem('CCD-BestTime', time.value.toString());
        bestTime = time.value.toString();
      } else {
        if (Number(time.value) < Number(localStorage.getItem('CCD-BestTime'))) {
          localStorage.setItem('CCD-BestTime', time.value.toString());
          bestTime = time.value.toString();
        }
      }
    }
  }

  function startGame() {
    gameState.value = gameStates.Started
    intervalCountDown = setInterval(randomCountDown, 1000);
    intervalChrono = setInterval(() => {
      time.value++;
    }, 10);
  }

  function stopGame() {
    gameState.value = gameStates.Stopped
    clearInterval(intervalCountDown);
    clearInterval(intervalChrono);
  }

  function resetGame() {
    stopGame();
    time.value = 0;
    countDown.value = 0;
    gameState.value = gameStates.Init;
    score = 0;
    nbErrors = 0;
    expectedNumber.value = 3;
  }
</script>

<style scoped>
  .countDown {
    font-size: 8em;
    margin-top: 0.5em;
  }  
</style>
