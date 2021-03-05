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
                      :items="restrauntTable"
                      class="elevation-1 text-center"
                      :search="search"
                      :mobile-breakpoint="5"
                      :hide-default-footer="true"

                      :page.sync="page"
                      :items-per-page="itemsPerPage"
                      @page-count="pageCount = $event"

                      :single-expand="true"
                      show-expand



        >

          <template v-slot:expanded-item="{ headers, item }" @click="rowExpend()">
            <td :colspan="headers.length" align="center" >
              <v-row
                  class="mt-3 mb-5 text-center ml-16"
              >
                <v-col
                    cols="4"
                >
                  <v-img
                      :src="rowExpend(item.id , 1)"
                      max-height="120"
                      max-width="120"
                      class="text-center m-auto"

                  >

                  </v-img>
                </v-col
                >

                <v-col>
                  <v-img
                      :src="rowExpend(item.id , 2)"
                      max-height="120"
                      max-width="120"
                  >

                  </v-img>
                </v-col>

                <v-col>
                  <v-img
                      :src="rowExpend(item.id , 3)"
                      max-height="120"
                      max-width="120"
                  >

                  </v-img>
                </v-col>

              </v-row>


            </td>
          </template>

          <template v-slot:item.menu="{item}">
            <v-icon
                small
                class="mr-2"
                @click="showMenu(item)"
            >
              mdi-menu
            </v-icon>
          </template>

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
                    افزودن رستوران
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
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              sm="6"
                              md="12"
                          >
                            <v-text-field
                                v-model="editedItem.address"
                                label="آدرس"
                                :reverse="true"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              sm="6"
                              md="12"
                          >
                            <v-text-field
                                v-model="editedItem.phone"
                                label="تلفن"
                                :reverse="true"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              sm="6"
                              md="6"
                          >
                            <v-autocomplete
                                v-model="editedItem.user"
                                :items="usersTable"
                                chips
                                clearable
                                item-text="phone"
                                item-value="phone"
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
                                      <v-list-item-title v-text="item.phone"></v-list-item-title>
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
                            <!--                            <v-file-input
                                                            @change="Preview_image()"
                                                            v-model="image"
                                                        >
                                                        </v-file-input>-->
                            <input  type="file" @change="onFileSelected1">

                            <input type="file" @change="onFileSelected2">

                            <input type="file" @change="onFileSelected3">
                            <!--                            <v-img max-height="50" max-width="50" :src="url"></v-img>-->
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
import axios from 'axios'

export default {
  name: "RestrauntFraim",
  data(){
    return{
      restrauntTable : [],
      usersTable : [],
      valid : '',
      selected: [],

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
      title : 'رستوران ها',
      headers: [
        { text: 'menu', value: 'menu', sortable: false , align: 'center'},
        { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
        { text : 'admin' , value: 'adminName' , align: 'center'} ,
        { text : 'phone' , value: 'phone' , align: 'center'} ,
        { text : 'address' , value: 'address' , align: 'center'} ,
        { text : 'name' , value: 'name' , align: 'center'} ,
        { text : 'code' , value: 'code' , align: 'center'} ,
      ],
      editedIndex: -1,
      editedItem : {
        user : {
          id : '',
          phone : ''
        },
        address: '',
        adminName: '',
        adminid: '',
        phone: '',
        name: '',
        code: '',
        id: '',
      },
      defaultItem: {
        user : {
          id : '',
          phone : ''
        },
        address: '',
        adminName: '',
        adminid: '',
        phone: '',
        name: '',
        code: '',
        id: '',
      },

      codeRules: [
        v => !!v || 'کد الزامی است',
        v => !isNaN(v) || 'لطفا کد را به صورت عدد وارد نمایید'
      ],
      nameRules: [v => !!v || 'نام الزامی است',],
      addressRules: [ v => !!v || 'آدرس الزامی است',],
      phoneRules: [
        v => !!v || 'تلفن الزامی است',
      ],



      selectedFile : {
        photo1 : null ,
        photo2 : null ,
        photo3 : null
      }


    }
  },
  computed: {

    setShowMenu() {
      if (this.selected.length == 0)
        return false
      else
        return true
    },

    ...mapGetters({
    }),

    formTitle () {
      return this.editedIndex === -1 ? 'افزودن رستوان' : 'ویرایش رسوران'
    },
  },
  methods : {
    initialize () {
      this.setOverlayStatus(true)
      this.retriveRestraunts()
          .then(res => {
            console.log(res)
            this.restrauntTable = res
            this.setOverlayStatus(false)
          })
          .catch(err => {
            console.log(err)
            this.setOverlayStatus(false)
          })


      this.retriveUsersTable()
          .then(res => {
            console.log(res.data.data)
            this.usersTable = res.data.data
          })
          .catch(err => {
            console.log(err)
          })
    },

    ...mapActions({
      setOverlayStatus : 'GlobalModul/setOverlayStatus',
      setSnackbar : 'GlobalModul/setSnackbar',
      clearSnackbar : 'GlobalModul/clearSnackbar',
      retriveRestraunts : 'RestrauntModul/retriveRestraunts',
      retriveUsersTable : 'UserModul/retriveUsersTable',
      deleteRestraunt : 'RestrauntModul/deleteRestraunt'
    }),

    deleteItemConfirm () {
      this.setOverlayStatus(true)

      this.deleteRestraunt(this.editedItem.id)
        .then(res => {
          console.log(res)
          this.restrauntTable.splice(this.editedIndex, 1)
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


    },

    editItem (item) {

      console.log(item)
      this.editedIndex = this.restrauntTable.indexOf(item)

      this.editedItem = {
        user : {
          id : item.adminid,
          phone : item.adminName
        },
        address: item.address,
        adminName: item.adminName,
        adminid: item.adminid,
        phone: item.phone,
        name: item.name,
        code: item.code,
        id: item.id,
      }

      //this.editedItem = Object.assign({}, item)

      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.restrauntTable.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.editErrors = [];

    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {

      if(this.$refs.form.validate())
      {

        if (this.editedIndex > -1)
        {
          // todo : badan change shavad
          this.restrauntTable[this.editedIndex].id        = this.editedItem.id
          this.restrauntTable[this.editedIndex].code      = this.editedItem.code
          this.restrauntTable[this.editedIndex].name      = this.editedItem.name
          this.restrauntTable[this.editedIndex].phone     = this.editedItem.phone
          this.restrauntTable[this.editedIndex].address   = this.editedItem.address
          this.restrauntTable[this.editedIndex].adminName = this.editedItem.user.phone
          this.restrauntTable[this.editedIndex].adminid   = this.editedItem.user.id

          const fd = new FormData();
          //fd.append('photo1' , this.selectedFile.photo1 , this.selectedFile.photo1.name)
          //fd.append('photo2' , this.selectedFile.photo2 , this.selectedFile.photo2.name)
          //fd.append('photo3' , this.selectedFile.photo3 , this.selectedFile.photo3.name)

          fd.append('id' , this.editedItem.id)
          fd.append('code' , this.editedItem.code)
          fd.append('name' , this.editedItem.name)
          fd.append('phone' , this.editedItem.phone)
          fd.append('address' , this.editedItem.address)
          fd.append('adminName' , this.editedItem.user.phone)
          fd.append('adminid' , this.editedItem.user.id )
          fd.append('srcphoto1' , '---------' )
          fd.append('srcphoto2' , '---------' )
          fd.append('srcphoto3' , '---------')


          this.setOverlayStatus(true)

          axios.post('http://kalament.ir/api/v1/restraunt/editrestraunt' , fd , {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
              .then(res => {
                console.log(res)
                this.close()
                this.setSnackbar({message : 'گروه اصلی مورد نظر ویرایش شد' , color : 'green'}  )
                this.setOverlayStatus(false)
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
            id         : this.editedItem.id ,
            code       : this.editedItem.code ,
            name       : this.editedItem.name ,
            phone      : this.editedItem.phone ,
            address    : this.editedItem.address ,
            adminName  : this.editedItem.user.phone ,
            adminid    : this.editedItem.user.id ,
          }

          const fd = new FormData();
          fd.append('photo1' , this.selectedFile.photo1 , this.selectedFile.photo1.name)
          fd.append('photo2' , this.selectedFile.photo2 , this.selectedFile.photo2.name)
          fd.append('photo3' , this.selectedFile.photo3 , this.selectedFile.photo3.name)
          fd.append('id' , this.editedItem.id)
          fd.append('code' , this.editedItem.code)
          fd.append('name' , this.editedItem.name)
          fd.append('phone' , this.editedItem.phone)
          fd.append('address' , this.editedItem.address)
          fd.append('adminName' , this.editedItem.user.phone)
          fd.append('adminid' , this.editedItem.user.id )

          this.setOverlayStatus(true)

          axios.post('http://kalament.ir/api/v1/restraunt/addrestraunt' , fd , {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
              .then(res => {
                console.log(res)
                NewItem.id = res.data.data.id
                this.restrauntTable.push(NewItem)
                this.close()
                this.setSnackbar({message : 'گروه اصلی مورد نظر افزوده شد' , color : 'green'}  )
                this.setOverlayStatus(false)

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

      }


    },

    rowExpend(item , bannerNumber) {
      return 'https://www.kalament.ir/foodment/public/images/'+item+'/banner/banner'+bannerNumber+'.jpg'
    },

    onFileSelected1(event) {
      //console.log(event)
      this.selectedFile.photo1 = event.target.files[0]
    },

    onFileSelected2(event) {
      //console.log(event)
      this.selectedFile.photo2 = event.target.files[0]
    },

    onFileSelected3(event) {
      //console.log(event)
      this.selectedFile.photo3 = event.target.files[0]
    },

    showMenu(item){
      this.$router.push({
        name : 'MenuRestraunt' ,
        params: { id : item.id }
      })
    }



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