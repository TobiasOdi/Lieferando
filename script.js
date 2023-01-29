/* =================================== RENDER FOODS ======================================= */
let foods = [

{   'categorie': 'Beliebt',
    'title': 'Mi Ga Chien Gion',
    'description': 'gebratene Nudeln mit paniertem Hühnerfleisch, Gemüse und Erdnusssauce',
    'price': 12.90
},

{   'categorie': 'Beliebt',
    'title': 'Mi Gon',
    'description': 'gebratene Nudeln mit, Gemüse und Erdnusssauce',
    'price': 9.90
},

{   'categorie': 'Beliebt',
    'title': 'Sake Avocado Maki',
    'description': 'mit Lachs und Avocado',
    'price': 4.70
},

{   'categorie': 'Sushi Menüs',
    'title': 'Menü (für 2 Personen)',
    'description': '2 Miso Soup, 8 Sake inside outs, 8 Sake Rolls, 8 Kani Rolls, 6 Sake Maki, 6 Clifornia Maki, 2 Sake Nigiri, 2 Maguro Nigiri',
    'price': 47.90
},

{   'categorie': 'Sushi Menüs',
    'title': 'Menü (für 4 Personen)',
    'description': '4 Miso Soup, 16 Sake inside outs, 16 Sake Rolls, 16 Kani Rolls, 12 Sake Maki, 12 Clifornia Maki, 4 Sake Nigiri, 4 Maguro Nigiri',
    'price': 90.00
},

{   'categorie': 'Sushi Menüs',
    'title': 'Fitness Menü',
    'description': '8 Inside Out mit verschiedenem Gemüse, 6 Makis Avocado (Vegetarisch)',
    'price': 12.90
}
]; 

function render() {

for (let i = 0; i < foods.length; i++) {
    let dishCategorie = foods[i]['categorie'];
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
                <div class="foodTitle">
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="openInfo()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
                  </div>
                  <div>
                    <img onclick="addToBasekt(${i})" src="./img/icons/plus.png" alt="" />
                  </div>
                </div>
                <div class="foodDescription">
                  <p>${foods[i]['description']}</p>
                </div>
                <div class="price">
                  <p>${foods[i]['price'].toFixed(2).replace('.', ',')}</p>
                  <p>€</p>
                </div>
              <div>`;
}

/* =================================== INFORMATION ÖFFNEN ======================================= */
function openInfo() {


}

/* =================================== GERICHT ZUM WARENKORB HINZUFÜGEN ======================================= */

let basket = [];
let prices = [];
let amounts = [];
let amount = 1;

let mobileBasket = window.matchMedia('(max-width: 1025px)')

function addToBasekt(i) {
let t = basket.indexOf(foods[i]['title']); // Index 0

if(t == -1) {
  basket.push(foods[i]['title']);
  prices.push(foods[i]['price']);
  amounts.push(amount);
} else {
  amounts[t]++;
}
  renderBasket();
  save();
}

setInterval(showMobileBasket, 500);

function showMobileBasket() {
  if (mobileBasket.matches && basket.length > 0) {
    document.getElementById('overlayBasket').classList.add('showOverlayBasket');
    renderMobileBasket();
  } else {
    document.getElementById('overlayBasket').classList.remove('showOverlayBasket');
  };
}

function save() {
  let basketAsText = JSON.stringify(basket);       
  localStorage.setItem('basket', basketAsText);     
  let pricesAsText = JSON.stringify(prices);
  localStorage.setItem('prices', pricesAsText);
  let amountsAsText = JSON.stringify(amounts);
  localStorage.setItem('amounts', amountsAsText);
}

function load() {
  let basketAsText = JSON.stringify(basket);       
  localStorage.setItem('basket', basketAsText); 
  let pricesAsText = JSON.stringify(prices);       
  localStorage.setItem('prices', pricesAsText); 
  let amountsAsText = JSON.stringify(amounts);       
  localStorage.setItem('amounts', amountsAsText); 
}

/* =================================== RENDER WARENKORB ======================================= */

function renderBasket() {
  let totalItemPrice = 0;
  let amount = 0;
  let price = 0;

  let basketContent = document.getElementById('basketContent');
  basketContent.innerHTML = '';

  if(basket.length == 0){

    basketContent.innerHTML = `
    <div>
        <h1>Warenkorb</h1>
        </div>
        <div>
          <img
            src="./img/icons/einkaufstasche.png"
            alt="Icon einr Einkaufstasche"
          />
          <p>Fülle deinen Warenkorb</p>
          <p>
            Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle
            dein Essen.
          </p>
    </div>`;
    
  } else {
    basketContent.innerHTML = `
    <div>
      <h1>Warenkorb</h1>
    </div>`;

    for (let i = 0; i < basket.length; i++) {
      const item = basket[i];
      price = prices[i];
      let priceFormatted = price.toFixed(2).replace('.', ',');
      amount = amounts[i];

      totalItemPrice = prices[i] * amounts[i];
      let totalItemPriceFormatted = totalItemPrice.toFixed(2).replace('.', ',');
      
      basketContent.innerHTML += `
    <div id="items" class="items">
      <div id="item" class="item">
        <div>
          <div>
            <div>
              <p>${amount}</p>
              <p>${item}</p>
            </div>
            <div>
              <p>${totalItemPriceFormatted}</p>
              <p class="eur">€</p>
            </div>
          </div>
          <div>
            <div>Anmerkung hizufügen</div>
            <div>
              <div>
                <img onclick="deleteFromBasket(${i})" src="./img/icons/delete.png" alt="Icon eines Minus Zeichens"/>
              </div>
              <div>
                <img onclick="removeFromBasket(${i})" src="./img/icons/minus.png" alt="Icon eines Minus Zeichens"/>
              </div>
              <div>
                <img onclick="addToBasket(${i})" src="./img/icons/plus.png" alt="Icon eines Plus Zeichens"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  renderBasketHint();
  renderBasektCalculation();
}
}

function renderBasketHint() {
  let sum = 0;
  let minOrder = 57;

  for(let i=0; i < prices.length; i++) {
    const product = (prices[i] * amounts[i]);
    sum += product;
  };

  if (sum <= minOrder) {
    basketContent.innerHTML += `
    <div id="hint" class="hint">
      <div>Benötigter Betrag, um den Mindestbestellwert zu erreichen</div>
      <div>
        <p>${minOrder.toFixed(2).replace('.', ',')}</p>
        <p>€</p>
      </div>
    </div>`;
  } else {
  };
}

function renderBasektCalculation(){
  let sum = 0;

  for(let i=0; i < prices.length; i++) {
    const product = (prices[i] * amounts[i]);
    sum += product;
  };

  totalSum = sum + 5;

  basketContent.innerHTML += `
  <div id="calculation" class="calculation">
      <div>
        <div>
          <div>
            <div>
              <p>Zwischensumme</p>
            </div>
            <div>
              <p>${sum.toFixed(2).replace('.', ',')}</p>
              <p class="eur">€</p>
            </div>
          </div>
          <div>
            <p>Lieferkosten</p>
            <p>5,00 €</p>
          </div>
          <div>
            <div>Gesamt</div>
            <div>
              <p>${totalSum.toFixed(2).replace('.', ',')}</p>
              <p class="eur">€</p>
            </div>
          </div>
        </div>
        <button type="button">Bezahlen (${totalSum.toFixed(2).replace('.', ',')} €)</button>
      </div>
    </div>`;
} 

function renderMobileBasket() {
    let overlayBasket = document.getElementById('overlayBasket');

    let totalAmount = 0;
    totalAmount = amounts.reduce((a, b) => a + b, 0);

    let sum = 0;
    for(let i=0; i < prices.length; i++) {
      const product = (prices[i] * amounts[i]);
      sum += product;
    };
    totalSum = sum + 5;

      overlayBasket.innerHTML = `
      <div>
        <button type="button" onclick="fullSizeBasket()">
          <div>
            <div>
              <div>
                ${totalAmount}
              </div>
            </div>
          </div>
          <div>
            Warenkorb (${totalSum.toFixed(2).replace('.', ',')} €)
          </div>
        </button>
      </div>`;
  }

function fullSizeBasket() {
    let fullSizeBasket = document.getElementById('basketContent');
    fullSizeBasket.classList.add("fullSize");
  }

function deleteFromBasket(i) {
    basket.splice(i, 1);
    prices.splice(i, 1);
    amounts.splice(i, 1);

    renderBasket();
    save();
  }

function removeFromBasket(i) {

    if(amounts[i] > 1) {
      amounts[i]--; 
    } else {
      basket.splice(i, 1);
      prices.splice(i, 1);
      amounts.splice(i, 1);
    }
    renderBasket();
    save();
  }

function addToBasket(i) {
  amounts[i]++; 
  
  renderBasket();
  save();
}

function openBasket() {
  document.getElementById('basketContent').classList.add('fullSizeBasket');
}
























