<template>
  <div id="app">
    <div id="menu">
      <div id="brand">
        <router-link to="/">
          <img src="../public/images/logo.png">
        </router-link>
      </div>
      <div id="side">
        <router-link to="/browse">
          <div class="menu-item browse">
            <img src="../public/images/globe.png">
            <p>Browse</p>
          </div>
        </router-link>
        <router-link to="/cart">
          <div class="menu-item">
            <img src="/images/love.png">
            <p>{{items}}</p>
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

export default {
  computed: {
    items() {
      let num = this.$root.$data.cart.length;
      return num + " Items";
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
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
  color: #B84901;
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
  background-color: #B84901;
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
