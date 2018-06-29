<template>
  <div id="card">
    <v-card ref="card" v-show="show">
      <v-card-media
        :src="imageUrl"
        height="300px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <div class="headline">{{ name }}</div>
          <span class="grey--text">{{ location }}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat>Anotar</v-btn>
        <v-btn flat color="red" @click="openDialog">Repositórios</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.native="showText = !showText">
          <v-icon>{{ showText ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="showText">
          {{ bio }}
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Card', 
  data: () => ({
    show: false,
    showText: false,
    imageUrl: '',
    name: '',
    location: '',
    bio: ''
  }),
  methods: {
    openDialog() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>

  #card {
    padding: 2% 30% 2% 30%;
  }

  .image {
    height: 400px;
  }

  @media screen and (max-width: 600px)  {
    #card {
      padding: 5% 10% 2% 10%;
    }
  }

</style>