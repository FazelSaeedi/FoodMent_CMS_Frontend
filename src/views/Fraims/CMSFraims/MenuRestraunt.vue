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
                      :items="menuRestraunTable"
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
                              sm="12"
                              md="12"
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
                                :rules="productRules"
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
                              sm="12"
                              md="12"

                          >
                            <v-text-field
                                v-model="editedItem.menuprice"
                                label="قیمت"
                                :reverse="true"
                                :rules="priceRull"
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
                                :rules="discountRules"
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
                                :rules="makeupsRules"
                            ></v-text-field>
                          </v-col>


                          <v-col
                              cols="12"
                              sm="12"
                              md="12"
                          >

                            <v-file-input
                                accept="image/*"
                                label="File input"
                                v-model="selectedFile.photo1"
                                @change="onFileSelected1"
                                :rules="imageRules"
                                :validate-on-blur="true"
                            ></v-file-input >
                            <img :src="image1URl" v-if="image1URl"  width="50px" height="50px" >
                          </v-col>


                          <v-col
                              cols="12"
                              sm="12"
                              md="12"
                          >
                            <v-file-input
                                accept="image/*"
                                label="File input"
                                v-model="selectedFile.photo2"
                                @change="onFileSelected2"
                                :rules="imageRules"
                                :validate-on-blur="true"
                            ></v-file-input>
                            <img :src="image2URl"  v-if="image2URl" width="50px" height="50px">

                          </v-col>


                          <v-col
                              cols="12"
                              sm="12"
                              md="12"
                          >
                            <v-file-input
                                accept="image/*"
                                label="File input"
                                v-model="selectedFile.photo3"
                                @change="onFileSelected3"
                                :rules="imageRules"
                                :validate-on-blur="true"

                            ></v-file-input>
                            <img :src="image3URl"  v-if="image3URl" width="50px" height="50px">
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
import axios from "axios";

export default {
  name: "MenuRestraunt",
  data(){
    return{
      restrauntId : '',
      restrauntName : '',


      menuRestraunTable : [],
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
      defaultItem : {
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
      discountRules: [
        v => !!v || 'کد الزامی است',
        v => !isNaN(v) || 'لطفا کد را به صورت عدد وارد نمایید'
      ],
      productRules: [v => !!v || 'محصول الزامی است',],
      makeupsRules: [ v => !!v || 'تخفیف الزامی است',],

      imageRules: [ v => !!v || ' image الزامی است',],

      priceRull : [
          v => !!v || ' قیمت الزامی است',
          v => !isNaN(v) || 'لطفا قیمت را به صورت عدد وارد نمایید'
      ],

      selectedFile : {
        photo1 : null ,
        photo2 : null ,
        photo3 : null
      },

      image1URl : '',
      image2URl : '',
      image3URl : '',

      autocompleteError : false

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
            this.menuRestraunTable = res
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
            this.menuRestraunTable.splice(this.editedIndex, 1)
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

      this.selectedFile.photo1 = []
      this.selectedFile.photo2 = []
      this.selectedFile.photo3 = []





      this.image1URl =  'https://www.kalament.ir/foodment/public/images/'+this.restrauntId+'/food/'+item.menuid+'/1.jpg'+'?'+ (new Date()).getTime();
      this.image2URl =  'https://www.kalament.ir/foodment/public/images/'+this.restrauntId+'/food/'+item.menuid+'/2.jpg'+'?'+ (new Date()).getTime();
      this.image3URl =  'https://www.kalament.ir/foodment/public/images/'+this.restrauntId+'/food/'+item.menuid+'/3.jpg'+'?'+ (new Date()).getTime();





      console.log(item)
      this.editedIndex = this.menuRestraunTable.indexOf(item)

      this.editedItem.menuid         =  item.menuid
      this.editedItem.productid      =  item.productid
      this.editedItem.productname    =  item.productname
      this.editedItem.restrauntid    =  item.restrauntId
      this.editedItem.menuprice      =  item.menuprice
      this.editedItem.menudiscount   =  item.menudiscount
      this.editedItem.menumakeup     =  item.menumakeup


      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.menuRestraunTable.indexOf(item)
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
          this.menuRestraunTable[this.editedIndex].menuid         = this.editedItem.menuid
          this.menuRestraunTable[this.editedIndex].menudiscount   = this.editedItem.menudiscount
          this.menuRestraunTable[this.editedIndex].menumakeup     = this.editedItem.menumakeup
          this.menuRestraunTable[this.editedIndex].menuprice      = this.editedItem.menuprice
          this.menuRestraunTable[this.editedIndex].productid      = this.editedItem.productid
          this.menuRestraunTable[this.editedIndex].productname    = this.editedItem.productname


          const fd = new FormData();

          fd.append('id'          , this.editedItem.menuid)
          fd.append('productid'   , this.editedItem.productid)
          fd.append('restrauntid' , this.restrauntId)
          fd.append('price'       , this.editedItem.menuprice)
          fd.append('discount'    , this.editedItem.menudiscount)
          fd.append('makeups'     , this.editedItem.menumakeup)




          if (this.selectedFile.photo1 == 0)
          {
            fd.append('srcphoto1' , this.image1URl )
          }
          else{
            fd.append('photo1' , this.selectedFile.photo1 , this.selectedFile.photo1.name)
          }


          if (this.selectedFile.photo2 == 0)
          {
            fd.append('srcphoto2' , '---------' )
          }
          else{
            fd.append('photo2' , this.selectedFile.photo2 , this.selectedFile.photo2.name)
          }

          if (this.selectedFile.photo3 == 0)
          {
            fd.append('srcphoto3' , '---------')
          }
          else{
            fd.append('photo3' , this.selectedFile.photo3 , this.selectedFile.photo3.name)
          }





          this.setOverlayStatus(true)

          axios.post('http://kalament.ir/api/v1.0/menu/editmenuproduct' , fd , {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
              .then(res => {
                console.log(res)
                this.close()
                this.setSnackbar({message : 'محصول منو مورد نظر ویرایش شد' , color : 'green'}  )
                this.menuRestraunTable[this.editedIndex].typename       = res.data.data.typename
                this.menuRestraunTable[this.editedIndex].maingroupname  = res.data.data.maingroupname
                this.menuRestraunTable[this.editedIndex].subgroupname   = res.data.data.subgroupname
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
                this.setOverlayStatus(false)

              })
        }
        else
        {


          var NewItem = {
            menuid           : this.editedItem.menuid        ,
            menudiscount     : this.editedItem.menudiscount  ,
            menumakeup       : this.editedItem.menumakeup    ,
            menuprice        : this.editedItem.menuprice     ,
            productid        : this.editedItem.productid     ,
            productname      : this.editedItem.productname   ,
            subgroupname     : this.editedItem.subgroupname  ,
            typename         : this.editedItem.typename      ,
            maingroupname    : this.editedItem.maingroupname ,
          }



          const fd = new FormData();
          fd.append('photo1' , this.selectedFile.photo1 , this.selectedFile.photo1.name)
          fd.append('photo2' , this.selectedFile.photo2 , this.selectedFile.photo2.name)
          fd.append('photo3' , this.selectedFile.photo3 , this.selectedFile.photo3.name)

          fd.append('productid' , this.editedItem.productid)
          fd.append('restrauntid' , this.restrauntId)
          fd.append('price' , this.editedItem.menuprice)
          fd.append('discount' , this.editedItem.menudiscount)
          fd.append('makeups' , this.editedItem.menumakeup)


          this.setOverlayStatus(true)

          axios.post('http://kalament.ir/api/v1.0/menu/addmenuproduct' , fd , {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          })
              .then(res => {
                console.log(res.data.data)
                console.log(res.data.data[0].id)

                NewItem.menuid          =   res.data.data[0].id
                NewItem.menudiscount    =   res.data.data[0].discount
                NewItem.menumakeup      =   res.data.data[0].makeup
                NewItem.menuprice       =   res.data.data[0].price
                NewItem.productid       =   res.data.data[0].productid
                NewItem.productname     =   res.data.data[0].productname
                NewItem.subgroupname    =   res.data.data[0].subgroupname
                NewItem.typename        =   res.data.data[0].typename
                NewItem.maingroupname   =   res.data.data[0].maingroupname
                //NewItem

                this.menuRestraunTable.push(NewItem)
                this.close()
                this.setSnackbar({message : 'محصول مورد نظر افزوده شد' , color : 'green'}  )
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
                this.setOverlayStatus(false)
              })


        }

      }


    },

    rowExpend(productid , bannerNumber) {

      return 'http://www.kalament.ir/foodment/public/images/'+this.restrauntId+'/food/'+productid+'/'+bannerNumber+'.jpg'+'?'+ (new Date()).getTime();
    },

    onFileSelected1(event) {
      console.log(event)

      this.selectedFile.photo1 = event

      if (this.selectedFile.photo1){
        const fileReader = new FileReader()
        fileReader.addEventListener('load' , () => {
          this.image1URl = fileReader.result
        })
        fileReader.readAsDataURL(event)
      }
      else
        this.image1URl = null;


    },

    onFileSelected2(event) {
      this.selectedFile.photo2 = event

      if (this.selectedFile.photo2){
        const fileReader = new FileReader()
        fileReader.addEventListener('load' , () => {
          this.image2URl = fileReader.result
        })
        fileReader.readAsDataURL(event)
      }
      else
        this.image2URl = null;
    },

    onFileSelected3(event) {
      this.selectedFile.photo3 = event

      if (this.selectedFile.photo3){
        const fileReader = new FileReader()
        fileReader.addEventListener('load' , () => {
          this.image3URl = fileReader.result
        })
        fileReader.readAsDataURL(event)
      }
      else
        this.image3URl = null;
    },

    finalPrice(item){
      var discount = parseInt(item.menuprice) -  ( parseInt(item.menuprice) * parseInt(item.menudiscount) ) / 100
      return  discount.toFixed(0).toString()
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