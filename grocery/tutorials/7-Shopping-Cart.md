# Shopping Cart

The last step is to build a shopping cart. This is the part you're going to
do on your own, so you can practice what you've learned. This will require:

* Modifying the "Add to Cart" button so that it adds the product to the cart.
There is already a cart property in the global data object that you can use to
store an array of products. Don't worry about quantities. We'll just assume that
users need to add the same product more than once in order to buy multiples.

* Modifying the menu so that it shows the number of items in the cart. You may
want to use a computed property in App.vue to do this.

* Adding a Cart view that is viewed when the user clicks on the Cart menu item.
This view should show all the products in the cart. It should include a Remove
button to remove items from the cart. It should also show a message when the cart
is empty. Don't use the `ProductList` here since you won't have an `Add to Cart`
button. And you should make the shopping cart view look different from the product
listing so that the user is not confused.

## Extra Credit

If you have time and want a challenge, make the cart keep track of quantities.
Remember, each product has a unique ID. So you could search the cart to see if a product
is already there, and then add a `quantity` property to items in the cart. You could
also use an object that is indexed by property ID.

## Next Tutorial

[Installing on Digital Ocean](/tutorials/8-Installing-on-Digital-Ocean.md)
