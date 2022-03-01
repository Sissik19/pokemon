<script>
import axios from 'axios';
import PokemonDetail from './PokemonDetail.vue';
export default {
    components: {
        PokemonDetail
    },
    data() {
        return {
            pokemons: [],
            loading: false,
            errored: false
        }
    },
    created() {
        this.loading = true;
        this.pokemons = [];
        console.log("make call");
        axios
            .get(`http://localhost:8000/api/pokemons`)
            .then(response => {
                this.loading = false;
                this.pokemons = response.data;
                this.pokemons.forEach(element => {
                    element.open = false;
                    element.visited = false;
                });
            })
            .catch(error => {
                console.log(error);
                this.errored = true;
            });
    },
    methods: {
        open(pokemon) {
            pokemon.open = !pokemon.open;
            pokemon.visited = true;
        }
    }
}
</script>

<template>
    <div v-if="!loading" class="list">
        <li
            v-for="pokemon in pokemons"
            :class="[pokemon.type, 'li-pokemon']"
            @click="open(pokemon)"
        >
            <div class="div-pokemon">
                <img
                    :class="['icon-pokemon', 'background-' + pokemon.type, { 'visited': pokemon.visited }]"
                    :src="pokemon.icon"
                />
                <div class="center">
                    <span class="name">{{ pokemon.name }}</span>
                    <div v-if="pokemon.open">
                        <PokemonDetail :pokemon="pokemon"></PokemonDetail>
                    </div>
                </div>
            </div>
        </li>
    </div>
</template>

<style>
.li-pokemon {
    list-style: none;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.div-pokemon {
    display: flex;
    flex-direction: row;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: COlumn;
}

.name {
    font-size: 20px;
    text-transform: capitalize;
    width: 150px;
    font-weight: bold;
    font-family: cursive;
}

.icon-pokemon {
    border: 5px white solid;
    margin: 0 10px 5px 30px;
}

.grass {
    color: greenyellow;
}
.background-grass {
    background-color: greenyellow;
}

.fire {
    color: orange;
}
.background-fire {
    background-color: orange;
}

.water {
    color: rgb(98, 98, 240);
}
.background-water {
    background-color: rgb(98, 98, 240);
}
.bug {
    color: green;
}
.background-bug {
    background-color: green;
}
.normal {
    color: white;
}
.background-normal {
    background-color: white;
}

.visited {
    opacity: 0.6;
}
</style>