/*--------------Récupération et affichage des produits (articles)---------------------------------
    -le but est d'aller au JSONPlaceholder pour récupérer et afficher tous les produits
    -On utilise du java fonctionnel pour éviter de mettre des variable dans le socle de base 
    -3 fonctions principales
*/
/*--------------1-la fonction main pour contenir le code de base-------------------------------------------------------
    function main() contient le code de base qui va être excuter pour télécharger 
    la page  (récupération et d'affichage de tous les produits)
    premièrement il faut récupérer les données sur la web API de JSONPlacerholde grâce à la fonction getProducts() pour récupérer les données
    deuxièment afficher tous les produits grâce à la fonction displayProducts
*/

main()// on appel la fonction main

async function main(){// donc on transforme la fonction  en sync
    
    const products = await getProducts()//L'opérateur await permet d'attendre la résolution d'une promesse, il faut l'excuté que dans la fonction en asyncr  donc on transforme la fonction main en sync
        console.log(products) // pour verifier 

    window.onload = () => { // window.onload permet de charger la page avant que le code soit éxécut 
        //la boucle for permet d'afficher tous les objets dans la page web
        for (let i =0;  i< products.length; i++) {
            const product = products[i];
            displayProducts(product)  
        }
    }
}

//--------------2-la fonction getProducts() pour récuperer les produits-----------------------------------------------   
/*on récupére tous les produits  grâce à une fonction qu'on va appeler getProducts
    la Méthode fetch()returne une promesse, si elle passe et quand on pourra éxploiter
    et sans précision, elle utilise d'office la méthode get(c'est-à-dire rechercher les données sur le serveur)
    pour fectch,on va lui attacher une fonction qui doit excuter quand on récupéra les données
    cette fonction va prendre les paramètres de body de la réponse de HTTP (produits) 
    ce body va être transfomer au json /ce qu'on reçoi au final et on va le reterné
    on va le retourné dans un prochain then suivant
    il faut qu'on retourne une valeur, par contre ça va être retourné ou ?
    donc il faut retourné une promesse  dans ce cas et on rajoute un return
    au niveau de fetch , dans ce cas il va returner une promesse qui n'est pas résolue
    de fois il pourrait ne pas marché, donc on va mettre un .catch qui prend 
    une fonction avec une error  qui renvoie un méssage d'erreur à l'utilisateur 
    si notre fetch n'arrive pas à distination
*/    

function getProducts(){//on récupére tous les produits  grâce à une fonction qu' on va appeler getProducts
    
    //la Méthode fetch()returne une promesse, si elle passe et quand on pourra éxploiter
    // et sans précision, elle utilise d'office la méthode get(c'est-à-dire rechercher les données sur le serveur)
    return fetch('http://localhost:3000/api/products/')
    
    //pour fectch,on va lui attacher une fonction qui doit excuter quand on récupéra les données
    .then(function(response){//cette fonction va prendre les  paramètres de body de la réponse de HTTP (produits) //une fonction qui va excuter
        console.log(response);
        return response.json()//ce body va être transfomer au json /ce qu'on reçoi au final et on va le reterné
    })//on va le retourné dans un prochain then suivant
    .then(function(products){
        console.log(products)// on va mettre console.log pour verifier que mon fetch  marche bien,
        //des fois, il pourrait ne pas marché. donc on va mettre un .catch 
        
        //il faut qu'on retourne une valeur, par contre ça va être retourné ou ?
        return products  
        //donc il faut retourné une promesse  dans ce cas, on rajoute un return
        //au niveau de fetch , dans ce cas il va returner une promesse qui n'est pas résolue
    })  //des fois il pourrait ne pas marché, donc on va mettre un 
    
    //.catch qui prend une fonction avec une error 
    .catch(function(error){ //la méthode .catch() renvoie une erreur 
        window.alert(error)// donc on va afficher un méssage d'erreur à l'utilisateur si notre fetch n'arrive pas à sa distination 
    }) 
    
}
//--------3-la fonction displayProducts pour afficher les produits--------
    
function displayProducts(product){
    
    //Insertion de l'élément "a"
    let productLinks = document.createElement("a");
    document.querySelector(".items").appendChild(productLinks);
    productLinks.href = `product.html?id=${product._id}`;

    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    productLinks.appendChild(productArticle);

    // Insertion de l'image
    let productImg = document.createElement("img");
    productArticle.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    // Insertion du titre "h3"
    let productName = document.createElement("h3");
    productArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.innerHTML = product.name;

    // Insertion de la description "p"
    let productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.classList.add("productName");
    productDescription.innerHTML = product.description;
}
















