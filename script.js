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

/* ====================================================== RENDER GERICHTE ======================================================= */
function renderFoods() {

for (let i = 0; i < foods.length; i++) {
    let dishCategorie = foods[i]['categorie'];
    let dishTitle = foods[i]['title'];
    let dishDescription = foods[i]['description'];
    let dishPrice = foods[i]['price'];

    let contentFavorites = document.getElementById('favorites').innerHTML;
    let sushiMenues = document.getElementById('sushiMenues').innerHTML;

  if(dishCategorie.includes('Beliebt')) {
    document.getElementById('favorites').innerHTML += renderFoodsTemplate(i);

  } else if(dishCategorie.includes('Sushi Menüs')) {
    document.getElementById('sushiMenues').innerHTML += renderFoodsTemplate(i);
  }
}
}

function renderFoodsTemplate(i) {
    return `
              <div>
                <div class="foodTitle">
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="moreInformation()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
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

/* ====================================================== ALLERGIE INFO ======================================================= */
function moreInformation() {
document.getElementById('productInfoBackground').classList.add('showProductInfoBackground');
document.getElementById('productInfo').classList.add('showProductInfo');
}

function closeInfo() {
  document.getElementById('productInfoBackground').classList.remove('showProductInfoBackground');
  document.getElementById('productInfo').classList.remove('showProductInfo');
}

/* ====================================================== GERICHT ZUM WARENKORB HINZUFÜGEN ================================================ */
let basket = [];
let prices = [];
let amounts = [];
let amount = 1;
let mobileBasket = window.matchMedia('(max-width: 1025px)');

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

/* ====================================================== MOBILER WARENKORB ======================================================= */
function showMobileBasket() {
  if (mobileBasket.matches && basket.length > 0) {
    document.getElementById('overlayBasket').classList.add('showOverlayBasket');
    renderMobileBasket();
  } else {
    document.getElementById('overlayBasket').classList.remove('showOverlayBasket');
  };
}

setInterval(showMobileBasket, 500);

/* ====================================================== ARRAYS SPEICHERN / LADEN ======================================================= */
function save() {
  let basketAsText = JSON.stringify(basket);       
  localStorage.setItem('basket', basketAsText);     
  let pricesAsText = JSON.stringify(prices);
  localStorage.setItem('prices', pricesAsText);
  let amountsAsText = JSON.stringify(amounts);
  localStorage.setItem('amounts', amountsAsText);
}

function load() {
  let basketAsText = localStorage.getItem('basket');
  let pricesAsText = localStorage.getItem('prices');
  let amountsAsText = localStorage.getItem('amounts');

  if (basketAsText && pricesAsText && amountsAsText) {
    basket = JSON.parse(basketAsText);
    prices = JSON.parse(pricesAsText);
    amounts = JSON.parse(amountsAsText);
  }
}

/* ====================================================== RENDER WARENKORB ========================================================== */
function renderBasket() {
  let totalItemPrice = 0;
  let amount = 0;
  let price = 0;

  let basketContent = document.getElementById('basketContent');
 
  if(basket.length == 0){
    basketContent.innerHTML = emptyBasketContent();

  } else {
    basketContent.innerHTML = fullBasketTitle();

    for (let i = 0; i < basket.length; i++) {
      const item = basket[i];
      price = prices[i];
      let priceFormatted = price.toFixed(2).replace('.', ',');
      amount = amounts[i];

      totalItemPrice = prices[i] * amounts[i];
      let totalItemPriceFormatted = totalItemPrice.toFixed(2).replace('.', ',');
      
      basketContent.innerHTML += basketItems(amount, item, totalItemPriceFormatted, i);
    }
    renderBasketHint();
    renderBasektCalculation();
  }
}

function emptyBasketContent() {
  return `
      <div>
        <div>
          <h1 class="basketTitle">Warenkorb</h1>
        </div>
        <div class="close" onclick="closeBasket()">
          <img src="./img/icons/close.png">
        </div>
      </div>
      <div>
        <img src="./img/icons/einkaufstasche.png" alt="Icon einr Einkaufstasche" />
        <p>Fülle deinen Warenkorb</p>
        <p>
          Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle
          dein Essen.
        </p>
      </div>`;
} 

function fullBasketTitle() {
  return `
      <div>
        <div>
          <h1 class="basketTitle">Warenkorb</h1>
        </div>
        <div class="close" onclick="closeBasket()">
          <img src="./img/icons/close.png">
        </div>
      </div>`;
}

function basketItems(amount, item, totalItemPriceFormatted, i) {
  return `
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
                  <img onclick="deleteItemFromBasket(${i})" src="./img/icons/delete.png" alt="Icon eines Minus Zeichens"/>
                </div>
                <div>
                  <img onclick="removeItemFromBasket(${i})" src="./img/icons/minus.png" alt="Icon eines Minus Zeichens"/>
                </div>
                <div>
                  <img onclick="addItemToBasket(${i})" src="./img/icons/plus.png" alt="Icon eines Plus Zeichens"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
}

/* ====================================================== WARENKORB FUNKTIONEN ========================================================== */
function deleteItemFromBasket(i) {
  basket.splice(i, 1);
  prices.splice(i, 1);
  amounts.splice(i, 1);

  renderBasket();
  save();
}

function removeItemFromBasket(i) {
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

function addItemToBasket(i) {
amounts[i]++; 

renderBasket();
save();
}

/* ====================================================== RENDER WARENKORB LIEFERINFORAMTION ========================================================== */

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

/* ====================================================== RENDER WARENKORB BERECHNUNG ========================================================== */
function renderBasektCalculation(){
  let sum = 0;

  for(let i=0; i < prices.length; i++) {
    const product = (prices[i] * amounts[i]);
    sum += product;
  };

  totalSum = sum + 5;

  basketContent.innerHTML += showCalculation(sum, totalSum);
} 

function showCalculation(sum, totalSum) {
  return `
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

/* ====================================================== RENDER MOBILER WARENKORB ========================================================== */
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
    
    overlayBasket.innerHTML = showOverlayBasket(totalAmount, totalSum);
  }

  function showOverlayBasket(totalAmount, totalSum) {
    return `
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

/* ====================================================== MOBILER WARENKORB ANZEIGEN ========================================================== */
function fullSizeBasket() {
    let fullSizeBasket = document.getElementById('basketContent');
    fullSizeBasket.classList.add("fullSize");
  }

function closeBasket() {
  document.getElementById('basketContent').classList.remove('fullSize');
}



