let enregistementDansLocalStorage = JSON.parse(localStorage.getItem("Articles"));

// AFFICHER LES PRODUITS DU PANIER DANS LA PAGE

let articlePanier = document.getElementById("article_panier");
let totalPrix = document.getElementById("total_prix");
const afficherProduitPanier = () => {
    if(enregistementDansLocalStorage === null) {
        //Si le panier est vide
        const divPanierVide = document.createElement("div");
        divPanierVide.className = "col text-center mx-4 h4 border px-3 py-3";
        divPanierVide.innerHTML = "Mon panier est vide";
        articlePanier.appendChild(divPanierVide);
    } else {
        //Si le panier n'est pas vide
        for(let i = 0; i < enregistementDansLocalStorage.length; i++) {
            let divInfo = document.createElement("div");
            divInfo.className = "border col-lg-4 rounded-0 mb-5 px-2 align-self-stretch";
            articlePanier.appendChild(divInfo);
        }