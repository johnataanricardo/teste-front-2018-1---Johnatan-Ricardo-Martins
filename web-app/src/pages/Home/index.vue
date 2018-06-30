<template>
  <div id="home">
    <Menu/>    
    <div class="form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex xs12>
            <v-text-field 
              v-model="username" 
              v-on:keyup.enter="findUser"
              color="red" 
              label="Pesquisar usuário" 
              :rules="usernameRules"            
              :append-icon="'search'"
              :append-icon-cb="findUser"
              required>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </div>
    <Card ref="card" @click="openDialog"/>
    <Dialog ref="dialog"/>
    <v-snackbar
      :timeout="6000"
      :bottom="true"
      v-model="snackbar">
        {{text}}
      <v-btn flat color="red" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Card from './Card'
import Dialog from './Dialog'
import axios from 'axios'

const api = 'https://api.github.com/users/'

export default {
  name: 'Home', 
  components: { Menu, Card, Dialog },
  data: () => ({
    valid: true,
    username: '',
    text: 'Usuário não encontrado!',
    snackbar: false,
    usernameRules: [
      v => !!v || 'É necessário informar um usuário'
    ],
  }),
  methods: {
    findUser() {      
      if (this.$refs.form.validate()) {
        const data = this
        const card = this.$refs.card
        axios.get(api + this.username).then(response => (      
          card.show = true,
          card.imageUrl = response.data.avatar_url,
          card.name = response.data.name,
          card.location = response.data.location,
          card.bio = response.data.bio
        )).catch(function (error) {
          if (error.response.status == 404) {
            card.show = false
            data.snackbar = true
          }
        })
      }
    },
    openDialog() {
      const dialog = this.$refs.dialog
      const data = this
      axios.get(api + this.username + '/repos').then(response => (      
          dialog.show = true,
          dialog.repositories = response.data
      )).catch(function (error) {
        if (error.response.status == 404) {
            dialog.show = false
          }
      })
    }
  }
}
</script>

<style scoped>

  .form {
    padding: 2% 40% 2% 40%;
  }

  .title {
    margin-top: 2%
  }

  @media screen and (max-width: 1200px) {
    .form {
      padding: 5% 30% 2% 30%;
    }
  }

  @media screen and (max-width: 600px)  {
    .form {
      padding: 5% 10% 2% 10%;
    }
  }

</style>