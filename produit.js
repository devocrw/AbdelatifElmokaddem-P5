//////// RECUPERATION ID DE L'URL

const recuperationId = window.location.search;

//////// AFFICHAGE ID SEUL SANS ?id=

let leId = recuperationId.slice(4);

//////// AFFICHAGE DE PRODUITS DANS LA PAGE

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


                //////// ENVOI ARTICLE DANS LE LOCALSTORAGE

                // Ecouter btn " Ajouter au panier "
                btnEnvoiPanier.addEventListener("click", (event) => {
                    event.preventDefault();

                    // Choix article à mettre dans mon panier
                    let ajoutProduitPanier = {
                        imageUrl: arrayId.imageUrl,
                        id: leId,
                        nomArticle: arrayId.name,
                        ChoixOption: selectOption,
                        prix: arrayId.price,
                        quantite: inputQuantite.value
                    };
                    // Cocher une option avant envoi dans le localStorage
                    const confirmationPanier = () => {
                        if (selectOption) {
                            confirmation_check.className = "text-success text-center mb-2";
                            spanConfirmationOption.innerHTML = "Votre article a été ajouté au panier";
                        };
                    };

                    //////// AJOUT DE PRODUITS AU PANIER
                    const ajoutProduitLocalStorage = () => {
                        //si panier vide = ajouter un nouveau produit
                        if (enregistementDansLocalStorage === null) {
                            enregistementDansLocalStorage = [];
                            enregistementDansLocalStorage.push(ajoutProduitPanier);
                            localStorage.setItem("Articles", JSON.stringify(enregistementDansLocalStorage));
                            calculNombreArticle();
                            confirmationPanier();

                        } else {
                            //si produit existant  = ajouter quantité | boucler dans le panier avec for
                            let produitIndex = false;
                            for (let i = 0; i < enregistementDansLocalStorage.length; i++) {
                                //La condition du produit existant
                                if (enregistementDansLocalStorage[i].id === ajoutProduitPanier.id && enregistementDansLocalStorage[i].ChoixOption === ajoutProduitPanier.ChoixOption) {
                                    produitIndex = i;
                                }
                            };

