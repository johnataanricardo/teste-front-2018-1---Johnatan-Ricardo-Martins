<template>
  <div id="home">
    <Menu/>    
    <div class="form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex xs12>
            <v-text-field 
              v-model="username" 
              color="red" 
              label="Pesquisar usuário" 
              :rules="usernameRules" 
              required
              :append-icon="'search'"
              :append-icon-cb="findUser">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </div>
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
import axios from 'axios'

const api = 'https://api.github.com/users/'

export default {
  name: 'Home', 
  components: { Menu },
  data: () => ({
    valid: true,
    username: '',
    text: 'Usuário não encontrado',
    snackbar: false,
    usernameRules: [
      v => !!v || 'É necessário informar um usuário'
    ],
  }),
  methods: {
    findUser() {      
      if (this.$refs.form.validate()) {
        const data = this
        axios.get(api + this.username).then(response => (      
          console.log(response)
        )).catch(function (error) {
          if (error.response.status == 404) {
            data.snackbar = true
          }
        })
      }
    }
  }
}
</script>

<style scoped>

  .form {
    padding: 2% 30% 2% 30%;
  }

  .title {
    margin-top: 2%
  }

  @media screen and (max-width: 600px)  {
    .form {
      padding: 5% 20% 2% 20%;
    }
  }

</style>