<script setup>
import PokemonList from "./components/PokemonList.vue";
</script>

<template>
  <header>
    <h1 class="title">
      <img class="logo-pokeball" src="./assets/pokeball.png" />
      Pokedex
      <img class="logo-pokeball" src="./assets/pokeball.png" />
    </h1>
  </header>

  <main>
    <PokemonList />
  </main>
</template>

<style>
@import "./assets/base.css";
.title {
  font-size: 50px;
  text-align: center;
  color: rgba(238, 39, 39, 0.877);
  margin: 20px 0 50px 0;
  font-family: cursive;
}

.logo-pokeball {
  height: 50px;
}
</style>
