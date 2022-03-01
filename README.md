# Application Pokemon

## Installation/Explication du projet
Le projet se découpe en deux parties:

### Partie back

#### Installation
Dans un premier temps le serveur express avec *Node.js* et la BDD avec *Sqlite3*. Cette partie est contenu dans le dossier **pokemon-back**. Lors du premier lancement il est nécéssaire de faire un `npm install` afin de charger toutes les dépendances. Il est possible ensuite de simplement lancer le serveur avec `node app.js`. 

#### Explications
Lors du premier lancement, la BDD se remplira par elle-même en appelant l'API *pokeapi.co*. Le fichier *pokemon.db* sera créé avec les données récupérer de l'API dedans. Pour les appels API il y en aura un premier qui récupèrera les 20 premiers pokémons. Il y aura ensuite 20 appels à l'API pour récupérer chaque detail des pokémons et les enregistrer un par un dans le fichier. 

Le serveur sera lancé en parallèle et récupèreras les requêtes du front avec deux routes : /api/pokemons et /api/pokemon/:id *(la seconde ne sera pas utilisée dans ce projet)*. 

### Partie front
#### Installation
La partie front quant à elle est écrite avec *Vue.js*. Comme le back, au premier lancement il est nécessaire de faire un `npm install` pour télécharger toutes les dépendances. Par la suite il est possible de lancer le projet en mode dev avec `npm run dev`. Aucune autre solution n'a été mise en place pour une utilisation "production".

#### Explications
Trois fichiers *.vue* ont été créés : 
- **App.vue** : contient le titre de l'application ainsi que le premier component *PokemonList.vue*
- **PokemonList.vue** : appelle l'API du serveur Node grâce à Axios, enregistre dans une variable la liste de pokemons avec leurs détails pour les afficher avec leur image. Lors du clique sur un pokémon deux variables sont modifiées. La première permet de rendre légèrement moins opaques l'image du pokémon, signifiant qu'il a été consulté. La seconde variable permet d'ouvrir ou fermer le component *PokemonDetail.vue* en passant en paramètre le pokémon.
- **PokemonDetail.vue** : récupère le paramètre pokémon et affiche les infos de poids, taille et type.

## Blocages
- Ré-apprendre à utiliser Vue.js et Node.js
- Méthodes *async* sur le serveur Node.js
- Travailler sous Windows

## Amélioration futures
- Déployer le projet sur un PAAS
- Pour la partie back : ne pas récupérer les détails de chaque pokémon dès le départ mais seulement si la partie front les demande, ne pas requêter les informations d'un pokémon déjà dans la BDD
- Pour la partie front : pouvoir rechercher les pokémons, choisir le nombre de pokémon que l'on souhaite récupérer du back avec une pagination, tri des pokémons (par nom, type, poids, ...), améliorer le design.

