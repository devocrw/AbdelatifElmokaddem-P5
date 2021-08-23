//////// RECUPERATION ID DE L'URL

const recuperationId = window.location.search;

//////// Affichage id seul sans ?id=

let leId = recuperationId.slice(4);

//////// AFFICHAGE PRODUIT DANS LA PAGE

// Tagger les elements div dans le HTML
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

