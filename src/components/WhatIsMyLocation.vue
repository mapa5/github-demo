<template>
  <header class="text-center">
    <h1>What is my Location</h1>
  </header>
  <section class="text-center mt-10">
    <v-btn class="mx-5" @click="getCurrentPosition">GET POSITION</v-btn>
    <v-btn class="mx-5" @click="getRandomPosition">GET RANDOM</v-btn>
    <div class="what-is-my-location mt-5">
      Latitude: <span data-cy="latitude">{{ myLocation?.latitude  }}</span><br>
      Longitude: <span data-cy="longitude">{{ myLocation?.longitude }}</span>
    </div>
  </section>  
</template>

<script setup lang="ts">
  
  import { onMounted, ref } from 'vue';

  interface Position {
    latitude : number,
    longitude: number
  }
  const myLocation = ref<Position>();

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(function(position) {
      myLocation.value = { 
        latitude: position.coords.latitude,
        longitude: position.coords.longitude 
      };
    }, (err) => { console.log(err); });
  }

  const getRandomPosition = () => {
    myLocation.value = {
         // @ts-expect-error: New method over globalThis
        latitude: window.getRandomLatitude(),
         // @ts-expect-error: New method over globalThis
        longitude: window.getRandomLongitude()
    };
    return myLocation.value;
  }

  // Expose the function for testing (to not do in practice)
  onMounted(() => {
    // @ts-expect-error: New method over globalThis
    window.getRandomLatitude = () => {
      return Math.trunc((Math.random() * 180 - 90) * 10000)/10000;
    }
     // @ts-expect-error: New method over globalThis
    window.getRandomLongitude = () => {
      return Math.trunc((Math.random() * 360 - 180) * 10000)/10000;
    } 
  });

</script>

<style scoped>

</style>
