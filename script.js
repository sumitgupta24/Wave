
if (document.readyState=='loading'){
  document.addEventListener('DOMContentLoaded',ready)
}
else{
  ready()
}
function ready(){
  updateCartTotal()
  var removeItemButtons=document.getElementsByClassName('remove')
  for (var i=0; i<removeItemButtons.length; i++){
      var button=removeItemButtons[i]
      button.addEventListener('click', removeCartItem)
  }
  var cartQuantities=document.getElementsByClassName("qty")
  for (var i=0; i<cartQuantities.length; i++){
      var cartQuantity=cartQuantities[i]
      cartQuantity.addEventListener('change',quantityChange)
  }
  var addToCartButtons=document.getElementsByClassName("addtocart")
  for (var i=0; i<addToCartButtons.length; i++){
      var addToCartButton=addToCartButtons[i]
      addToCartButton.addEventListener("click",addToCartClicked)
  }
  document.getElementsByClassName('order')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
  alert('Thank you for your Purchase')
  var cartBox=document.getElementsByClassName('cartbox')[0]
  while (cartBox.hasChildNodes()){
      cartBox.removeChild(cartBox.firstChild)
  }
  updateCartTotal()    
}

function addToCartClicked(event){
  window.location.href='#shopcart'
  var button=event.target
  var shopItem=button.parentElement.parentElement
  var title=shopItem.getElementsByClassName('itemtitle')[0].innerText
  var category=shopItem.getElementsByClassName('category')[0].innerText
  var price=parseFloat(shopItem.getElementsByClassName('price-amt')[0].innerText.replace(',','').replace('.',''))
  var imagestyles=getComputedStyle(shopItem)
  var imageUrl=imagestyles.backgroundImage.replace('url(','').replaceAll('"','').replace(')','')
  console.log(category,title,price,imageUrl)
  addItemToCart(category,title,price,imageUrl)
  updateCartTotal()
} 

function addItemToCart(category,title,price,imageUrl){
  var cartRow=document.createElement('div')
  cartRow.classList.add('purchase')
  var cartItems=document.getElementsByClassName('cartbox')[0]
  var cartItemNames=cartItems.getElementsByClassName('purchasetitle')
  console.log(cartItemNames[0])
  for (var i=0; i<cartItemNames.length; i++){
      if (cartItemNames[i].innerText==title){
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents=`
          <div class="purchaseimg"><img src="${imageUrl}"></div>
          <div class="purchasedesc">
              <p>${category}</p>
              <p class="purchasetitle">${title}</p>
              <p class="prices">Rs.${price}.</p>
          </div>
          <div class="purchasefunc">
              <div class="qtyselect"><input class="qty" type="number" value="1" min="1"></div>
              <div class="removebtn"><button class="remove">Remove</button></div>
          </div>
      `
  cartRow.innerHTML=cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('remove')[0].addEventListener('click',removeCartItem)
  cartRow.getElementsByClassName('qty')[0].addEventListener('change', quantityChange)
}

function quantityChange(event){
  var input=event.target
  if (isNaN(input.value) || input.value<=0){
      input.value=1
  }
  updateCartTotal()
}

function removeCartItem(event){
  var buttonClicked= event.target
  buttonClicked.parentElement.parentElement.parentElement.remove()
  updateCartTotal()
}

function updateCartTotal(){
  var cartPrices=document.getElementsByClassName("prices")
  var cartQuantities=document.getElementsByClassName("qty")
  var total=0
  for (var i=0; i<cartPrices.length; i++){
      var cartPriceEl=cartPrices[i]
      var cartPrice=parseFloat(cartPriceEl.innerText.replace('Rs','').replace(',','').replaceAll('.',''))
      var cartQuantity=cartQuantities[i].value
      total+=cartQuantity*cartPrice
  }
  document.getElementsByClassName('total-cart-price')[0].innerText=total
}

function sendMessage() {
  var name = document.getElementById("name").value;
  alert("Hey " + name + ", your message has been sent. Thank you.");
}
