
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

document.getElementById('content').innerHTML = '';

for (let i = 0; i < foods.length; i++) {

    let dishTitle = foods[i]['title'];
    let dishDescription = foods[i]['description'];
    let dishPrice = foods[i]['price'];

    
    document.getElementById('content').innerHTML += renderTemplate(i);
}
}

function renderTemplate() {
    return `
    <div>
            <div class="categorie">
              <h1>Beliebt</h1>
              <div>
                <div>
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="openInfo()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
                  </div>
                  <div>
                    <img onclick="addDish()" src="./img/icons/plus.png" alt="" />
                  </div>
                </div>
                <p>
                  ${foods[i]['description']}
                </p>
                <div class="price">
                  <p>${foods[i]['price']}</p>
                  <p>€</p>
                </div>
              </div>

              <div>
                <div>
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="openInfo()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
                  </div>
                  <div>
                    <img onclick="addDish()" src="./img/icons/plus.png" alt="" />
                  </div>
                </div>
                <p>
                  ${foods[i]['description']}
                </p>
                <div class="price">
                  <p>${foods[i]['price']}</p>
                  <p>€</p>
                </div>
              </div>
            </div>

            <div class="categorie">
              <h1>Sushi Menüs</h1>
              <div>
                <div>
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="openInfo()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
                  </div>
                  <div>
                    <img onclick="addDish()" src="./img/icons/plus.png" alt="" />
                  </div>
                </div>
                <p>
                  ${foods[i]['description']}
                </p>
                <div class="price">
                  <p>${foods[i]['price']}</p>
                  <p>€</p>
                </div>
              </div>

              <div>
                <div>
                  <div>
                    <h1>${foods[i]['title']}</h1>
                    <img onclick="openInfo()" src="./img/icons/information (1).png" alt="icon eines Informationssymbols"/>
                  </div>
                  <div>
                    <img onclick="addDish()" src="./img/icons/plus.png" alt="" />
                  </div>
                </div>
                <p>
                  ${foods[i]['description']}
                </p>
                <div class="price">
                  <p>${foods[i]['price']}</p>
                  <p>€</p>
                </div>
              </div>
            </div>
          </div>`;
}










function openInfo() {


}

function addDish() {

    
}














