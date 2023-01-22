/* =================================== RENDER FOODS ======================================= */
let foods = [

{   'categorie': 'Beliebt',
    'title': 'Mi Ga Chien Gion',
    'description': 'gebratene Nudeln mit paniertem Hühnerfleisch, Gemüse und Erdnusssauce',
    'price': '12,90'
},

{   'categorie': 'Beliebt',
    'title': 'Mi Ga Chien Gion',
    'description': 'gebratene Nudeln mit paniertem Hühnerfleisch, Gemüse und Erdnusssauce',
    'price': '12,90'
},

{   'categorie': 'Sushi Menüs',
    'title': 'Menü (für zwei Personen)',
    'description': '2 Miso Soup, 8 Sake inside outs, 8 Sake Rolls, 8 Kani Rolls, 6 Sake Maki, 6 Clifornia Maki, 2 Sake Nigiri, 2 Maguro Nigiri',
    'price': '47,90'
},

{   'categorie': 'Sushi Menüs',
    'title': 'Menü (für zwei Personen)',
    'description': '2 Miso Soup, 8 Sake inside outs, 8 Sake Rolls, 8 Kani Rolls, 6 Sake Maki, 6 Clifornia Maki, 2 Sake Nigiri, 2 Maguro Nigiri',
    'price': '47,90'
}
]; 

function render() {

for (let i = 0; i < foods.length; i++) {
    let dishCategorie = foods[i]['categorie']
    let dishTitle = foods[i]['title'];
    let dishDescription = foods[i]['description'];
    let dishPrice = foods[i]['price'];

    let contentFavorites = document.getElementById('favorites').innerHTML;
    let sushiMenues = document.getElementById('sushiMenues').innerHTML;

  if(dishCategorie.includes('Beliebt')) {
    document.getElementById('favorites').innerHTML += renderTemplate(i);

  } else if(dishCategorie.includes('Sushi Menüs')) {
    document.getElementById('sushiMenues').innerHTML += renderTemplate(i);
  }
}
}

function renderTemplate(i) {
    return `
              <div>
                <div>
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="openInfo()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
                  </div>
                  <div>
                    <img onclick="addToBasekt(${i})" src="./img/icons/plus.png" alt="" />
                  </div>
                </div>
                <p>
                  ${foods[i]['description']}
                </p>
                <div class="price">
                  <p>${foods[i]['price']}</p>
                  <p>€</p>
                </div>
              <div>`;
}

/* =================================== OPEN INFO ======================================= */
function openInfo() {


}

/* =================================== ADD DISH TO BASKET ======================================= */

let basket = [];
let prices = [];
let amounts = [];

function addToBasekt(food, price) {
let index = basket.indexOf(food); // Index 0
if(index == -1) {

} else {
  amount[index]++
}
  
  names.push(name);
    
}


function renderBasket() {
  let container = document.getElementById('container');
  for (let i = 0; i < basket.length; i++) {
    const item = basket[i];
    const price = prices[i];
    const amount = amounts[i];

    let sum = 0;

    sum += prices[i] * amounts[i];

    container.innerHTML += `
      <div>
        ${amount} * ${item}: ${price}
      </div>

    `;

    
  }
}





function updateBasket () {
  let sum = 0;
  for (let i = 0; i < prices.length; index++) {
    const element = array[index];
      sum += prices[i];
}

  document.getElementById('').innerHTML = sum;

  let finalSum = sum + 5;

}














