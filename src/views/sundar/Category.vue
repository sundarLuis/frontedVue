<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-snackbar v-model="snackbar">
            {{ message }}
            <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
          <h3>Tasks List</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Type something"
                v-model="search"
                single-line
                hide-details
                class
              ></v-text-field>

              <v-btn depressed outline icon fab dark color="primary" small @click="dialog = true">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="headers"
                :search="search"
                :items="categories"
                :rows-per-page-items="[5,15, 25, 50, { text: 'All', value: -1 }]"
                class="elevation-1"
                item-key="name"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.name_category }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="edit(props.item.id,props.item.name_category)"
                    >
                      <!-- @click="dialogEdit = true" -->
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="pink"
                      small
                      @click="deleted(props.item.id)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- Dialog -->
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <!-- navbar dialog -->
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Tasks</v-toolbar-title>
              <v-spacer></v-spacer>
              <!-- <v-toolbar-items>
                <v-btn dark flat type="submit">Save</v-btn>
              </v-toolbar-items>-->
            </v-toolbar>
            <!-- navbar dialog end-->

            <!--here data dialog -->
            <v-container>
              <v-form v-model="valid" v-on:submit.prevent="save">
                <v-layout wrap>
                  <v-flex row sm12>
                    <v-text-field
                      label="Name"
                      name="name"
                      v-model="name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex row sm12>
                    <v-btn type="submit" round color="primary" dark>Save</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
            <!--here data dialog END -->
          </v-card>
        </v-dialog>
        <!-- Dialog -->

        <!-- Dialog edit -->
        <v-dialog
          v-model="dialogEdit"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <!-- navbar dialog -->
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialogEdit = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Edit Category</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click="dialog = false">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- navbar dialog end-->

            <!--here data dialog -->
            <v-container>
              <v-form v-model="valid" v-on:submit.prevent="update">
                <v-layout wrap justify-space-between>
                  <v-flex d-flex lg12 sm12>
                    <v-text-field
                      label="Name Category"
                      v-model="name_edit"
                      :rules="nameRules"
                      required
                      outline
                    ></v-text-field>
                  </v-flex>
                  <v-flex row sm12>
                    <v-btn type="submit" round color="primary" dark>Save</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
            <!--here data dialog END -->
          </v-card>
        </v-dialog>
        <!-- Dialog -->
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import EventForm from "@/components/widgets/form/EventForm"
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic"
import { async } from "q"
export default {
  components: {
    EventForm,
    MiniStatistic
  },
  data() {
    return {
      snackbar: false,
      message: "",
      id_edit: "",
      name_edit: "",
      search: "",
      dialog: false,
      dialogEdit: false,
      notifications: false,
      sound: true,
      widgets: false,
      valid: false,
      name: "",
      nameRules: [v => !!v || "Name is required", v => v.length <= 70 || "Name must be less than 10 characters"],
      // items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Edit",
          value: ""
        },
        {
          text: "Delete",
          value: ""
        }
      ]
    }
  },
  computed: {
    ...mapState(["categories", "postCategories", "putCategories", "deleteCategories"])
  },
  methods: {
    // ...mapMutations(['']),
    ...mapActions(["getCategory", "postCategory", "putCategory", "deleteCategory"]),

    save: function() {
      this.postCategory(this.name)
      this.dialog = false
      this.message = this.postCategories.message
      this.snackbar = true
    },
    edit: function(id, name) {
      this.id_edit = id
      this.name_edit = name
      this.dialogEdit = true
    },
    update: function() {
      const params = {
        id: this.id_edit,
        name: this.name_edit
      }
      this.putCategory(params)
      this.dialogEdit = false
      this.message = this.putCategories.message
      this.snackbar = true
      // this.getCategory()
    },
    deleted: function(id) {
      const params = {
        id: id
      }
      this.deleteCategory(params)
      this.message = this.deleteCategories.message
      this.snackbar = true
      // this.getCategory()
    }
  },
  mounted() {
    this.getCategory()
  }
}
</script>
