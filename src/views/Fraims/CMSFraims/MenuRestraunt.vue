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
                      :items="menuTable"
                      class="elevation-1 text-center"
                      :search="search"
                      :mobile-breakpoint="5"
                      :hide-default-footer="true"
                      item-key="productid"


                      :page.sync="page"
                      :items-per-page="itemsPerPage"
                      @page-count="pageCount = $event"

                      :single-expand="true"
                      show-expand
        >

          <template v-slot:expanded-item="{ headers , item }" >
            <td :colspan="headers.length" align="center" >
              <v-row
                  class="mt-3 mb-5 text-center ml-16"
              >
                <v-col
                    cols="4"
                >
                  <v-img
                      :src="rowExpend(item.menuid , 1)"
                      max-height="120"
                      max-width="120"
                      class="text-center m-auto"

                  >

                  </v-img>
                </v-col
                >

                <v-col>
                  <v-img
                      :src="rowExpend(item.menuid , 2)"
                      max-height="120"
                      max-width="120"
                  >

                  </v-img>
                </v-col>

                <v-col>
                  <v-img
                      :src="rowExpend(item.menuid , 3)"
                      max-height="120"
                      max-width="120"
                  >

                  </v-img>
                </v-col>

              </v-row>
            </td>
          </template>

          <template v-slot:item.finalprice="{item}">
            {{finalPrice(item)}}
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
                    افزودن محصول
                  </v-btn>
                  <router-link to="/Panel/restraunt" tag="button"><v-btn
                      color="primary"
                      dark
                      class="mb-3 mr-5 mt-8"
                      small

                  >
                    بازگشت
                  </v-btn></router-link>
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
                              md="6"
                          >
                            <v-autocomplete
                                v-model="editedItem.productid"
                                :items="productsTable"
                                chips
                                clearable
                                item-text="productname"
                                item-value="productid"
                                deletable-chips
                                label="محصول اصلی مورد نظر خود را جستجو کنید"
                                reverse
                            >


                              <template v-slot:no-data>
                                <v-list-item>
                                  <v-list-item-title>
                                    <strong>محصول</strong>
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
                                      <v-list-item-title v-text="item.productname"></v-list-item-title>
                                    </v-list-item-content>
                                  </v-col>
                                </v-row>
                              </template>

                            </v-autocomplete>

                          </v-col>


                          <v-col
                              cols="12"
                              sm="6"
                              md="12"

                          >
                            <v-text-field
                                v-model="editedItem.menuprice"
                                label="قیمت"
                                :reverse="true"
                            ></v-text-field>
                          </v-col>


                          <v-col
                              cols="12"
                              sm="6"
                              md="12"

                          >
                            <v-text-field
                                v-model="editedItem.menudiscount"
                                label="تخفیف"
                                :reverse="true"
                            ></v-text-field>
                          </v-col>


                          <v-col
                              cols="12"
                              sm="6"
                              md="12"

                          >
                            <v-text-field
                                v-model="editedItem.menumakeup"
                                label="مواد تشکیل دهنده"
                                :reverse="true"
                            ></v-text-field>
                          </v-col>



                          <v-col
                              cols="12"
                              sm="6"
                              md="6"
                          >

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

{{this.editedItem}}
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
  name: "MenuRestraunt",
  data(){
    return{
      restrauntId : '',
      restrauntName : '',


      menuTable : [],
      productsTable : [],
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
      title : 'منو رستوران',
      headers: [
        { text: 'Actions', value: 'actions', sortable: false , align: 'center'},
        { text : 'menumakeup' , value: 'menumakeup' , align: 'center'} ,
        { text : 'finalprice' , value: 'finalprice' , align: 'center'} ,
        { text : 'menudiscount' , value: 'menudiscount' , align: 'center'} ,
        { text : 'menuprice' , value: 'menuprice' , align: 'center'} ,
        { text : 'subgroupname' , value: 'subgroupname' , align: 'center'} ,
        { text : 'maingroupname' , value: 'maingroupname' , align: 'center'} ,
        { text : 'typename' , value: 'typename' , align: 'center'} ,
        { text : 'productname' , value: 'productname' , align: 'center'} ,
      ],
      editedIndex: -1,
      editedItem : {
        product : {
          id : '',
          name : ''
        },
        menumakeup: '',
        menudiscount: '',
        menuprice: '',
        subgroupname: '',
        maingroupname: '',
        typename: '',
        productid: '',
        productname: '',
        menuid: '',
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
      },



    }
  },
  computed: {



    ...mapGetters({
    }),

    formTitle () {
      return this.editedIndex === -1 ? 'افزودن محصول' : 'ویرایش منو'
    },
  },
  methods : {
    initialize () {
      this.setOverlayStatus(true)
      this.restrauntId = this.$route.params.id
      this.restrauntName = this.$route.params.restrauntName
      this.title =  `منو رستوران`  +'  '+ this.restrauntName


        this.retriveMenuRestraunt(this.restrauntId)
          .then(res => {
            console.log(res)
            this.setOverlayStatus(false)
            this.menuTable = res
          })
          .catch(err => {
            console.log(err)
            this.setOverlayStatus(false)

          })


        this.retriveProducts()
            .then(res => {
              console.log('---------------------------')
              console.log(res)
              this.setOverlayStatus(false)
              this.productsTable = res
            })
            .catch(err => {
              console.log(err)
              this.setOverlayStatus(false)

            })


    },

    ...mapActions({
      retriveMenuRestraunt : 'MenuRestrauntModul/retriveMenuRestraunt',
      setOverlayStatus : 'GlobalModul/setOverlayStatus',
      setSnackbar : 'GlobalModul/setSnackbar',
      clearSnackbar : 'GlobalModul/clearSnackbar',
      retriveProducts : 'ProductModul/retriveProducts',
      deleteMenuProduct : 'MenuRestrauntModul/deleteMenuProduct'

    }),

    deleteItemConfirm () {

      this.setOverlayStatus(true)

      this.deleteMenuProduct(this.editedItem.menuid)
          .then(res => {
            console.log(res)
            this.menuTable.splice(this.editedIndex, 1)
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
/*      console.log(item)
      this.editedIndex = this.menuTable.indexOf(item)

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

      this.dialog = true*/
    },

    deleteItem (item) {
      this.editedIndex = this.menuTable.indexOf(item)
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
          this.menuTable[this.editedIndex].id        = this.editedItem.id
          this.menuTable[this.editedIndex].code      = this.editedItem.code
          this.menuTable[this.editedIndex].name      = this.editedItem.name
          this.menuTable[this.editedIndex].phone     = this.editedItem.phone
          this.menuTable[this.editedIndex].address   = this.editedItem.address
          this.menuTable[this.editedIndex].adminName = this.editedItem.user.phone
          this.menuTable[this.editedIndex].adminid   = this.editedItem.user.id

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


          const fd = new FormData();
          fd.append('photo1' , this.selectedFile.photo1 , this.selectedFile.photo1.name)
          fd.append('photo2' , this.selectedFile.photo2 , this.selectedFile.photo2.name)
          fd.append('photo3' , this.selectedFile.photo3 , this.selectedFile.photo3.name)

          fd.append('productid' , this.editedItem.productid)
          fd.append('restrauntid' , this.restrauntId)
          fd.append('price' , this.editedItem.menuprice)
          fd.append('discount' , this.editedItem.menudiscount )
          fd.append('makeups' , this.editedItem.menumakeup )

          this.setOverlayStatus(true)

          axios.post('http://kalament.ir/api/v1/menu/addmenuproduct' , fd , {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
              .then(res => {

                console.log('***********')
                console.log(res.data.data[0])

                this.editedItem.menudiscount   = res.data.data[0].discount
                this.editedItem.menuid   = res.data.data[0].id
                this.editedItem.menumakeup   = res.data.data[0].makeup
                this.editedItem.menuprice   = res.data.data[0].price
                this.editedItem.productid   = res.data.data[0].productid
                this.editedItem.productname   = res.data.data[0].productname
                this.editedItem.subgroupname   = res.data.data[0].subgroupname
                this.editedItem.typename   = res.data.data[0].typename
                this.editedItem.maingroupname   = res.data.data[0].maingroupname


                this.menuTable.push(this.editedItem)
                this.close()
                this.setSnackbar({message : 'گروه اصلی مورد نظر افزوده شد' , color : 'green'}  )
                this.setOverlayStatus(false)

              })
              .catch(err => {
                console.log(err.response.status)
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
                else if (err.response.status == '409')
                {
                  console.log(err.response.data.message)
                  alert('محصول مورد نظر موجود میباشد')
                  this.setOverlayStatus(false)

                }
              })

        }

      }


    },

    rowExpend(productid , bannerNumber) {

      return 'http://www.kalament.ir/foodment/public/images/'+this.restrauntId+'/food/'+productid+'/'+bannerNumber+'.jpg'+'?'+ (new Date()).getTime();
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

    finalPrice(item){
      return item.menuprice - ((item.menuprice * item.menudiscount)/100)
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