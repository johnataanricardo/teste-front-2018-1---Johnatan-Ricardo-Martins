<template>
  <div id="dataTable">
    <v-data-table
      :headers="headers"
      :items="repositories"
      :rows-per-page-items="rowsPerPage"
      :rows-per-page-text="rowsPerPageText"
      :no-data-text="noDataText">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <v-btn flat color="red" :href="props.item.html_url" target="blank">IR</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>

const api = 'https://api.github.com/users/'

export default {
  name: 'DataTable', 
  props: ['userName', 'headers', 'repositories'],  
  data () {
    return {
      rowsPerPage: [5,10],
      rowsPerPageText: 'Items por página',
      noDataText: 'Desculpa, nenhum registro para ser apresentado!'
    }
  },
}
</script>

<style scoped>

  #dataTable {
    padding: 5%;
  }

  @media screen and (max-width: 600px)  {
    #dataTable {
      padding: 0%;
    }
  }

</style>