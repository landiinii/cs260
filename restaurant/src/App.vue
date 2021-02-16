<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <div>
            <span class="mx-auto my-10 main-title">
              {{restaurant.business_name || "restaurant.name"}}
            </span>
          </div>
        </router-link>
      </div>
      <div id="side">
        <router-link to="/browse">
          <div class="menu-item browse">
            <p>View Staff</p>
          </div>
        </router-link>
        <router-link to="/cart">
          <div class="menu-item">
            <p>View Menu</p>
          </div>
        </router-link>
      </div>
    </div>
    <router-view />
    <div class="footer">
      <div class="terms"><a href="https://github.com/BYU-CS-260-Winter-2020/lab-3b-grocery-store-landiinii">GitHub Repository</a></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
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

};
</script>

<style>
* {
  box-sizing: border-box;
}

.main-title {
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
}

body {
  margin: 50px 100px;

}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #010199;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}

.footer{
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #010199;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.terms a{
  display: block;
  color: #cacaca;
  font-size: 15px;
  line-height: 15px;
  padding: 4px;
}
</style>