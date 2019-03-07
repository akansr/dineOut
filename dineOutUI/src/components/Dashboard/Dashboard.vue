<template>
  <div class="hello">
    <h1>Search for restaurants</h1>
    <input type="text" name="keyword" v-model="input.keyword" placeholder="keyword" />
    <input type="text" name="location" v-model="input.location" placeholder="location" />
    <button type="button" @click="handleSearch">Search</button>
    <button type="button" @click="handleLogout">Log Out</button>

    <ul id="restaurants">
      <li v-for="restaurant in restaurants" v-bind:key="restaurant.name">
        <strong>{{ restaurant.name }}</strong>
        <small>Rating:{{ restaurant.rating }}</small>
        <small>Polarity:{{ restaurant.score }}</small>
        <small v-if="restaurant.likes > 0">{{ restaurant.likes }} yays.</small>
        <small v-if="restaurant.dislikes > 0">{{ restaurant.dislikes }} nays.</small>
        <button type="button" @click="handleVisit(restaurant.place_id)">visit</button>
        <button type="button" @click="handleLike(restaurant.place_id)">like</button>
        <button type="button" @click="handleDislike(restaurant.place_id)">dislike</button>
      </li>
    </ul>
    <ul id="history">
      <p>Your History</p>
      <li v-for="each in history" v-bind:key="each.placeId">
        <strong>{{each.name}}</strong>
        <small v-if="each.like">You like it!</small>
        <small v-if="each.dislike">You did not like it</small>
      </li>
    </ul>
  </div>
</template>

<script src="./Dashboard.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./Dashboard.css"></style>
