<template>
  <div>
    <v-col  class="pr-3 pl-3 pb-16">
      <v-sheet style="background-color: #fdfdfd" class="rounded-lg">
        <v-app-bar class="rounded-t-lg elevation-1 " style="background-color: #fdfdfd">
          <v-spacer></v-spacer>

          <h3>{{title}}</h3>
          <v-spacer></v-spacer>
        </v-app-bar>

        <v-col class="pl-10 pr-10">
          <v-text-field

              v-model="search"
              append-icon="mdi-magnify"
              label="جستجو"
              :single-line="false"
              hide-details
              clearable
              hint
              :loading="false"
              :reverse="true"
          ></v-text-field>
        </v-col>

        <v-data-table v-if="showtable"
            :headers="headers"
            :items="typesTable"
            class="elevation-1 text-center"
            :search="search"
            :mobile-breakpoint="5"
            :hide-default-footer="true"

            :page.sync="page"
            :items-per-page="itemsPerPage"
            @page-count="pageCount = $event"

        >
          <template v-slot:top >
            <v-toolbar
                flat
            >
              <v-divider
                  class="mx-4"
                  inset
                  vertical
              ></v-divider>
              <v-spacer></v-spacer>

              <v-dialog
                  v-model="dialog"
                  max-width="500px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      dark
                      class="mb-3 mr-5 mt-8"
                      v-bind="attrs"
                      v-on="on"
                      small
                  >
                    افزودن ماهیت
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="justify-center" >
                    <span class="headline text-center">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form
                      ref="form"
                      v-model="valid"
                      lazy-validation
                      >
                        <v-row>

                          <v-col
                              cols="12"
                              sm="6"
                              md="12"

                          >
                            <v-text-field
                                v-model="editedItem.code"
                                label="کد"
                                :reverse="true"
                                :rules="codeRules"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              sm="6"
                              md="12"
                          >
                            <v-text-field
                                v-model="editedItem.name"
                                label="نام"
                                :reverse="true"
                                :rules="nameRules"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              sm="12"
                              md="12"
                              v-for="(error , key) in editErrors"
                              :key="key"

                          >
                            <v-alert
                                color="red "
                                dark
                                class="text-center reverse"
                            >
                              {{error[0]}}
                            </v-alert>
                          </v-col>

                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                      انصراف
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                    >
                      ذخیره
                    </v-btn>
                  </v-card-actions>

                </v-card>
              </v-dialog>

              <v-dialog v-model="dialogDelete" max-width="600px">
                <v-card>
                  <v-card-title class="headline">آیا مطمئن هستید که میخواهید این مورد را حذف کنید؟</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">انصراف</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">تایید</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                  <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      v-for="error in deletederror"
                      v-bind:key="error"
                  >
                    <v-alert
                        color="red "
                        dark
                        class="text-center reverse"
                    >
                      {{ error[0] }}
                    </v-alert>
                  </v-col>
                </v-card>
              </v-dialog>

            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>

            <v-icon
                small
                @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>


          </template>



        </v-data-table>

        <div class="text-center mt-5">
          <v-pagination
              v-model="page"
              :length="pageCount"
          ></v-pagination>
          <v-text-field
              reverse
              class=""
              :value="itemsPerPage"
              label="Items per page"
              type="number"
              min="-1"
              max="15"
              @input="itemsPerPage = parseInt($event, 10)"
          ></v-text-field>
        </div>

      </v-sheet>

    </v-col>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {mapActions} from "vuex/dist/vuex.mjs";

export default {
name: "TypeFraim",
  data(){
    return{
      typesTable : [],

      page: 1,
      pageCount: 0,
      itemsPerPage: 100,
      snackbarMessage : '',
      snackbar : false,
      deletederror : '',
      overlayZindex : '',
      editErrors : [],
      dialog: false,
      dialogDelete: false,
      search: '',
      overlay: false,
      showtable : false ,
      title : 'ماهیت',
      headers: [
        { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
        { text : 'name' , value: 'name' , align: 'center'} ,
        { text : 'code' , value: 'code' , align: 'center'} ,
       // { text : 'id'   , value: 'id'   , align: 'center'} ,
      ],
      editedIndex: -1,
      editedItem : {
        name: '',
        code: 0,
        id: 0,

      },
      defaultItem: {
        name: '',
        code: 0,
        id: 0,

      },

      valid : true ,

      codeRules: [
        v => !!v || 'کد الزامی است',
        v => !isNaN(v) || 'لطفا کد را به صورت عدد وارد نمایید'
      ],

      nameRules: [
        v => !!v || 'نام الزامی است',
      ],
    }
  },
  computed: {

    ...mapGetters({
      getTypes : 'TypeModul/getTypes',
    }),

    formTitle () {
      return this.editedIndex === -1 ? 'افزودن ماهیت' : 'ویرایش ماهیت'
    },
  },
  methods : {
    initialize () {
      this.clearSnackbar()
      this.setOverlayStatus(true);
      this.retriveTypes()
          .then(response => {
            console.log(response)
            this.showtable = true
            this.setOverlayStatus(false);
            this.typesTable = response
          }).catch(status => {
        if (status == '401'){
          alert('شخص دیگری با اکانت شما وارد شده است')
          //this.$router.push({name : 'LoginFraim'})
        }
      })

    },

    ...mapActions({
      retriveTypes : 'TypeModul/retriveTypes',
      setOverlayStatus : 'GlobalModul/setOverlayStatus',
      deleteType : 'TypeModul/deleteType',
      setSnackbar : 'GlobalModul/setSnackbar',
      editType : 'TypeModul/editType',
      addType : 'TypeModul/addType',
      clearSnackbar : 'GlobalModul/clearSnackbar'
    }),

    deleteItemConfirm () {
      this.setOverlayStatus(true)
      this.deleteType(this.editedItem)
          .then(() => {
            this.typesTable.splice(this.editedIndex, 1)
            this.setOverlayStatus(false)
            this.setSnackbar({message : 'ماهیت با موفقیت حذف شد' , color : 'green'})
            this.closeDelete()
          })
          .catch(error => {
            console.log(error)
            if (error.response.status == '401')
            {
              alert('شخص دیگری با اکانت شما وارد شده است')
              this.setOverlayStatus(false)
              this.$router.push({name : 'Authenticate'})
            }
            this.closeDelete()

          })
    },   // ok

    editItem (item) {
      this.editedIndex = this.typesTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },        // ok

    deleteItem (item) {
      this.editedIndex = this.typesTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },      // ok

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.editErrors = [];

    },               // ok

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },          //ok

    save () {
      if(this.$refs.form.validate())
      {
          this.setOverlayStatus(true)

          if (this.editedIndex > -1)
          {
            this.editType(this.editedItem)
              .then(res => {
                console.log(res)
                this.setOverlayStatus(false)
                Object.assign(this.typesTable[this.editedIndex], this.editedItem)
                this.setSnackbar({message : 'ماهیت مورد نظر ویرایش شد' , color : 'green'}  )
                this.close()
              })
              .catch(err => {
                console.log(err)
                if(err.response.status == '422')
                {
                  console.log(err.response.data.errors)
                  this.editErrors = err.response.data.errors
                  this.setOverlayStatus(false)
                }else           if (err.response.status == '401')
                {
                  alert('شخص دیگری با اکانت شما وارد شده است')
                  this.setOverlayStatus(false)
                  this.$router.push({name : 'Authenticate'})
                }
                this.closeDelete()

              })
          }
          else
          {

            this.addType(this.editedItem)
              .then(res => {
                this.editedItem.id = res.data.data.id
                this.typesTable.push(this.editedItem)
                this.close()
                this.setSnackbar({message : 'ماهیت مورد نظر افزوده شد' , color : 'green'}  )
                this.setOverlayStatus(false)

              })
              .catch(err => {
                console.log(err)
                if(err.response.status == '422')
                {
                  console.log(err.response.data.errors)
                  this.editErrors = err.response.data.errors
                  this.setOverlayStatus(false)
                }else if (err.response.status == '401')
                {
                  alert('شخص دیگری با اکانت شما وارد شده است')
                  this.setOverlayStatus(false)
                  this.$router.push({name : 'Authenticate'})
                }
              })
          }

      }

    },


  },
  created() {



    this.initialize()

  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
}

</script>

<style scoped>

</style>