<template>
  <div class="wrapper">
    <div v-if="empty">
      <H1>Your Cart is Currently Empty</H1>
    </div>
    <div v-else class="products">
      <div class="product" v-for="product in products" :key="product.id">
        <div class="info">
          <h1>{{product.name}}</h1>
          <h2>{{product.price}}</h2>
          <button v-on:click="remove(product)">Remove From Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Cart",
  computed: {
    empty(){
      let proc = this.$root.$data.cart;
      return proc.length === 0;
    },
    products() {
      return this.$root.$data.cart;
    }
  },
  methods: {
    remove(product){
      const index = this.$root.$data.cart.indexOf(product);
      if (index > -1) {
        this.$root.$data.cart.splice(index, 1);
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 100%;
  display: block;
  align-items: center;
  text-align: center;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

</style>