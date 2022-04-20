//order()permet d'afficher un message de confirmation de commande dans la page confirmation 

function order(){
    //récupération de l'id de la commande éxistant dans le localStorage
    let orderId = localStorage.getItem("orderId");
    console.log(orderId)

    //séléction de l'élément de DOM 
    const dysplayOrderId = document.getElementById('orderId');

    //Afficher la "confirmation et la validation de la commande"
    dysplayOrderId.innerHTML = orderId;

    //vider le localStorage
    localStorage.clear();
    
}
order()
