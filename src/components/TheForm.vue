<template>
  <header class="text-center">
    <h1>The Form</h1>
  </header>
  <section>
    <form id="TheRawForm">
      <div id="rfGroup">
        <h1>Raw Form :</h1>
        <label for="rf01_raw_text">First Name</label>
        <input type="text" name="rf01_raw_text" minlength="3" maxlength="10" required ><br>
        <label for="rf02_raw_text">Last Name</label>
        <input type="text" name="rf02_raw_text" required><br>
        <button  type="submit" data-cy="raw-submit">Submit</button>
      </div>
    </form>

    
    <v-form 
      id="theForm"
      ref="form"
      v-model="valid"
      lazy-validation>
      <h1>Wrapped Form :</h1>
      <v-text-field label="First Name" v-model="f01_text" data-cy="f01_text" :rules="f01_text_rules"></v-text-field>    <!-- John -->
      <v-text-field label="Last Name"  v-model="f02_text" data-cy="f02_text" :rules="f02_text_rules"></v-text-field>    <!-- Snow -->
      <v-textarea   label="Address"    v-model="f03_area" data-cy="f03_area" :rules="f03_area_rules"></v-textarea>      <!-- 
                                                                                                                          En haut du mur
                                                                                                                          À la garde de nuit
                                                                                                                          2019 Winterfell
                                                                                                                        -->
      <div  class="pickers d-flex">
        <v-color-picker id="f04_color" class="mr-5" v-model="f04_color" elevation="0" mode="hex"></v-color-picker>  <!-- #007007 -->
        <v-date-picker id="f05_date" color="primary" v-model="f05_date" ></v-date-picker>                         <!-- 19 Mai 2019 -->
      </div>
      <v-number-input class="mt-5" label="Age" v-model="f06_number" data-cy="f06_number" :rules="f06_number_rule" ></v-number-input>    <!-- 21 -->
      <h2>Choose some proverbs (take care of real value)</h2> <!-- B, C -->
      <v-checkbox v-model="f07_checkboxes" label="A. Winter is coming !" value="bad_1" ></v-checkbox>
      <v-checkbox v-model="f07_checkboxes" label="B. Winter is coming !" value="good_1" :rules="f07_checkboxes_rule"></v-checkbox>
      <v-checkbox v-model="f07_checkboxes" label="C. Lannisters always pay their debts" value="good_2" :rules="f07_checkboxes_rule"></v-checkbox>
      <v-checkbox v-model="f07_checkboxes" label="D. Obi-Wan Kenobi" value="bad_2" ></v-checkbox>

      <v-text-field v-model="f08_email" label="Email address" placeholder="Your Email" type="email" data-cy="f08_email" :rules="f08_email_rule"></v-text-field> <!--  john.snow@winterfell.com -->
      <v-text-field v-model="f09_password" label="Password" placeholder="Your Password" type="password" data-cy="f09_password" :rules="f09_email_rule"></v-text-field> <!--  Live Free Or Die -->
       
      <div class="float-right mb-10" >
        <v-btn class="mr-5" color="error" @click="reset">Reset</v-btn> 
        <v-btn color="success" @click="validate">Validate</v-btn>
      </div>
    </v-form>
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

  let snackbarColor = '';
  let snackbarVisibility = ref(false);
  let snackbarText = '';
  let valid = false;
  let f01_text = ref("");
  let f02_text = ref("");
  let f03_area = ref("");
  let f04_color = ref("");
  let f05_date = ref(new Date());
  let f06_number = ref(0);
  let f07_checkboxes = ref([]);
  let f08_email = ref("");
  let f09_password = ref("");
  let form = ref();

  let f01_text_rules = [
    (v:string) => !!v                  || 'The first name should not be empty',
    (v:string) => (v && v.length >= 3) || 'The first name must be 3 characters or more',
    (v:string) => (v === 'John')       || 'The first name should be equal to John.'
  ];

  let f02_text_rules = [
    (v:string) => (v === 'Snow')       || 'The last name should be equal to Snow.'
  ];

  let f03_area_rules = [
    (v:string) => (v === 'En haut du mur\nÀ la garde de nuit\n2019 Winterfell')       || `1st line: En haut du mur, 2nd: À la garde de nuit, 3rd: 2019 Winterfell`
  ];

  let f06_number_rule = [
    (v:number) => (v === 21)       || `The age should be 21`
  ];

  let f07_checkboxes_rule = [
  (v:string[]) => {
      let allGood = true;
      if (v?.length === 2) {
        v.forEach((choice:string) => { if (!choice.startsWith('good')) allGood = false });
      }
      return (v?.length === 2 && allGood) || `The good answers are B and C.`
    }
  ];

  let f08_email_rule = [
    (v:string) => (v === 'john.snow@winterfell.com')       || `The email should be john.snow@winterfell.com`
  ];

  let f09_email_rule = [
    (v:string) => (v === 'Live Free Or Die')       || `The password should be 'Live Free Or Die'`
  ]

  async function validate() {
    const {valid} = await form.value.validate();
    if (valid) {
      snackbarText = 'You WIN !!';
      snackbarColor = 'success';
    } else {
      snackbarText = 'You LOOSE !!';
      snackbarColor = 'error';
    };
    snackbarVisibility.value = true;
  }

  function reset() {
    form.value.reset();
  }
</script>

<style scoped>
 form {
  width: 50%;
  margin: auto auto;
  padding-top: 2em;
 }
/*  */
 label {
  margin-right: 2em;
 }

 #rfGroup {
  width: fit-content;
  margin-bottom: 5em;
 }

 #TheRawForm input {
  background-color: #252525;
  margin: 5px 0px;
 }

 #TheRawForm button {
  background-color: #252525;
  padding: 10px;
  align-self: center;
  border-radius: 10px;
  float: right;  
 }

 #TheRawForm button:hover {
  background-color: #383838;
 }

</style>
