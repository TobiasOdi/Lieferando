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

{   'categorie': 'Sushi Menüs',
    'title': 'Menü (für 2 Personen)',
    'description': '2 Miso Soup, 8 Sake inside outs, 8 Sake Rolls, 8 Kani Rolls, 6 Sake Maki, 6 Clifornia Maki, 2 Sake Nigiri, 2 Maguro Nigiri',
    'price': 47.90
},

{   'categorie': 'Sushi Menüs',
    'title': 'Menü (für 4 Personen)',
    'description': '4 Miso Soup, 16 Sake inside outs, 16 Sake Rolls, 16 Kani Rolls, 12 Sake Maki, 12 Clifornia Maki, 4 Sake Nigiri, 4 Maguro Nigiri',
    'price': 90.00
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
                  <p>${foods[i]['price']}</p>
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

function save() {
  let basketAsText = JSON.stringify(basket);       
  localStorage.setItem('basket', basketAsText);     
  let pricesAsText = JSON.stringify(prices);
  localStorage.setItem('prices', pricesAsText);
}

/* =================================== RENDER WARENKORB ======================================= */

function renderBasket() {
  let basketContent = document.getElementById('basketContent');
  basketContent.innerHTML = '';

  if(basket.length == 0){

    basketContent += `
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

    for (let i = 0; i < basket.length; i++) {
      const item = basket[i];
      const price = prices[i];
      let priceFormatted = price.toFixed(2).replace('.', ',');
      const amount = amounts[i];

      let totalItemPrice = prices[i] * amounts[i];
      let totalItemPriceFormatted = totalItemPrice.toFixed(2).replace('.', ',');

      //let sum = 0;
      //sum += prices[i] * amounts[i];
      //let totalSum = sum + 5;

      //let diff = 57 - totalSum;
      //let diffFormatted = diff.toFixed(2).replace('.', ',');

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
              <img onclick="addToBasket(${i})" src="./img/icons/minus.png" alt="Icon eines Minus Zeichens"
              />
              <img onclick="removeFromBasket(${i})" src="./img/icons/plus.png" alt="Icon eines Plus Zeichens"
              />
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
  //let sum = 0;
  //sum += prices[i] * amounts[i];
  //let totalSum = sum + 5;


  let diff = 57 
  
  //- totalSum;
  //if(diff <= 57) {
  //} else {
  //  document.getElementById('hint').classList.add('hide')
  //};

  basketContent.innerHTML += `

  <div id="hint" class="hint">
    <div>Benötigter Betrag, um den Mindestbestellwert zu erreichen</div>
    <div>
      <p>${diff.toFixed(2).replace('.', ',')}</p>
      <p>€</p>
    </div>
  </div>`;

}

function renderBasektCalculation(){

  let sum = 0;
  //sum += prices[i] * amounts[i];

  sum = prices.reduce((partialSum, a) => partialSum + a, 0);

  let totalSum = sum + 5;

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
            <p>5.00 €</p>
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





/* <div id="hint" class="hint">
<div>Benötigter Betrag, um den Mindestbestellwert zu erreichen</div>
<div>
  <p>${diffFormatted}</p>
  <p>€</p>
</div>
</div>

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
      <p>5.00 €</p>
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
</div> */

/* function renderBasketHint() {
  let diff = 57 - totalSum;
  //if(diff <= 57) {
  //} else {
  //  document.getElementById('hint').classList.add('hide')
  //};

  basketContent.innerHTML = `

  <div id="hint" class="hint">
    <div>Benötigter Betrag, um den Mindestbestellwert zu erreichen</div>
    <div>
      <p>${diff.toFixed(2).replace('.', ',')}</p>
      <p>€</p>
    </div>
  </div>`;

} */

/* function renderBasektCalculation(){

  let sum = 0;
  sum += prices[i] * amounts[i];
  let totalSum = sum + 5;

  basketContent.innerHTML = `
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
            <p>5.00 €</p>
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
} */














