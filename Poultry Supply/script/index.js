var minVal = 1, maxVal = 50; 

$(".increaseQty").on('click', function(){
		var $parentElm = $(this).parents(".qtySelector");
		var value = $parentElm.find(".qtyValue").val();
		if (value < maxVal) {
			value++;
		}
		$parentElm.find(".qtyValue").val(value);
});

$(".decreaseQty").on('click', function(){
		var $parentElm = $(this).parents(".qtySelector");
		var value = $parentElm.find(".qtyValue").val();
		if (value > 1) {
			value--;
		}
		$parentElm.find(".qtyValue").val(value);
});

$(".navbar .nav-link").on("click", function(){
    $(".navbar").find(".active").removeClass("active");
    $(this).addClass("active");
});

$(document).ready(function(){
    $('.filter').click(function(){

        $(this).addClass('active').siblings().removeClass('active');
    
        var filter = $(this).attr('data-filter')
    
        if(filter == 'all') {
            $('.image').show(400);
            console.log('ok');
        } else {
            $('.image').not('.'+filter).hide(200);
            $('.image').filter('.'+filter).show(400);
        }
    
    });
});

$(document).ready(function(){
    $("#onSale").modal('show');
});

$("#toTop").click(function () {
    $("html, body").animate({scrollTop: 0}, 100);
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


 var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(image, name, price, count, quantity) {
      this.image = image;
      this.name = name;
      this.price = price;
      this.count = count;
      this.quantity = quantity
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(image, name, price, count, quantity) {
      for(var item in cart) {
        if(cart[item].name === name) {
            console.log("add to cart with same name" + cart[item].name)
            cart[item].quantity += quantity;
            saveCart();
            return;
        }
      }
      var item = new Item(image, name, price, count, quantity);
      cart.push(item);
      saveCart();
    }
    // Add to cart Same
    obj.addItemToCartSame = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
            console.log("add to cart with same name" + cart[item].name)
            cart[item].quantity ++;
            saveCart();
            return;
        }
      }
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].quantity = quantity;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].quantity --;
            if(cart[item].quantity === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].quantity;
      }
      if(totalCount > 0){
        document.getElementById("itemCount").style.display = "block";
      }
      else {
        document.getElementById("itemCount").style.display = "none";
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].quantity;
      }
      return "Php " + Number(totalCart).toFixed(2);
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.quantity).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    var image = $(this).data('image');
    var quantity = Number($(this).parents(".add-container").find('.qtyValue').val());
    shoppingCart.addItemToCart(image, name, price, 1, quantity);
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<div class='container-fluid border-bottom border-dark border-3 my-3' style='background-color: #fff;'>"
             +       "<div class='row'>"
             +            "<div class='col-4'>"
             +                  "<img src='" + cartArray[i].image + "' class='img-fluid' alt='hello'>"
             +            "</div>"
             +            "<div class='col-8'>"
             +                  "<div class='row'>"
             +                      "<div class='col-8'>"
             +                          "<p class='fs-5 fw-bold'>" + cartArray[i].name + "</p>"
             +                      "</div>"
             +                      "<div class='col-4 text-end'>"
             +                          "<button type='button' class='border-0 bg-white delete-item' data-delete='" + cartArray[i].name + "'>"
             +                              "<i class='bi-x-lg fw-bold' style='font-size: 1.5rem; color: #000;cursor: pointer;'></i>"
             +                          "</button>"
             +                      "</div>"
             +                  "</div>"
             +                  "<div class='row'>"
             +                      "<p class='fs-6 mb-0 pb-1'>Price</p>"
             +                      "<p class='fs-6'>Php " +(cartArray[i].price).toFixed(2)+"</p>"
             +                "</div>"
             +            "</div>"
             +       "</div>"
             +       "<div class='row py-2 d-flex justify-content-between'>"
             +            "<div class='col-auto'>"
             +                  "<p class='fs-6 mb-0 pb-1'>Quantity</p>"
             +                  "<div class='d-flex justify-content-center'>"
             +                      "<i class='bi-dash minus-item' style='font-size: 1.5rem; color: #000;cursor: pointer;' data-minus='" + cartArray[i].name + "'></i>"
             +                      "<input type='text' class='item-count text-center px-1 mx-2 rounded' data-quant='" + cartArray[i].name + "' value='" + cartArray[i].quantity +"' size='1' min='1' style='border: 1px solid #000;'>"
             +                      "<i class='bi-plus plus-item' style='font-size: 1.5rem; color: #000;cursor: pointer;' data-add='" + cartArray[i].name + "'></i>"
             +                  "</div>"
             +            "</div>"
             +            "<div class='col-auto'>"
             +                  "<p class='fs-6 mb-0 pb-1'>SubTotal</p>"
             +                  "<p class='fs-5'>Php " +cartArray[i].total+"</p>"
             +            "</div>"
             +       "</div>"
             +   "</div>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('delete')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('minus')
    console.log("minus 1" + name)
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('add')
    console.log("plus 1" + name)
    shoppingCart.addItemToCartSame(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('quant');
    var count = Number($(this).val());
    console.log("nababago")
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  
