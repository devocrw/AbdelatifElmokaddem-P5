//////// RECUPERATION ID DE L'URL

const recuperationId = window.location.search;

//////// AFFICHAGE ID SEUL SANS ?id=

let leId = recuperationId.slice(4);

//////// AFFICHAGE PRODUIT DANS LA PAGE

// Tagge les div dans le HTML
let monProduit = document.getElementById("monproduit");
let idArticle = document.getElementById("id_article");
let imgProduit = document.getElementById("imgproduit");
let nameArticle = document.getElementById("name_article");
let descriptionArticle = document.getElementById("description_article");
let choixLentilles = document.getElementById("choix_lentilles");
let priceArticle = document.getElementById("price_article");
let selectOption;
const btnEnvoiPanier = document.getElementById("btn_envoyer");
let spanConfirmationOption = document.getElementById("ma_selection");
let inputQuantite = document.getElementById("quantite");

// connexion avec Fetch et ajout infos du produit dans le HTML
const recupDonneesArticle = async () => {
    await fetch(`http://localhost:3000/api/cameras/${leId}`)

        .then((response) => {
            const idData = response.json();
            idData.then((arrayId) => {
                imgProduit.src = arrayId.imageUrl;
                idArticle.innerHTML = "Référence : " + leId;
                nameArticle.innerHTML = arrayId.name;
                descriptionArticle.innerHTML = arrayId.description;
                let prixEuro = arrayId.price;
                let prixCentimes = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixEuro / 100);
                priceArticle.innerHTML = prixCentimes;
            }

        

 //////// ENVOI ARTICLE DANS LE LOCALSTORAGE

      // Ecouter btn " Ajouter au panier "
      btnEnvoiPanier.addEventListener("click", (e) => {
        e.preventDefault();
