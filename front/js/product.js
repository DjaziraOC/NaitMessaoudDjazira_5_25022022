main()
async function main(){
    
    const product_id = getUrlId();
    console.log("la valeur de l'id de produit séléctionnée"); 
    console.log(product_id);
    

    const productSelected = await  getProductSelected(product_id)//L'opérateur await permet d'attendre la résolution d'une promesse, il faut l'excuté que dans la fonction en asyncr  donc on transforme la fonction main en sync
    console.log(productSelected) // pour verifier 

    window.onload = () => { 
        displayProductSelected(productSelected)
        addToBasket(productSelected)       
    }

}
//----------------------Récupération id depuis l'url----------------------------------
/*
-Faire le lien entre un produit de la page d’accueil et la page Produit
-Ajouter la valeur de  l'attribut  de l'id à l'url pour faire le lien entre le produit 
cliquable (page index.js)et la page product,
-Récupération id depuis l'url-extraction id depuis la chaîne de requête-query string et
-le  mettre dans une variable pour pouvoir l'utiliser et récupérer les objets.
    ►1--------------Récupération de la chaine de requête (après le point?) dans l'url: 
                        dans l'url:window.location.search
    ►2-------------Obtention de la valeur de  l'attribut l'id, on a 2 méthodes-------
                        ► la méthode URLSearchParams() avec la méthode get
                        ► la méthode .slice()
*/

function getUrlId(){
//► la méthode URLSearchParams()                        
    const querySring_Url_id = window.location.search; // .search est méthode réservée  pour le java ?
    console.log(querySring_Url_id) //?id=107fb5b75607497b96722bda5b50
   
    const urlParams = new URLSearchParams(querySring_Url_id)
    console.log(urlParams)// l'objet URLSearchParams{}
    
    const get_url_id = urlParams.get("id")
    return (get_url_id)
  
    /*code simplifié
       const get_url_id= new URLSearchParams (window.location.search).get("id")
       return get_url_id
    */  
    /*►la méthode .slice()// :permet d'enlever des lettres, des mots   
        const get_url_id = window.location.search.slice(4)
        return get_url_id
    */
    /*►la méthode .split()//
    const get_url_id = window.location.search.split('?').join("");
    console.log(get_url_id)
*/
}

/*-----------Récupération d'un objet par le biais de sa clé--------------  
    ►avec fetch/GET en mettant la valeur de l'id à la fin de URL
*/
function getProductSelected(product_id){

    return fetch(`http://localhost:3000/api/products/${product_id}`)
    .then(function(response){//cette fonction va prendre les  paramètres de body de la réponse de HTTP (produits) //une fonction qui va excuter
        console.log(response);
        return response.json()//ce body va être transfomer au json /ce qu'on reçoi au final et on va le reterné
    })//on va le retourné dans un prochain then suivant
    .then(function(products){
        console.log(products)
        return products  
    })  
    .catch(function(error){ //la méthode .catch() renvoie une erreur 
        window.alert(error)// donc on va afficher un méssage d'erreur à l'utilisateur si notre fetch n'arrive pas à distination 
    })         
}

//------Insérer et afficher un produit et ses détails dans la page product-------------
/*la fonction displayProductSelected permet d'afficher les produits séléctionnés-------------------------------------------------------
        -sélectionner la classe ou on va  injecter  le code html
        -la structure html pour l'affichage du produit sélectionné
        -injection de html dans la page product  
*/
function displayProductSelected(productSelected){
   
    position1 = document.querySelector(".item");
    position1.innerHTML = 
        `<article>
            <div class="item__img">
            <img src="${productSelected.imageUrl}"  alt="${productSelected.altTxt}">

            </div>
            <div class="item__content">
            <div class="item__content__titlePrice">
                <h1 id="title">${productSelected.name}</h1>
                <p>Prix : <span id="price"> ${productSelected.price.toString().replace(/0+$/, "")}</span>€</p>
            </div>
            <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${productSelected.description}</p>
            </div>

            <div class="item__content__settings">
                <div class="item__content__settings__color">
                    <label for="color-select">Choisir une couleur :</label>
                    <select name="color-select" id="colors">
                        <option value="">--SVP, choisissez une couleur --</option>
    <!--                       <option value="vert">vert</option>
                               <option value="blanc">blanc</option> -->
                    </select>
                </div>

                <div class="item__content__settings__quantity">
                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
            </div>

            <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
            </div>

            </div>
        </article>   
    `;
    /*Récuperation et affichage la liste déroulante des choix de couleur séléctionnées  pour chaque
    produit cliqué par l'utilisateur 
        -Le formulaire s'adapte au nombre d'option qu'il y a dans l'anglet du produit
        -obtenir la valeur de  l'attribut  de d'option de produit séléctionné et le 
        -mettre dans une variable pour pouvoir l'utiliser pour récupérer les options de produit séléctionné .
    */
    
    //créer et séléctionner la variable de la liste déroulante pour le choix de couleur dont l'id est "colors"
    let selectForm = document.getElementById("colors")
    console.log(selectForm)
   
    //productSelected.colors)renvoi un tableau avec plusieurs éléments 
    console.log(productSelected.colors) 
    //faire une boucle avec la méthode forEach pour le tableau pour 
    productSelected.colors.forEach((colors) => {//boucle for pour afficher toutes les options du produit
        //créer la balise l'option qui est vide 
        document.createElement("option"); //il faut faire un tour de boucle 
        // créer une varible productOption pour stocker (document.createElement("option"))
        let productOption = document.createElement("option")
        //placer productOption comme enfant de la balise selectForm  
        selectForm.appendChild(productOption);
        // incrémentation  de la variable "productOption" dans la value
        productOption.value = `${colors}`;
        //afficher les choix de couleur (les options)
        productOption.innerHTML = `${colors}`;
    });
    
}

//---------------------Ajouter un produit séléctionner au panier--------------------------------------------------
/*la fonction permet envoyer les produits séléctionnés par l'utilisateur
et les stockés dans le localStorage au panier 
*/
function addToBasket (productSelected){
    //►sélection du bouton Ajouter au panier 
    const addToCart = document.getElementById('addToCart'); // On récupère l'élément sur lequel on veut détecter le clic
    console.log(addToCart)
    //►Ecouter et envoyer le panier 
    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    addToCart.addEventListener("click",(event)=>{ // On écoute l'événement click, notre fonction prend un paramètre que nous avons appelé event ici
        //La méthode preventDefault(),rattachée à l'interface Event, indique à évite de recharger la page quand on click sur un boutton*/
        event.preventDefault();
        localStorageProduct (productSelected);     
    });   
}
//----------------------------le local storage------------------------------------------
//la fonction localStorage gère la récupération et le stockage des valeurs des objets séléctionnés
//on peut accéder à ces valeurs avec les méthodes getItem() et setItem().                                                                                                        

/*avant de mettre les données de localStorage, il faut déjà vérifier à l'intérieur si
on n'a pas de donnée pour faire celà il faut: 
aller au locaStorage par le biai de la méthode getItem pour allaer lire la key produit
on rajoute json.parse c'est pour convertir les données au format Json qui sont dans le local storage en objet javascript
*/

function localStorageProduct(productSelected) {
    
    const colorProduct = document. querySelector("#colors");
    const quantity = document.querySelector("#quantity");

    if (quantity.value > 0 && quantity.value <=100 && quantity.value != 0 && colorProduct != 0){

        //Recupération du choix de la couleur
        let optionColors = colorProduct.value;
                    
        //Recupération du choix de la quantité
        let quantityChoice = quantity.value;

        //Récupération des options de l'article à ajouter au panier
        let product = {
            _id:productSelected._id,
            option_product: optionColors,
            quantite:Number(quantityChoice),
            name: productSelected.name,
            price: productSelected.price.toString().replace(/0+$/, ""),
            description: productSelected.description,
            imageUrl: productSelected.imageUrl,
            altTxt: productSelected.altTxt
        };

        //on enregistre tous ce qu'on récupère dans le local storage dans une varible basket                  
        //Initialisation du local storage
        let basket  = JSON.parse(localStorage.getItem("product-ID"));
        console.log(basket);//null
        //fenêtre pop-up
        const popupConfirmation =() =>{
            if(window.confirm(` Un nouveau produit de ${quantityChoice} ${productSelected.name} ${optionColors} a été ajouté au panier ! Pour consulter votre panier, cliquez sur OK`)){
                window.location.assign("cart.html");
            }
        }

        //Importation dans le local storage
        //Cas:on a un ou moins un produit dans le localStorage
        if (basket) {
            /*si l'id de produit existant dans le localStorage est le meme 
            id de produit affiché sur la page && la teinte de même produit
            existant dans le localStorage est la même teinte de produit 
            affiché sur la page produit */
            const foundProduct =basket.find(
            (p) => p._id === productSelected._id && p.option_product === optionColors);
            //Si le produit commandé est déjà dans le panier
            if (foundProduct) {
                //on va lui indiquer une nouvelle instruction 
                //on incrémente la quantité
                let newQuantite =
                parseInt(product.quantite) + parseInt(foundProduct.quantite);
                console.log(newQuantite)

                //une fois le code est exécuté,la nouvelle quantité sera ajouté
                //on envoi le tableau basket dans le localStorage puis on le stringify
                foundProduct.quantite = newQuantite;
                //une fois le code est exécuté,la nouvelle quantité sera ajouté
                //on envoi le tableau basket dans le localStorage puis on le stringify
                localStorage.setItem("product-ID", JSON.stringify(basket));
                
                //on récupère le tableau basket qui sera égal au nouveau localStorage modifié 
                basket = JSON.parse (localStorage.getItem("product-ID")),
                console.log(basket);

                //pop-up alert 
                window.confirm(`La quantité de votre produit de ${quantityChoice} ${productSelected.name} ${optionColors} a été modifié.Pour consulter votre panier, cliquez sur OK`)
                window.location.assign("cart.html");
                      
            //Si le produit commandé n'est pas dans le panier
            } else {
                // on pousse le produit dans le tableau 
                basket.push(product);

                //envoyer le tableau dans le localStorage
                localStorage.setItem("product-ID", JSON.stringify(basket));

                //on récupère le tableau basket qui sera égal au nouveau localStorage modifié 
                basket = JSON.parse (localStorage.getItem("product-ID")),
                console.log(basket);
                
                //pop up alerte 
                popupConfirmation();
            }
        //cas: le localStorage est vide 
        } else {
            //basket est un tableau vide 
            basket =[];
            
            //on pousse le produit dans le tableau vide
            basket.push(product);// on pousse le produit dans le tableau vide
            
            //envoyer le tableau dans le localStorage
            localStorage.setItem("product-ID", JSON.stringify(basket));
            
            //on récupère le tableau basket qui sera égal au nouveau localStorage modifié 
            basket = JSON.parse (localStorage.getItem("product-ID")),
            console.log(basket);

            //pop up alerte 
            //alert("Un nouveau produit a été ajouté au panier !")
            popupConfirmation();
        }
    }   
}



