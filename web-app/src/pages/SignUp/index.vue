<template>
  <div id="signUp">
    <FormProfile ref='form' title="Inscrever-se" @click="onSave" :emailDisabled="false" :cleanButton="true"/>
  </div>
</template>

<script>
import FormProfile from '@/components/FormProfile'
import router from '@/router'
import axios from 'axios'

const api = process.env.API_URL

export default {
  name: 'SignUp',
  components: { 
    FormProfile
  },  
  data() {
    return {
    }
  },
  methods: {
    onSave: function (){
      const user = JSON.stringify(this.$refs.form.user)
      
      axios.post(api + '/user/new/' + user, { 
        headers: {        
          'Content-Type': 'application/json',
        }
      }).then(response => (
        localStorage.token = response.data.token == null ? '' : response.data.token
      )).catch(function (error) {
        console.log(error);
      })
      
      if (localStorage.token) {
        setTimeout( () => this.$router.push({ path: '/home'}), 100);
      } else {
        this.$refs.form.text = 'Email informado já está em uso.'
        this.$refs.form.snackbar = true
      }
    },
  }
}
</script>

<style scoped>

  @media screen and (max-width: 600px)  {

  }

</style>