<template>
  <div id="dataTable">
    <v-data-table
      :headers="headers"
      :items="repositories">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.html_url }}</td>
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
    }
  },
}
</script>

<style scoped>

  #dataTable {
    padding: 10%;
  }

  @media screen and (max-width: 600px)  {
    #dataTable {
      padding: 0%;
    }
  }

</style>