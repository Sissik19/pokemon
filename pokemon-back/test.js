const express = require('express')
// Remove verbose later
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const request = require('request');

// Get data from pokeAPI

function getAllData() {
    request('https://pokeapi.co/api/v2/pokemon?limit=2', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const obj = JSON.parse(body);
            const listPokemon = obj.results;
            let textPokemons = '';
            return Promise.resolve(
                function (resolve, reject) {
                    listPokemon.forEach(poke => {
                        request(poke.url, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                const pokemon = JSON.parse(body);
                                textPokemons = textPokemons + "(" + pokemon.id + ", '" + pokemon.name + "', '" + pokemon.height + "', '" + pokemon.weight + "'), ";
                                console.log('Function' + textPokemons);
                            }
                        })
                    })
                    resolve(textPokemons);
                }
            )
        }
        else {
            console.log("Erreur à l'appel de PokeAPI");
        }
    })
}


// Connect to database
async function fillDatabase() {
    const textPokemons = await getAllData();
    console.log(textPokemons);
}

fillDatabase();

