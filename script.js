const addtocart = document.querySelectorAll(".addtocart");
const buybutton =document.querySelector(".buybutton");
const cartarea =document.querySelector(".cartitems");
const cartdiv =document.querySelector(".cart");

let cart=[];
addtocart.forEach(button => {
    button.addEventListener("click",()=>{
        const div = button.parentElement;
        const name = div.querySelector(".name").textContent;
        const price = parseFloat(div.querySelector(".rupees").textContent.replace("₹",""));
        let stock = parseInt(div.querySelector(".quantity").textContent);
        if(stock>0){
            const existing = cart.find(n => n.name===name);
            if(existing){
                existing.quantity++;
            }
            else{
                cart.push({name,price,quantity:1});
            }
            div.querySelector(".quantity").textContent=--stock;
            updateCartDisplay()
        }
        else{
            alert(`${name} is OUT OF STOCK`);
        }
    })
});

function updateCartDisplay(){
    cartarea.innerHTML=""
    cart.forEach(element => {
        const newele=document.createElement("div");
        newele.textContent=`${element.name} - ₹${element.price} X ${element.quantity}`;
        cartarea.appendChild(newele);
    });

}

buybutton.addEventListener("click",()=>{
    function totalamount(){
        let amount=0;
        cart.forEach(element => {
            amount+=(element.price)*(element.quantity);
        });
        return amount;
    } 
    
    let incart=document.createElement("div");
    incart.classList.add('bill-section');
    incart.innerHTML =`<h3>BILL DETAILS</h3>
    <p>Total bill amount :₹${totalamount()}</p> 
    <div class="payment"><input type='checkbox'><label>GPAY</label><br>
    <input type='checkbox'><label>Cash on Delivery</label></div>
    <p class="note">*if not seleced payment option , it will be considered COD</p>
    <button class="order">PLACE ORDER</button>`
    cartdiv.appendChild(incart);

    const order=document.querySelector(".order");
    order.addEventListener("click",()=>{
        cart=[];
        updateCartDisplay();
        cartdiv.removeChild(incart);
        alert("ORDER PLACED");
        
    })

    addtocart.forEach(element => {
        element.addEventListener("click",()=>{
            cartdiv.removeChild(incart);
        })
    });
});