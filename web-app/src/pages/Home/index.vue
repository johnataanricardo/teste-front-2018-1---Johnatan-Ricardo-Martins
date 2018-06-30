<template>
  <div id="home">
    <Menu/>    
    <div class="form">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-layout>
          <v-flex xs12>
            <v-text-field 
              v-model="userName" 
              v-on:keyup.enter="findUser"
              color="red" 
              label="Pesquisar usuário" 
              :rules="userNameRules"            
              :append-icon="'search'"
              @click:append="findUser"
              required>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </div>
    <Card ref="card"/>
    <AnnotationDialog ref="annotationDialog"/>
    <RepositoriesDialog ref="repositoriesDialog"/>
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
import Card from './components/Card'
import AnnotationDialog from './components/AnnotationDialog'
import RepositoriesDialog from './components/RepositoriesDialog'
import axios from 'axios'

const gitHubApi = 'https://api.github.com/users/'
const api = process.env.API_URL

export default {
  name: 'Home', 
  components: { Menu, Card, AnnotationDialog, RepositoriesDialog },
  data: () => ({
    valid: true,
    userName: '',
    text: '',
    snackbar: false,
    userNameRules: [
      v => !!v || 'É necessário informar um usuário'
    ],
  }),
  methods: {
    findUser() {      
      if (this.$refs.form.validate()) {
        const data = this
        const card = this.$refs.card        
        axios.get(gitHubApi + this.userName).then(response => (      
          card.show = true,
          card.imageUrl = response.data.avatar_url,
          card.name = response.data.name,
          card.location = response.data.location,
          card.bio = response.data.bio ? response.data.bio : 'Sem descrição!',
          card.openRepositoriesDialog = data.openRepositoriesDialog,
          card.openAnnotationDialog = data.openAnnotationDialog
        )).catch(function (error) {
          if (error.response.status == 404) {
            card.show = false
            data.text = 'Usuário não encontrado!'
            data.snackbar = true
          }
        })
      }
    },
    openRepositoriesDialog() {
      const repositoriesDialog = this.$refs.repositoriesDialog
      if (this.userName) {
        axios.get(gitHubApi + this.userName + '/repos').then(response => (      
          repositoriesDialog.show = true,
          repositoriesDialog.repositories = response.data
        )).catch(function (error) {
          if (error.response.status == 404) {
            repositoriesDialog.show = false
          }
        })
      } else {
        this.$refs.card.show = false
      }
    },
    openAnnotationDialog() {
      const data = this
      const token = 'Bearer ' + localStorage.getItem('token')
      const annotationDialog = this.$refs.annotationDialog
      if (this.userName) {
        axios.get(api + '/annotation/' + this.userName, { 
          headers: {        
            'Content-Type': 'application/json',
            'Authorization': token
          }
        }).then(response => {
          if (response.data) {
            annotationDialog.annotation = response.data.annotation
          } else {
            annotationDialog.annotation = ''
          }
          annotationDialog.show = true
          annotationDialog.saveAnnotation = data.saveAnnotation        
        }).catch(function (error) {
          console.log(error);
        })
      } else {
        this.$refs.card.show = false
      }
    },
    saveAnnotation() {
      const data = this
      const token = 'Bearer ' + localStorage.getItem('token');
      const headers = {        
        'Content-Type': 'application/json',
        'Authorization': token
      }

      const instance = axios.create({
        baseURL: api + '/annotation/',        
        headers: headers
      })

      const annotationDialog = this.$refs.annotationDialog
      const annotation = {
        annotation: annotationDialog.annotation,
        userName: data.userName
      }

      instance.post(JSON.stringify(annotation)).then(response => 
        annotationDialog.show = false,
        data.text = 'Anotação salva com sucesso!',
        data.snackbar = true
      )
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