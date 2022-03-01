<script>
export default {
    props: [
        'pokemon'
    ]
}
</script>

<template>
    <div class="row">
        <div class="column">
            <div>
                <span class="title-data">Weight :</span>
                {{ pokemon.weight / 10 }} kg
            </div>
            <div>
                <span class="title-data">Height :</span>
                {{ pokemon.height / 10 }} m
            </div>
        </div>
        <div class="column">
            <div>
                <span class="title-data">Type :</span>
                {{ pokemon.type }}
            </div>
        </div>
    </div>
</template>

<style>
.column {
    display: flex;
    flex-direction: column;
    margin: 10px;
    color: white;
}
.row {
    display: flex;
    flex-direction: row;
}

.title-data {
    font-weight: bold;
}
</style>