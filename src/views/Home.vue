<template>
  <div class="home container">
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
    <div>
      <button v-on:click="setSortAttribute('title')">Sort by title</button>
      <button v-on:click="setSortAttribute('chef')">Sort by chef</button>
    </div>
    Search: <input type="text" v-model="searchFilter" list="titles">
    <datalist id="titles">
      <option v-for="recipe in recipes">{{ recipe.title }}</option>
    </datalist>
    <div class="row">
      <div class="col-md-4" v-for="recipe in orderBy(filterBy(recipes, searchFilter, 'title'), sortAttribute, sortOrder)">

        <div class="card">
          <img class="card-img-top" v-bind:src="recipe.image" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }} - {{ recipe.chef }}</h5>
            <p class="card-text">
              Ingredients: {{ recipe.ingredients }}
              Directions: {{ recipe.directions}}
            </p>
            <a v-bind:href=" '/#/recipes/' + recipe.id "class="btn btn-primary">More info</a>

            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" v-on:click="currentRecipe = recipe">
              modal
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ currentRecipe.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ currentRecipe.chef }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
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
      currentRecipe: {},
      searchFilter: "",
      sortAttribute: "title",
      sortOrder: 1,
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
    },
    setSortAttribute: function(inputAttribute) {
      // if (this.sortOrder === 1) {
      //   this.sortOrder = -1;
      // } else {
      //   this.sortOrder = 1;
      // }
      this.sortOrder = this.sortOrder === 1 ? -1 : 1;
      this.sortAttribute = inputAttribute;
    }
  },
  computed: {}
};
</script>
