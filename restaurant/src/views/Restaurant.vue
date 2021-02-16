<template>
  <div>
  <v-container class="mx-auto">

    <v-row class="mb-10">
      <v-card width="100%">
        <v-container>
          <v-row>
            <v-col style="text-align: center">
              <span class="mid-title">
                Staff On Hand
              </span>
            </v-col>
          </v-row>
          <v-row style="max-width: 80%" class="mx-auto">
            <v-col class="ml-10">
              <v-row>
                <v-col cols="4" class="ma-0">
                  <!-- image -->
                  <div cols="" class="dot ma-0">
                    <v-avatar
                      color="primary"
                      size="106"
                      style="float: right;"
                    >
                      <img
                        src="../assets/godonramsay.jpg"
                        alt="Chef"
                      >
                    </v-avatar>
                  </div>
                  <span style="margin-left: 40px" class="little-text">Chef</span>
                </v-col>
                <v-col class="mt-10">
                  <!-- name -->
                  <span class="names">
                    {{chef.first_name + " " + chef.last_name || "chef.name"}}
                  </span>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col cols="4" class="ma-0">
                  <div class="dot">
                    <v-avatar
                      color="primary"
                      size="106"
                      style="float: right;"
                    >
                      <img
                        src="../assets/waitress.jpg"
                        alt="Waiter"
                      >
                    </v-avatar>
                  </div>
                  <span style="margin-left: 40px" class="little-text">Waiter</span>
                </v-col>
                <v-col class="mt-10">
                  <!-- name -->
                  <span class="names">
                    {{waiter.first_name + " " + waiter.last_name || "waiter.name"}}
                  </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>

    <v-row>
      <div style="width: 100%;">
        <v-text-field
          v-model="partyName"
          label="Enter Party Name"
          outlined
        />
      </div>
    </v-row>
    <v-row>
      <div style="width: 100%;">
        <v-select
          :items="[1,2,3,4,5,6,7,8,9,10]"
          label="Party Size"
          outlined
          @input="setNumPeople($event)"
        />
      </div>
    </v-row>
    
    <v-row
      v-for="person in numPeople"
      :key="person"
    >
      <v-select
        :items="menu"
        :label="'Guest '+person"
        outlined
        multiple
        item-text="item_name"
        return-object
        @change="selectItem($event)"
      />
    </v-row>
    <v-row class="mx-auto my-10" style="max-width: 80%">
      <v-col>
        <!-- subTotal -->
        <v-row class="mid-title">
          {{'$' + getPriceSelectedItems().toFixed(2)}}
        </v-row>
        <v-row class="little-text">
          Sub Total
        </v-row>
      </v-col>
      <v-col style="text-align: center">
        <span class="mid-title">+</span>
      </v-col>
      <v-col>
        <!-- selecttip -->
        <v-select
          :items="tipAmounts"
          label="Tip"
          outlined
          @input="setTipAmount($event)"
        />
      </v-col>
      <v-col style="text-align: center">
        <span class="mid-title">=</span>
      </v-col>
      <v-col>
        <!-- grandtotal -->
        <v-row>
          <span style="font-weight: bold" class="mid-title">
            {{'$' + getGrandTotal().toFixed(2)}}
          </span>
        </v-row>
        <v-row>
          <span class="little-text">
            Grand Total
          </span>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mb-10">
      <v-btn
        color="#2BB4BD"
        dark
        width="100%"
        elevation="2"
        x-large
        @click="submitOrder()"
      >
        Pay
      </v-btn>
    </v-row>
    <v-row class="mb-10" v-if="paid">
      <span>Payment Successful!</span>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Restaurant',
  props: {
  },
  mounted() {
    axios.get(`https://jyev82mlki.execute-api.us-west-2.amazonaws.com/devTest1/restaurant/1`)
      .then(response => {
        this.restaurant = response.data[0]
      })
      .catch(e => {
        console.log(e)
      })
    // https://cors-anywhere.herokuapp.com/
    axios.get(`https://jyev82mlki.execute-api.us-west-2.amazonaws.com/devTest1/staff/1`) // gets chef and waiter
      .then(response => {
        this.chef = response.data.chef[0]
        this.waiter = response.data.waiter[0]
      })
      .catch(e => {
        console.log(e)
      })

    axios.get(`https://jyev82mlki.execute-api.us-west-2.amazonaws.com/devTest1/menu/1`)
      .then(response => {
        this.menu = response.data
      })
      .catch(e => {
        console.log(e)
      })

  },
  data () {
    return {
      restaurant: {},
      chef: {},
      waiter: {},
      menu: [],
      selectedItems: [],
      subTotal: 0.00,
      total: 0.00,
      paid: false,
      partyName: "",
      tipAmounts: [
        "15%",
        "20%",
        "25%"
      ],
      tipAmount: 0,
      numPeople: 0,
    }
  },
  
  methods: {
    getGrandTotal () {
      // console.log(this.getPriceSelectedItems())
      // console.log(this.tipAmount)
      this.total = (this.getPriceSelectedItems() + (this.getPriceSelectedItems() * this.tipAmount))
    
      return this.total
    },
    setNumPeople (e) {
      this.numPeople = e
    },
    setTipAmount (e) {
      let percentage = parseInt(e, 10)/100
      this.tipAmount = percentage
    },
    submitOrder () {
      axios.post(`https://jyev82mlki.execute-api.us-west-2.amazonaws.com/devTest1/submit-order`, { party: this.getParty(), selected_items: this.getSelectedMenuItems()})
        .then(response => {
          console.log(response)
          this.total = response.data
          this.paid = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    getSelectedMenuItems () {
      let list = []
      for (let i = 0; i < this.selectedItems.length; i++) {
        list.push(this.selectedItems[i].menu_id)
      }
      return list
    },
    selectItem (e) {
      this.selectedItems.push(...e)
    },
    getPriceSelectedItems () {
      let total = 0
      for (let i = 0; i < this.selectedItems.length; i++) {

        total += parseInt(this.selectedItems[i].customer_cost.toFixed(2))
      }
      return total
    },
    getParty () {
      return {
        chef_id: this.chef.employee_id,
        waiter_id: this.waiter.employee_id,
        party_name: this.partyName,
        business_id: this.restaurant.business_id,
        tip_amount: this.tipAmount
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dot {
  height: 120px;
  width: 120px;
  background-color: #2BB4BD;
  border-radius: 50%;
  /* display: inline-block; */
}

.mid-title {
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
}
.little-text {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
}
.names {
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
}
</style>
