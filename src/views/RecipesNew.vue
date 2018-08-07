<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>New Recipe</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Title:</label> 
          <input type="text" class="form-control" v-model="title">
        </div>
        <div class="form-group">
          <label>Chef:</label>
          <input type="text" class="form-control" v-model="chef">
        </div>
        <div class="form-group">
          <label>Ingredients:</label>
          <input type="text" class="form-control" v-model="ingredients">
        </div>
        <div class="form-group">
          <label>Directions:</label>
          <input type="text" class="form-control" v-model="directions">
        </div>
        <div class="form-group">
          <label>Prep time:</label>
          <input type="text" class="form-control" v-model="prepTime">
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="text" class="form-control" v-model="image">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      title: "",
      chef: "",
      ingredients: "",
      directions: "",
      prepTime: "",
      image: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        input_title: this.title,
        input_chef: this.chef,
        input_ingredients: this.ingredients,
        input_directions: this.directions,
        prep_time: this.prepTime,
        input_image_url: this.image
      };
      axios
        .post("http://localhost:3000/api/v1/recipes", params)
        .then(response => {
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
