<template>
  <div class="list-table">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <!-- mini statistic start -->
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="fa fa-briefcase" title="100+" sub-title="Work" color="indigo"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="fa fa-graduation-cap" title="150+" sub-title="Study" color="red"></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic
            icon="fa fa-address-book"
            title="200+"
            sub-title="Personal"
            color="light-blue"
          ></mini-statistic>
        </v-flex>
        <v-flex lg3 sm6 xs12>
          <mini-statistic icon="fa fa-folder-open" title="50+" sub-title="Others" color="purple"></mini-statistic>
        </v-flex>
        <!-- mini statistic  end -->
        <v-flex sm12>
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
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[3,15, 25, 50, { text: 'All', value: -1 }]"
                class="elevation-1"
                item-key="name"
                select-all
                v-model="complex.selected"
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                  </td>
                  <!-- <td>
                    <v-avatar size="32">
                      <img :src="props.item.avatar" alt="" />
                    </v-avatar>
                  </td>-->
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.phone }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="dialogEdit = true"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn depressed outline icon fab dark color="pink" small>
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
              <v-toolbar-items>
                <v-btn dark flat @click="dialog = false">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- navbar dialog end-->

            <!--here data dialog -->
            <v-container >
              <v-form v-model="valid">
                <v-layout  wrap justify-space-between>
                  <v-flex d-flex lg12 sm12 >
                    <v-text-field
                      label="Name"
                      name="name"
                      v-model="name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex sm12 lg6 >
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="Category"
                      required
                    ></v-select>
                  </v-flex>
                   <v-flex d-flex sm12 lg5 >
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="State"
                      required
                    ></v-select>
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
              <v-toolbar-title>Edit Tasks</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn dark flat @click="dialogEdit = false">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- navbar dialog end-->

            <!--here data dialog -->
            <v-container >
                  <v-form v-model="valid">
                <v-layout  wrap justify-space-between>
                  <v-flex d-flex lg12 sm12 >
                    <v-text-field
                      label="Name"
                      name="name"
                      v-model="name"
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex d-flex sm12 lg6 >
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="Category"
                      required
                    ></v-select>
                  </v-flex>
                   <v-flex d-flex sm12 lg5 >
                    <v-select
                      v-model="select"
                      :items="items"
                      :rules="[v => !!v || 'Item is required']"
                      label="State"
                      required
                    ></v-select>
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
import { Items as Users } from "@/api/user"
import EventForm from "@/components/widgets/form/EventForm"
import MiniStatistic from "@/components/widgets/statistic/MiniStatistic"
export default {
  components: {
    EventForm,
    MiniStatistic
  },
  data() {
    return {

      search: "",
      dialog: false,
      dialogEdit:false,
      notifications: false,
      sound: true,
      widgets: false,
      valid:false,
      name:'',
      nameRules:[
        v => !!v || 'Name is required',
        v =>  v.length <= 70 || 'Name must be less than 10 characters'
      ],
        items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      complex: {
        selected: [],
        headers: [
          // {
          //   text: "Avatar",
          //   value: "avatar"
          // },
          {
            text: "Name",
            value: "name"
          },
          {
            text: "Category",
            value: "email"
          },
          {
            text: "State",
            value: "phone"
          },
          {
            text: "Edit",
            value: ""
          },
          {
            text: "Delete",
            value: ""
          }
        ],
        items: Users
      },
      basic: {
        headers: [
          {
            text: "Dessert (100g serving)",
            align: "left",
            sortable: false,
            value: "name"
          },
          { text: "Calories", value: "calories" },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" }
        ],
        items: [
          {
            value: false,
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%"
          },
          {
            value: false,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%"
          },
          {
            value: false,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%"
          },
          {
            value: false,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%"
          },
          {
            value: false,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%"
          },
          {
            value: false,
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%"
          },
          {
            value: false,
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%"
          },
          {
            value: false,
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%"
          },
          {
            value: false,
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%"
          },
          {
            value: false,
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%"
          }
        ]
      }
    }
  }
}
</script>
