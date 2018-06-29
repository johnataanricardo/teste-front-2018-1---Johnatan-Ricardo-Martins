<template>
  <div id="account">
    <Menu/>
    <FormProfile ref="form" title="Conta" @click="onSave" :emailDisabled="true" :cleanButton="false"/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import FormProfile from '@/components/FormProfile'
import axios from 'axios'

const api = process.env.API_URL

export default {
  name: 'Account',
  components: { 
    Menu,
    FormProfile
  },  
  data() {
    return {

    }
  },
  mounted () {
    const token = 'Bearer ' + localStorage.getItem('token');
    const fields = ''
    const user = this.$refs.form.user
    axios.get(api + '/user/' + JSON.stringify(fields), { 
      headers: {        
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(response => (      
      user.firstName = response.data[0].firstName,
      user.lastName = response.data[0].lastName,
      user.zip = response.data[0].zip,
      user.state = response.data[0].state,
      user.city = response.data[0].city,
      user.address = response.data[0].address,
      user.number = response.data[0].number,
      user.email = response.data[0].email,
      user.password = response.data[0].password,
      user.repeatPassword = response.data[0].password
    )).catch(function (error) {
      console.log(error);
    })
  },
  methods: {
    onSave: function (){
      const token = 'Bearer ' + localStorage.getItem('token');

      const headers = {        
        'Content-Type': 'application/json',
        'Authorization': token
      }

      const form = this.$refs.form
      const user = JSON.stringify(form.user)
      const instance = axios.create({
        baseURL: api + '/user/',        
        headers: headers
      });

      instance.post(user).then(response => 
        form.text = 'Salvo com sucesso!',
        form.snackbar = true
      );
    }
  }
}
</script>

<style scoped>

  @media screen and (max-width: 600px)  {

  }

</style>