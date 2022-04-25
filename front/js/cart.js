(function (){
    let addProducts = JSON.parse(localStorage.getItem("product-ID"))
    basketDisplay ()
    deleteProduct (addProducts)
    modifyQtt (addProducts)
    totalQuantity (addProducts) 
    totalPrice(addProducts)
    dataForm ()
    getForm (addProducts)   
})()

//-----------------------Affichage des produits de panier --------------------------------------------------
//permet d'afficher les produits  du panier,déjà enregistré dans le localstorage

function basketDisplay (){
    
    //►1-Récupération des données du localStorage
     let addProducts = JSON.parse(localStorage.getItem("product-ID"))
    console.log(addProducts)

    // ►2-L'affichage des produits  du panier ,déjà enregistré dans le localstorage 
    //si le panier est vide == le local storage est vide:afficher votre panier est vide 
    //si le panier n'est pas vide ==le local storage contient de produits:afficher les produits dans le local storage  
    
    const positionElement = document.querySelector("#cart__items");
    console.log(positionElement);

    //►-afficher les produits dans le local storage  

    //si le panier est vide == le local storage est vide:afficher votre panier est vide 
    
    if(addProducts === null || addProducts == 0)
    {
        
        //►message le panier est vide sur la page panier
            structurePanierVide =`<div class="limitedWidthBlock" id="limitedWidthBlock">
            <div class="cartAndFormContainer" id="cartAndFormContainer">
            <h1>Votre panier est vide</h1>`
            console.log(structurePanierVide);   
            positionElement.innerHTML = structurePanierVide;
            
        //►Afficher le message d'alert
            window.confirm(`Votre panier est vide,veuillez ajouter des produits pour continuer,cliquez sur OK`);
            window.location.assign("index.html");
               

    //si le panier n'est pas vide ==le local storage contient de produits:afficher les produits dans le local storage  
    }else { 
        
        structurePanier=`<div class="limitedWidthBlock" id="limitedWidthBlock">
        <div class="cartAndFormContainer" id="cartAndFormContainer">
        <h1>Votre panier</h1>`
        positionElement.innerHTML = structurePanier
        //►-L'affichage des produits du panier
        let structureProduitsPanier = [];

        for (let k = 0; k < addProducts.length; k++){
            structureProduitsPanier += `
                <article class="cart__item" data-id="${addProducts[k]._id}" data-color="${addProducts[k].option_product}">
                <div class="cart__item__img">
                <img src="${addProducts[k].imageUrl}" alt="${addProducts[k].altTxt}">
                </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${addProducts[k].name}</h2>
                    <p>${addProducts[k].option_product}</p>
                    <p>${addProducts[k].price}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté :</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${addProducts[k].quantite}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
                </div>
            </article> 
                `;

            //injection de l'html dans la page panier
            const positionElement1 = document.querySelector("#cart__items")
            positionElement1.innerHTML = structureProduitsPanier;
        }         
    }   
}
//---------------------------Supprimer un produit----------------------------------------------- 
//permet  de supprimer  les produits  sélectionnés dans la page panier
function deleteProduct (addProducts){
    //sélection de tous les buttons supprimer
    const deleteItem = document.querySelectorAll(".deleteItem");
     console.log(deleteItem);
    // c'est une sorte de liste, cela signifie on peut  également utiliser une boucle sur l'élément.
    //il faut attacher un écouteur d'événement à chaque élément en utilisant une boucle
   
    for (let l=0; l<deleteItem.length; l++){

        deleteItem [l].addEventListener("click",(event) =>{
           event.preventDefault;
        
            const id_deletProduct = addProducts[l]._id
            console.log("id_deletProduct");
            console.log(id_deletProduct);

            const option_deletProduct = addProducts[l].option_product 
            console.log("option_deletProduct");
            console.log(option_deletProduct);
            
        //avec la méthode filter on sélectionne les produits à garder ou on supprime le produit ou le button supprimer a été cliqué
    
            addProducts = addProducts.filter(el =>
                el.option_product !== option_deletProduct ||
                el._id != id_deletProduct 
            );
            console.log(addProducts);   
          
        //vider le local puis y remettre le tableau mis à jour
            localStorage.removeItem("product-ID");

        // envoyer les nouvelles données dans le localStorage
            localStorage.setItem("product-ID",JSON.stringify(addProducts));
        
        //pop up alert pour avertir que le produit a été supprimer et rechargement de la page  
            alert("le produit a éte bien supprimé")
            window.location.href = "cart.html"
        //Si pas de produits dans le local storage on affiche que le panier est vide
           if (addProducts.length === 0) {
            localStorage.clear();
        }
        //Rechargement rapide de la page
            location.reload();
        });            
    }                    
}

//-----------------------------Modifier la quantité----------------------------------
/*Permet de selectionner l'element à modifier en fonction de son id ET sa couleur
en attachant  un écouteur d'événement à chaque élément pour récupérer la nouvelle valeur de la quantité modifiée
puis on vide le localStorage pour remettre le tableau à jour
en lui envoyant  les nouvelles données. 
*/
function modifyQtt(addProducts) {
     //sélection de tous les buttons quantité
    let quantityChange = document.querySelectorAll(".itemQuantity");
    for (let k= 0; k < quantityChange.length; k++){
        quantityChange[k].addEventListener("change" , (event) => {
            event.preventDefault();

            // séléctionner le produit à modifier en fonction de son id ET sa couleur
            const foundProduct = addProducts.find(
                (el) => el.newQttValue !== addProducts[k].quantite 
                && el.option_product == addProducts[k].option_product);
            
            // la nouvelle valeur de la quantité modifiée
            let newQttValue = quantityChange[k].valueAsNumber;
            console.log(newQttValue) 

            foundProduct.quantite = newQttValue;
            addProducts[k].quantite = foundProduct.quantite;

            //vider le local puis y remettre le tableau mis à jour
            localStorage.removeItem("product-ID");
            
            // envoyer les nouvelles données dans le localStorage
            localStorage.setItem("product-ID",JSON.stringify(addProducts));
        
            //Rechargement rapide de la page
            location.reload();            
        });
    };
}

//-----------------------------Le prix total--------------------------------------
/*Déclaration de la variable pour pouvoir y mettre les prix des produits déjà séléctionnés
-boucle pour aller chercher les prix  des produits dans le panier 
-Mettre les prix des produits du panier dans la variable totalPrice
-Faire le calcul total (addition) de tous les prix des produits du panier (totalPrice)
-Affichage de price
*/
function totalPrice(addProducts) {
    let totalCartPrice = 0;
    for (let j = 0; j < addProducts.length; j++) {
        totalCartPrice = totalCartPrice + (addProducts[j].price * addProducts[j].quantite);
    }
    //--------------------------------affichage de price----------------------------------

    let DysplaytotalPrice = document.getElementById('totalPrice');
    DysplaytotalPrice.textContent = totalCartPrice;

}

//----------------------------La quantité totale-----------------------------------
/*créer un tableau vide pour pouvoir y mettre les valeurs de la quantité des des produits du panier 
-boucle pour aller chercher les valeurs de la quantité des des produits du panier dans le panier
-Pousser les valeurs de la quantité des produits du  panier  dans le tableau (variable totalQuantities)
-Faire le calcul total (addition) de toutes  les valeurs de la quantité des produits du panier (QteTotal)
*/
function totalQuantity (addProducts){
    //créer un tableau vide pour pouvoir y mettre les valeurs de la quantité des des produits du panier 
    let totalQuantities = [];
    //boucle pour aller chercher les valeurs de la quantité  des produits du panier 
    for (let m = 0; m <addProducts.length; m++) {
        QuantiteProductBasket = addProducts[m].quantite
        console.log(QuantiteProductBasket) 
    //Pousser les valeurs de la quantité des produits du  panier  dans le tableau (variable totalQuantities)
        totalQuantities.push(QuantiteProductBasket)
        console.log("Tous les quantitées stockées dans 'totalQuantities'", totalQuantities);

    //Faire le calcul total (addition) de toutes  les valeurs de la quantité des produits du panier (QteTotal)
        const QteTotal = (accumulator, curentValue) => accumulator + curentValue;
        console.log(QteTotal)

    // si le panier est vide, la quantité totale est "0"
        const totalCartQuantite = totalQuantities.reduce(QteTotal,0);
        
        console.log("Total Quantité Panier", totalCartQuantite)
    //--------------------------------Quantité HTML----------------------------------
        let DisplaytotalQuantity = document.getElementById('totalQuantity');
        DisplaytotalQuantity.textContent = totalCartQuantite;
    }
}

//---------------------Formulaire de contact-----------------------------------
//permet d'afficher le formulaire de contact
function dataForm(){
//séléction de l'élément de DOM pour le position de formulaire
        const formDisplay = document.querySelector(".cart")
        console.log(formDisplay)
//injection Html
        formDisplay.insertAdjacentHTML('beforeend',`
        <div class="cart__order">
            <form method="get" class="cart__order__form">
            <div class="cart__order__form__question">
                <label for="firstName">Prénom: </label>
                <input type="text" name="firstName" id="firstName" required>
                <p id="firstNameErrorMsg"></p>
            </div>
            <div class="cart__order__form__question">
                <label for="lastName">Nom: </label>
                <input type="text" name="lastName" id="lastName" required>
                <p id="lastNameErrorMsg"></p>
            </div>
            <div class="cart__order__form__question">
                <label for="address">Adresse: </label>
                <input type="text" name="address" id="address" required>
                <p id="addressErrorMsg"></p>
            </div>
            <div class="cart__order__form__question">
                <label for="city">Ville: </label>
                <input type="text" name="city" id="city" required>
                <p id="cityErrorMsg"></p>
            </div>
            <div class="cart__order__form__question">
                <label for="email">Email: </label>
                <input type="email" name="email" id="email" required>
                <p id="emailErrorMsg"></p>
            </div>
            <div class="cart__order__form__submit">
                <input type="submit" value="Commander !" id="order">
            </div>
            </form>
        </div>
        `)     
}

//----------------------------le Formulaire--------------------------------------
//récupérer les valeurs de  formulaire et les mettre dans localstorage------------
//Controle validation formulaire du champ avant envoi dans local storage-----------
//Validation selon une expression régulière RegEX et affichage de message d'erreur
//l'autoraisation d'envoie et la validation de formulaire
function getForm(addProducts) {
   
    class form {
        constructor() {
            this.firstName = document.querySelector("#firstName").value;
            this.lastName = document.querySelector("#lastName").value;
            this.address = document.querySelector("#address").value;
            this.city = document.querySelector("#city").value;
            this.email= document.querySelector("#email").value;
            //this.input = document.querySelector(`#${input}`).value;
        };
    };
    //appel l'instance class de formulaire (form) pour créer "contact"
    const contact = new form(); 
    console.log(contact)

    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
        event.preventDefault();
    
    //créer une class pour créer un objet ou mettre les values de formulaire 
        class form {
            constructor() {
                this.firstName = document.querySelector("#firstName").value;
                this.lastName = document.querySelector("#lastName").value;
                this.address = document.querySelector("#address").value;
                this.city = document.querySelector("#city").value;
                this.email= document.querySelector("#email").value;
                //this.input = document.querySelector(`#${input}`).value;
            };
        };
        //appel l'instance class de formulaire (form) pour créer "contact"
        const contact = new form(); 
        console.log(contact)

        /*--------------------La gestion de formulaire--------------------
            -il faut s'assurer que les données misent dans un formulaire par un utilisateur
            sont dans un format correct pour pouvoir être traitées correctement et qu'elles ne 
            vont pas casser nos applications
            -Validation selon une expression régulière RegEX
        */
        const regExFirstLastNameCity = (value) =>{
            var reg = /^[A-Za-z\s]{3,50}$/;
            return reg.test(value)
        }; 
        const regExAddress = (value) =>{
            var regEx = /^[A-Za-z0-9\s]{3,80}$/;
            return regEx.test(value);
        }; 

        const regExEmail = (value) =>{
            var regExEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;     
            return regExEmail.test(value);
        }; 

//-prénom et nom du formulaire pour la validation du champ avant envoi---------------------  
//-------et afficher le message d'erreur à chaque champ-------------------------
        /*Exemple:contrôle la validité de prénom = pas de chiffres ou de caractères la limite de lettre 
        on va utiliser Regex (expression régulière) et la méthode teste    
        let regEx = /^[A-Za-z]{3,50}$/;
        return (regEx.test(value))
        [A-Zaz]il contrôle que les caractères de AZ(maj et min),si il trouve symbole , il return false
        un quantificateur {3,23}(nombre de caractère est limité entre 3 et 20)
        */
        
        function FirstNameControlValider(){
        //Chercher la value à contrôler
            let theFirstName = contact.firstName;
            console.log(theFirstName)
            //contrôler la validité de champ FirstName de formulaire 
            if(regExFirstLastNameCity(theFirstName)){
                document.getElementById("firstNameErrorMsg").textContent = "";
                //document.querySelector(`${firstNameErrorMsg}`).textContent = "";
                console.log("ok")
                return true;
            }else{  
                console.log("ko")
                document.getElementById("firstNameErrorMsg").textContent = "Veuillez bien remplir ce champ \n Chiffres et symboles ne sont pas autorisé \n Nombre de caractères entre (3 et 50).";
                return false;
            }    
        }; 
        
        function LastNameControlValider(){
            let theLastName = contact.lastName;
            if(regExFirstLastNameCity(theLastName)){
                document.getElementById("lastNameErrorMsg").textContent = "";
                return true;
            }else{ 
                document.getElementById("lastNameErrorMsg").textContent = "Veuillez bien remplir ce champ \n Chiffres et symboles ne sont pas autorisé \n Nombre de caractères entre (3 et 50)";
                return false;
            }
        };  
//-------ville du formulaire pour la validation du champ avant envoi------------------------  
        
        function CityControlValider(){
            let theCity = contact.city;
            if(regExFirstLastNameCity(theCity)){
                document.getElementById("cityErrorMsg").textContent = "";
                return true;
            }else{ 
                document.getElementById("cityErrorMsg").textContent = "Veuillez bien remplir ce champ.";
                return false;
            }
        };  
//-------address postale du formulaire pour la validation du champ avant envoi-------------  
        
        function AddressControlValider(){
            let theAddress = contact.address;
                if(regExAddress(theAddress)){
                    console.log("true")
                    document.getElementById("addressErrorMsg").textContent = "";
                    return true;
                }else{ 
                    console.log("true")
                    document.getElementById("addressErrorMsg").textContent = "Veuillez bien remplir ce champ. \n L'adresse doit contenir que des lettres sans ponctuation et des chiffres";
                    return false;
                }
        };  
//-------address mail du formulaire pour la validation du champ avant envoi-------------  
 
        function EmailControleValider(){
            let theEmail = contact.email;
            if(regExEmail(theEmail)){
                document.getElementById("emailErrorMsg").textContent = "";
                return true;
            }else{
                document.getElementById("emailErrorMsg").textContent = "Veuillez bien remplir ce champ.";
                return false   
            }
        };

//--------------l'autoraisation d'envoie et la validation de formulaire------------------------------
    //on bloque l'envoie de formulaire dans le cas n'est pas remplit: si le formulaire est bon(tous les champs sont bien remplit)
    // (controlValiderFirstName() && controlValiderLastName() && controlValiderAddress() && controlValiderCity() && controleValiderMail()){

        if (FirstNameControlValider() && LastNameControlValider() && AddressControlValider() && CityControlValider() && EmailControleValider()){
            //envoi objet de contact dans le localStorage
            localStorage.setItem("contact",JSON.stringify(contact)) 
            
            //---envoi des données de sendFormData dans le serveur----------------------
   
            //Construction d'un array d'id depuis le local storage
            let products = [];
            for (let i = 0; i<addProducts.length;i++) {
                products.push(addProducts[i]._id);
            }
            console.log(products);
        
            // On met les valeurs du formulaire et les produits sélectionnés
            // dans un objet...
            console.log("l'objet sendFormData contient produits et le formulaire")

            const sendFormData = {
                contact,
                products
            }
        
            // on envoie le formulaire + les produits enregistrer dans localStorage (sendFormData) 
            // on envoie au serveur
        
            const options = {
            method: 'POST',
            body: JSON.stringify(sendFormData),
            headers: { 
                'Content-Type': 'application/json',
                }
            };
        
            fetch("http://localhost:3000/api/products/order", options)
                .then(response => response.json())
                .then(data => {
                localStorage.setItem('orderId', data.orderId);
                document.location.href = 'confirmation.html?id='+ data.orderId;
                })
                .catch(error => alert("Erreur!"));
        }else{ 

        }        
    });        
//----------------------------Fin de validation de formulaire--------------------------------       
//---Remplir les champs du formulaire automatiquement avec les valeurs du local storage
//---pour éviter de perdre les champs déjà saisie dans le formulair.
//------------mettre le contenu de le local storage dans le formualire------------------
        
            //Récupérer la clé dans le localStorage et la mettre dans une variable 
                const dataLocalStorage = localStorage.getItem("contact")
            //Convertir la chaîne de caractère en objet javascript   
                const localStorageForm = JSON.parse(dataLocalStorage)
                    console.log("localStorageForm") 
                    console.log(localStorageForm)   
         
            // //une fonction pour que le champ de formulaire soit remplit par les données de lecal storage 
        
                function formInputLocalStorage (input){
                    if(localStorageForm  == null){
                        console.log("le local storage à pour valeur null");
                    }else{
            //Récupérer la clé de local storage et le mettre dans une variable
                        document.querySelector(`#${input}`).value = localStorageForm[input]; 
                    }     
                }
                formInputLocalStorage ("firstName"),
                formInputLocalStorage ("lastName"),
                formInputLocalStorage ("address"),
                formInputLocalStorage ("city"),
                formInputLocalStorage ("email")
}   

   
