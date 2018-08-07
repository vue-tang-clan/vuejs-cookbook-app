<template>
  <div class="recipes-show">
    <div class="container">
      <h2>{{ recipe.title }}</h2>
      <p>{{ recipe.ingredients }}</p>
      <p>{{ recipe.directions }}</p>
      <a href="/#/">Back to all recipes</a>
    </div>
  </div>
</template>

<script>
var axios = require("axios");
// import axios from "axios";

export default {
  data: function() {
    return {
      recipe: {},
      errors: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/api/v1/recipes/" + this.$route.params.id)
      .then(response => {
        console.log(response);
        this.recipe = response.data;
      });
  }
};
</script>
