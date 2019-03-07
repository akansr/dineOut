<template>
  <div>
    <h4>{{ msg }}</h4>
    <form>
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="input.username" required autofocus>
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="input.password" required>
      </div>
      <div>
        <button type="submit" @click="handleRegister">Register</button>
        <router-link to="/" tag="button">Back To Login</router-link>
      </div>
    </form>
  </div>
</template>

<script src="./Register.js"></script>
