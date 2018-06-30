<template>
  <div id="annotationDialog">
    <v-dialog v-model="show" ref="annotationDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Anotações</span>
        </v-card-title>
        <v-textarea
          class="textArea"
          solo
          name="input-7-4"
          label="Anotar"
          v-model="annotation">
        </v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="show = false">Fechar</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveAnnotation">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog', 
  data () {
    return {
      show: false,
      annotation: ''
    }
  },
  methods: {
    saveAnnotation() {      
    }
  }
}
</script>

<style scoped>

  .textArea {
    padding: 1%
  }

  @media screen and (max-width: 600px)  {

  }

</style>