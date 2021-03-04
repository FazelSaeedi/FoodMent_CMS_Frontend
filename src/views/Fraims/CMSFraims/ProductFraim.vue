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
              autofocus
              hint
              :loading="false"
              :reverse="true"
          ></v-text-field>
        </v-col>

        <v-data-table v-if="showtable"
                      :headers="headers"
                      :items="productsTable"
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
                  max-width="750px"
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
                    افزودن محصول
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="justify-center" >
                    <span class="headline text-center">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text
                  >
                    <v-container >
                      <v-row>

                        <v-col
                            cols="12"
                            sm="6"
                            md="6"


                        >
                          <v-text-field
                              v-model="editedItem.productcode"
                              label="کد"
                              :reverse="true"
                          ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="6"
                        >
                          <v-text-field
                              v-model="editedItem.productname"
                              label="نام"
                              :reverse="true"
                          ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="6"

                        >
                          <v-autocomplete
                              v-model="editedItem.type"
                              :items="typesTable"
                              chips
                              clearable
                              item-text="name"
                              item-value="name"
                              deletable-chips
                              return-object
                              label="ماهیت مورد نظر خود را جستجو کنید"
                              reverse
                          >


                            <template v-slot:no-data>
                              <v-list-item>
                                <v-list-item-title>
                                  <strong>ماهیت</strong>
                                  مورد نظر موجود نیست
                                </v-list-item-title>
                              </v-list-item>
                            </template>

                            <!--        <template v-slot:selection="{ attr, on, item, selected }">
                              <v-chip
                                  v-bind="attr"
                                  :input-value="selected"
                                  color="blue-grey"
                                  class="white&#45;&#45;text"
                                  v-on="on"
                              >
                                <v-icon left>
                                  mdi-bitcoin
                                </v-icon>
                                <span v-text="item.name"></span>
                              </v-chip>
                            </template>-->

                                    <template v-slot:item="{ item }" >
                                      <v-row >
                                        <v-col align="right">
                                          <v-list-item-content>
                                            <v-list-item-title v-text="item.name"></v-list-item-title>
                                            <v-list-item-subtitle v-text="item.code  +' : کد '"></v-list-item-subtitle>
                                          </v-list-item-content>
                                        </v-col>
                                      </v-row>

                                    </template>

                          </v-autocomplete>

                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="6"

                        >
                          <v-autocomplete
                              v-model="editedItem.maingroup"
                              :items="mainGroupsTable"
                              chips
                              clearable
                              item-text="name"
                              item-value="name"
                              deletable-chips
                              return-object
                              label="گروه اصلی مورد نظر خود را جستجو کنید"
                              reverse
                          >


                            <template v-slot:no-data>
                              <v-list-item>
                                <v-list-item-title>
                                  <strong>ماهیت</strong>
                                  مورد نظر موجود نیست
                                </v-list-item-title>
                              </v-list-item>
                            </template>

                            <!--        <template v-slot:selection="{ attr, on, item, selected }">
                              <v-chip
                                  v-bind="attr"
                                  :input-value="selected"
                                  color="blue-grey"
                                  class="white&#45;&#45;text"
                                  v-on="on"
                              >
                                <v-icon left>
                                  mdi-bitcoin
                                </v-icon>
                                <span v-text="item.name"></span>
                              </v-chip>
                            </template>-->

                            <template v-slot:item="{ item }" >
                              <v-row >
                                <v-col align="right">
                                  <v-list-item-content>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.code  +' : کد '"></v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                              </v-row>
                            </template>

                          </v-autocomplete>

                        </v-col>

                        <v-col
                            cols="12"
                            sm="6"
                            md="6"

                        >
                          <v-autocomplete
                              v-model="editedItem.subgroup"
                              :items="subGroupsTable"
                              chips
                              clearable
                              item-text="name"
                              item-value="name"
                              deletable-chips
                              return-object
                              label="گروه فرعی مورد نظر خود را جستجو کنید"
                              reverse
                          >


                            <template v-slot:no-data>
                              <v-list-item>
                                <v-list-item-title>
                                  <strong>ماهیت</strong>
                                  مورد نظر موجود نیست
                                </v-list-item-title>
                              </v-list-item>
                            </template>

                            <!--        <template v-slot:selection="{ attr, on, item, selected }">
                              <v-chip
                                  v-bind="attr"
                                  :input-value="selected"
                                  color="blue-grey"
                                  class="white&#45;&#45;text"
                                  v-on="on"
                              >
                                <v-icon left>
                                  mdi-bitcoin
                                </v-icon>
                                <span v-text="item.name"></span>
                              </v-chip>
                            </template>-->

                            <template v-slot:item="{ item }" >
                              <v-row >
                                <v-col align="right">
                                  <v-list-item-content>
                                    <v-list-item-title v-text="item.name"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.code  +' : کد '"></v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-col>
                              </v-row>
                            </template>

                          </v-autocomplete>
                        </v-col>

                        <v-col
                            cols="12"
                            sm="12"
                            md="6"
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
<!--          <template #item.type="{item}">{{item.typename}}</template>
          <template #item.maingroup="{item}">{{item.maingroupname}}</template>
          <template #item.subgroup="{item}">{{item.subgroupname}}</template>-->
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
  name: "ProductFraim",
  data(){
    return{
      productsTable : [
        // {code : '1' , name : 'name' ,type : 'type' , maingroup : 'maingroup' , subgroup : 'subgroup'},
      ],

      typesTable : [],
      mainGroupsTable : [],
      subGroupsTable : [],


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
      showtable : true ,
      title : 'محصولات',
      headers: [
        { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
        { text : 'subgroupname' , value: 'subgroupname' , align: 'center'} ,
        { text : 'maingroupname' , value: 'maingroupname' , align: 'center'} ,
        { text : 'typename' , value: 'typename' , align: 'center'} ,
        { text : 'productname' , value: 'productname' , align: 'center'} ,
        { text : 'productcode' , value: 'productcode' , align: 'center'} ,
        // { text : 'id'   , value: 'id'   , align: 'center'} ,
      ],
      editedIndex: -1,
      editedItem : {
        subgroup: {
          id : '',
          name : ''
        },
        maingroup: {
          id : '',
          name : ''
        },
        type: {
          id : '',
          name : ''
        },
        productcode: '',
        productname: '',
        productid: 0,
      },
      defaultItem: {
        subgroup: {
          id : '',
          name : ''
        },
        maingroup: {
          id : '',
          name : ''
        },
        type: {
          id : '',
          name : ''
        },
        productcode: '',
        productname: '',
        productid: 0,
      },
    }
  },
  computed: {

    ...mapGetters({
    }),

    formTitle () {
      return this.editedIndex === -1 ? 'افزودن محصول' : 'ویرایش محصول'
    },
  },
  methods : {
    initialize () {
      this.setOverlayStatus(true);

      this.retriveProducts()
          .then(response => {
            console.log(response)
            console.log('----------')
            this.showtable = true
            this.setOverlayStatus(false);
            this.productsTable = response
          }).catch(status => {
        if (status == '401'){
          alert('شخص دیگری با اکانت شما وارد شده است')
          this.$router.push({name : 'Authenticate'})
        }
      })

      this.retriveTypesFromStore()
      this.retriveMainGroupsFromStore()
      this.retriveSubGroupFromStore()
    },

    ...mapActions({
      setOverlayStatus : 'GlobalModul/setOverlayStatus',
      setSnackbar : 'GlobalModul/setSnackbar',
      clearSnackbar : 'GlobalModul/clearSnackbar',
      retriveTypes : 'TypeModul/retriveTypes',
      retriveMainGroup : 'MainGroupModul/retrivemainGroups',
      retriveSubGroup : 'SubGroupModul/retrivesubGroups',
      retriveProducts : 'ProductModul/retriveProducts',
      addProduct : 'ProductModul/addProduct',
      editProduct : 'ProductModul/editProduct',
      deleteProduct : 'ProductModul/deleteProduct'
    }),


    editItem (item) {

      this.editedIndex = this.productsTable.indexOf(item)
      this.editedItem = {
        subgroup: {
          id : item.subgroupid,
          name : item.subgroupname
        },
        maingroup: {
          id : item.maingroupid,
          name : item.maingroupname
        },
        type: {
          id : item.typeid,
          name : item.typename
        },
        productcode: item.productcode,
        productname:  item.productname,
        productid: item.productid,
      }
      this.dialog = true

    },        // ok

    deleteItem (item) {
      this.editedIndex = this.productsTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },       // ok

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.editErrors = [];

    },        // ok

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },        //ok

    deleteItemConfirm () {

      this.setOverlayStatus(true)
      this.deleteProduct(this.editedItem.productid)
        .then(res => {
          console.log(res)
          this.productsTable.splice(this.editedIndex, 1)
          this.setSnackbar({message : 'محصول با موفقیت حذف شد' , color : 'green'})
          this.setOverlayStatus(false)
          this.closeDelete()
        })
        .catch(err => {
          console.log(err)
          if(err.response.status == '422')
          {
            console.log(err.response.data.errors)
            this.editErrors = err.response.data.errors
            this.setOverlayStatus(false)
          }
          else if (err.response.status == '401')
          {
            alert('شخص دیگری با اکانت شما وارد شده است')
            this.setOverlayStatus(false)
            this.$router.push({name : 'Authenticate'})
          }

        })


    },       // ok

    save () {

      if (this.editedIndex > -1)
      {


        // todo : badan change shavad
        this.productsTable[this.editedIndex].typename = this.editedItem.type.name
        this.productsTable[this.editedIndex].typeid = this.editedItem.type.id
        this.productsTable[this.editedIndex].maingroupname = this.editedItem.maingroup.name
        this.productsTable[this.editedIndex].maingroupid = this.editedItem.maingroup.id
        this.productsTable[this.editedIndex].subgroupname = this.editedItem.subgroup.name
        this.productsTable[this.editedIndex].subgroupid = this.editedItem.subgroup.id

        this.editProduct(this.editedItem)
          .then(res => {
            console.log(res)
            Object.assign(this.productsTable[this.editedIndex], this.editedItem)
            this.setSnackbar({message : 'ماهیت مورد نظر ویرایش شد' , color : 'green'})
            this.close()
          })
            .catch(err => {
              console.log(err)
              if(err.response.status == '422')
              {
                console.log(err.response.data.errors)
                this.editErrors = err.response.data.errors
                this.setOverlayStatus(false)
              }
              else if (err.response.status == '401')
              {
                alert('شخص دیگری با اکانت شما وارد شده است')
                this.setOverlayStatus(false)
                this.$router.push({name : 'Authenticate'})
              }

            })



      }
      else
      {

        var NewItem = {
          typename       : this.editedItem.type.name,
          typeid         : this.editedItem.type.id,
          maingroupname  : this.editedItem.maingroup.name,
          maingroupid    : this.editedItem.maingroup.id,
          subgroupname   : this.editedItem.subgroup.name,
          subgroupid     : this.editedItem.subgroup.id,
          productname    : this.editedItem.productname ,
          productcode    : this.editedItem.productcode ,
          productid      : this.editedItem.productid ,
        }

        this.setOverlayStatus(true)

        this.addProduct(NewItem)
          .then(res =>  {
            console.log(res)
            NewItem.productid = res.data.data.id
            this.productsTable.push(NewItem)
            this.setSnackbar({message : 'محصول مورد نظر افزوده شد' , color : 'green'}  )
            this.setOverlayStatus(false)
            this.close()
          })
          .catch(err => {
                console.log(err)
                if(err.response.status == '422')
                {
                  console.log(err.response.data.errors)
                  this.editErrors = err.response.data.errors
                  this.setOverlayStatus(false)
                }
                else if (err.response.status == '401')
                {
                  alert('شخص دیگری با اکانت شما وارد شده است')
                  this.setOverlayStatus(false)
                  this.$router.push({name : 'Authenticate'})
                }

          })
      }

    },

    retriveTypesFromStore (){

        this.retriveTypes()
            .then(response => {
              console.log(response)
              //this.showtable = true
              //this.setOverlayStatus(false);
              this.typesTable = response
            }).catch(status => {
          if (status == '401'){
            alert('شخص دیگری با اکانت شما وارد شده است')
            //this.$router.push({name : 'LoginFraim'})
          }
        })

    },

    retriveMainGroupsFromStore(){
      this.retriveMainGroup()
          .then(response => {
            console.log(response)
            //this.showtable = true
            //this.setOverlayStatus(false);
            this.mainGroupsTable = response
          }).catch(status => {
        if (status == '401'){
          alert('شخص دیگری با اکانت شما وارد شده است')
          //this.$router.push({name : 'LoginFraim'})
        }
      })
    },

    retriveSubGroupFromStore(){

      this.retriveSubGroup()
          .then(response => {
            console.log(response)
            //this.showtable = true
            //this.setOverlayStatus(false);
            this.subGroupsTable = response
          }).catch(status => {
        if (status == '401'){
          alert('شخص دیگری با اکانت شما وارد شده است')
          //this.$router.push({name : 'LoginFraim'})
        }
      })
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