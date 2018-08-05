<template>
  <div class="home">
    <h1>New Recipe</h1>
    <ul>
      <li v-for="error in errors" class="error">
        {{ error }}
      </li>
    </ul>
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
      <div>
        Updated title: <input type="text" v-model="updatedTitle">
        <button v-on:click="updateRecipe(recipe)">Update recipe title</button>
      </div>
      <div>
        <button v-on:click="deleteRecipe(recipe)">Delete recipe</button>
      </div>
    </div>
  </div>
</template>

<style>
.error {
  color: red;
}
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
      image_url: "",
      updatedTitle: "",
      errors: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/v1/recipes").then(response => {
      console.log(response);
      this.recipes = response.data;
    });
  },
  methods: {
    createRecipe: function() {
      this.errors = [];
      var params = {
        input_title: this.title,
        input_chef: this.chef,
        input_ingredients: this.ingredients,
        input_directions: this.directions,
        prep_time: this.prep_time,
        input_image_url: this.image_url
      };
      axios
        .post("http://localhost:3000/api/v1/recipes", params)
        .then(response => {
          console.log("the response is", response);
          this.recipes.push(response.data);
        })
        .catch(error => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    updateRecipe: function(inputRecipe) {
      console.log(this.updatedTitle, inputRecipe.id);
      var params = {
        title: this.updatedTitle
      };
      axios
        .patch("http://localhost:3000/api/v1/recipes/" + inputRecipe.id, params)
        .then(response => {
          console.log(response.data);
          inputRecipe.title = response.data.title;
        });
    },
    deleteRecipe: function(inputRecipe) {
      axios
        .delete("http://localhost:3000/api/v1/recipes/" + inputRecipe.id)
        .then(response => {
          console.log(response.data);
          var index = this.recipes.indexOf(inputRecipe);
          this.recipes.splice(index, 1);
        });
    }
  },
  computed: {}
};
</script>
