<template>
  <div class="home">
    <h1>New Recipe</h1>
    <div>
      title: <input type="text" v-model="title">
      chef: <input type="text" v-model="chef">
      ingredients: <input type="text" v-model="ingredients">
      directions: <input type="text" v-model="directions">
      prep_time: <input type="text" v-model="prep_time">
      image_url: <input type="text" v-model="image_url">
      <button v-on:click="createRecipe()">Create recipe</button>
    </div>
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
      recipes: [],
      title: "",
      chef: "",
      ingredients: "",
      directions: "",
      prep_time: "",
      image_url: ""
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
  methods: {
    createRecipe: function() {
      var params = {
        input_title: this.title,
        input_chef: this.chef,
        input_ingredients: this.ingredients,
        input_directions: this.directions,
        prep_time: this.prep_time,
        input_image_url: this.image_url
      };
      axios.post("http://localhost:3000/api/v1/recipes", params).then(
        function(response) {
          console.log("the response is", response);
          this.recipes.push(response.data);
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
