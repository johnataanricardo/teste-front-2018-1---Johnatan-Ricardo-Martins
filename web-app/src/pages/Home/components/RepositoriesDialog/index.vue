<template>
  <div id="repositoriesDialog">
    <v-dialog
      ref="repositoriesDialog"
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable>
      <v-card tile>
        <v-toolbar card dark>
          <v-btn icon dark @click.native="show = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Repositórios</v-toolbar-title>
        </v-toolbar>
        <DataTable :headers="headers" :repositories="repositories"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DataTable from '../DataTable'

export default {
  name: 'RepositoriesDialog', 
  components: { DataTable },
  data () {
    return {
      show: false,
      userName: '',
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { 
          text: 'Descrição', 
          value: 'description',
          sortable: false,
        },
        { 
          text: 'Repositório', 
          value: 'html_url',
          sortable: false,
        },
      ],
      repositories: [],
    }
  }
}
</script>

<style scoped>

  @media screen and (max-width: 600px)  {

  }

</style>