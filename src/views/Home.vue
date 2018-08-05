<template>
  <div class="home">
    <h1>Recipes</h1>
    <div v-for="recipe in recipes">
      <h2>{{ recipe.title }}</h2>
      <h4>{{ recipe.chef }}</h4>
      <p>{{ recipe.ingredients }}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");
// import axios from "axios";

export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/v1/recipes").then(
      function(response) {
        console.log(response);
        this.recipes = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>
