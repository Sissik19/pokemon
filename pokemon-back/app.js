const express = require('express')
// Remove verbose later
const sqlite3 = require('sqlite3').verbose();
const path = require("path");
const request = require('request');

// Connect to database
const db_name = path.join(__dirname, "data", "pokemon.db");
const db = new sqlite3.Database(db_name, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données 'pokemon.db'");
});

// Create request
const sql_create_pokemon_detail = `CREATE TABLE IF NOT EXISTS PokemonDetail (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    icon VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL
  );`;
const sql_select_pokemons = `SELECT * FROM PokemonDetail;`
const sql_select_pokemon_by_id = `SELECT * FROM PokemonDetail WHERE id=?`

db.run(sql_create_pokemon_detail, err => {
  if (err) {
    return console.error(err.message + '\n' + sql_create_pokemon_detail);
  } else {
    console.log("Création réussie de la table 'PokemonDetail'");
    // Get list of pokemon from pokeAPI
    request('https://pokeapi.co/api/v2/pokemon?limit=20', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const obj = JSON.parse(body);
        const listPokemon = obj.results;
        listPokemon.forEach(poke => {
          // Get details by pokemonID
          request(poke.url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              const pokemon = JSON.parse(body);
              let textPokemon = "(" + pokemon.id + ", '" + pokemon.name + "', '" + pokemon.height + "', '" + pokemon.weight + "', '" + pokemon.sprites.front_default + "', '" + pokemon.types[0].type.name + "')";
              let sql_insert = `INSERT INTO PokemonDetail (id, name, height, weight, icon, type) VALUES ` + textPokemon + `;`;
              console.log('Insert : ' + textPokemon);

              // Execute INSERT
              db.run(sql_insert, err => {
                if (err) {
                  return console.error(err.message + '\nRequête : ' + sql_insert);
                }
                console.log("Insertion dans la table 'PokemonDetail'");
              });

            } else {
              console.log("Erreur lors de l'appel à PokeAPI avec l'url : " + poke.url + "");
            }
          })
        })
      } else {
        console.log("Erreur à l'appel de PokeAPI");
      }
    })
  }
});


// Start express server
const app = express()
const port = 8000

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
})

app.get('/', (req, res) => {
  res.send("Bienvenue");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/pokemons', (req, res) => {
  console.log("Appel /api/pokemons ")
  db.all(sql_select_pokemons, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.send(rows)
  });
});

app.get('/api/pokemon/:id', (req, res) => {
  var params = [req.params.id]
  db.get(sql_select_pokemon_by_id, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.send(row);
  });
});
