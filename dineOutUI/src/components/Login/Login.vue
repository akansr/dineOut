<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" name="username" v-model="input.username" placeholder="Username" />
    <input type="password" name="password" v-model="input.password" placeholder="Password" />
    <button type="button" @click="handleLogin">Login</button>
    <router-link to="/register" tag="button">New User</router-link>

  </div>
</template>

<script src="./Login.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Login.css"></style>
