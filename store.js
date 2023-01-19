if (document.readyState == "loading")
{
    document.addEventListener("DOMContentLoaded", ready())
}
else
{
    ready()
}

function ready()
{
    var removeCartItemButton = document.getElementsByClassName("button-danger")

    console.log(removeCartItemButton)
    
    for (var i = 0; i < removeCartItemButton.length; i++)
    {
        var buttonSelect = removeCartItemButton[i];
        buttonSelect.addEventListener("click", removeCartItem)
        
    }

    var quantityInput = document.getElementsByClassName("cart-quantity-input")

    for (var i = 0; i < quantityInput.length; i++)
    {
        var input = quantityInput[i]
        input.addEventListener("change", quantityChanged)
    }

    var addToCartButton = document.getElementsByClassName("store-item-button")

    for(var i = 0; i < addToCartButton.length; i ++)
    {
        var buttonSelect = addToCartButton[i]
        buttonSelect.addEventListener("click", addToCart)
    }

    document.getElementsByClassName("button-checkout")[0].addEventListener("click", checkout)
}

function checkout()
{
    //alert("Welcome to the club!")
    window.location.href = "./checkout.html";

}

function removeCartItem(event)
{
    var buttonSelect = event.target
    buttonSelect.parentElement.parentElement.remove()
    updateCartTotal();
}

function quantityChanged(event)
{
    var input = event.target
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1
    }
    updateCartTotal();
}

function addToCart(event)
{
    var buttonSelect = event.target
    var storeItem = buttonSelect.parentElement.parentElement

    var name = storeItem.getElementsByClassName("store-item-name")[0].innerText
    //console.log(title)
    var price = storeItem.getElementsByClassName("store-item-price")[0].innerText
    //console.log(price)
    var image = storeItem.getElementsByClassName("store-item-image")[0].src
    //console.log(image)


    designCart(name, price, image)
    updateCartTotal()
    


}

function designCart(name, price, image)
{
    var cartRow = document.createElement("div")

    

    var cartItems = document.getElementsByClassName("cart-items-all")[0]

    var cartItemNames = cartItems.getElementsByClassName("cart-item-name")
    for(var i = 0; i < cartItemNames.length; i ++)
    {
        if(cartItemNames[i].innerText == name)
        {
            alert("This item is already in your cart!")
            return
        }
    }

    cartRow.classList.add("cart-row")
    
    var cartRowContents = `<div class = "cart-item cart-column">
    <img class = "cart-item-image" src = ${image} >
    <span class = "cart-item-name">${name}</span>
    </div>
    
    <span class = "cart-price cart-column">${price}</span>
    
    <div class = "cart-quantity cart-column">
    <input class = "cart-quantity-input" type = "number" value = "1">
    <button class = "button button-danger" role = "button">REMOVE</button>
    </div>`

    cartRow.innerHTML = cartRowContents

    

    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName("button-danger")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)

}


function updateCartTotal()
{
    var cartItemContainer = document.getElementsByClassName("cart-items-all")[0]
    // returns an array, we only have 1 container, select element 0 
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")

    var total = 0;

    for (var i = 0; i < cartRows.length; i++)
    {
        var cartRow = cartRows[i];

        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]

        //console.log(priceElement, quantityElement)

        var price = priceElement.innerText

        if (price == "FREE")
        {
            price = 0;
        }
        else
        {
            price = parseFloat(price.replace("$", ""))
        }
        
        //console.log(price)

        var quantity = quantityElement.value

        total = total + (price * quantity)

        //console.log(total)
        
    }

    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total


    //var cartSection = document.getElementsByClassName("cart-section")[0].remove()
    
}