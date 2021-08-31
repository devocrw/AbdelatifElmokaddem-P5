let enregistementDansLocalStorage = JSON.parse(localStorage.getItem("Articles"));

// AFFICHER LE CONTENU DU PANIER DANS LA PAGE

let articlePanier = document.getElementById("article_panier");
let totalPrix = document.getElementById("total_prix");
const afficherProduitPanier = () => {
    if (enregistementDansLocalStorage === null) {
        //Si le panier est vide
        const divPanierVide = document.createElement("div");
        divPanierVide.className = "col text-center mx-4 h4 border px-3 py-3";
        divPanierVide.innerHTML = "Mon panier est vide";
        articlePanier.appendChild(divPanierVide);
    } else {
        //Si le panier n'est pas vide
        for (let i = 0; i < enregistementDansLocalStorage.length; i++) {
            let divInfo = document.createElement("div");
            divInfo.className = "border col-lg-4 rounded-0 mb-5 px-2 align-self-stretch";
            articlePanier.appendChild(divInfo);

            let image = document.createElement("img");
            image.className = "img-fluid my-3";
            image.alt = "Image de l'article";
            image.src = enregistementDansLocalStorage[i].imageUrl;
            divInfo.appendChild(image);

            let divTitreInfo = document.createElement("h3");
            divTitreInfo.className = "h4";
            divTitreInfo.innerHTML = "Titre : " + enregistementDansLocalStorage[i].nomArticle;
            divInfo.appendChild(divTitreInfo);

            let divReference = document.createElement("p");
            divReference.className = "text-info small";
            divReference.innerHTML = "Référence : " + enregistementDansLocalStorage[i].id;
            divInfo.appendChild(divReference);

            let divChoixLentille = document.createElement("p");
            divChoixLentille.innerHTML = "Choix lentille : " + enregistementDansLocalStorage[i].ChoixOption;
            divInfo.appendChild(divChoixLentille);

            let spanQuantite = document.createElement("span");
            spanQuantite.innerHTML = "Quantité : ";
            divInfo.appendChild(spanQuantite);

            let quantite = enregistementDansLocalStorage[i].quantite;
            let quantiteSeul = document.createElement("span");
            quantiteSeul.textContent = quantite;
            divInfo.appendChild(quantiteSeul);


            let prixTotalDuProduit = enregistementDansLocalStorage[i].prix * enregistementDansLocalStorage[i].quantite;
            let prixCentimes = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(prixTotalDuProduit / 100);
            let prix = document.createElement("p");
            prix.className = "font-weight-bold my-2";
            prix.textContent = prixCentimes;
            divInfo.appendChild(prix);
        };
    };
};

afficherProduitPanier();

//  AFFICHER LA SOMME DES PRODUITS EN EUROS  
const totalPrixCalcule = () => {
    if (enregistementDansLocalStorage === null) {
        totalPrix.innerHTML = "Total : " + 0 + " € ";
    } else {
        let totalArticles = [];
        for (let i = 0; i < enregistementDansLocalStorage.length; i++) {
            totalArticles.push(enregistementDansLocalStorage[i].prix * enregistementDansLocalStorage[i].quantite);
        };

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let totalAfficher = totalArticles.reduce(reducer);
        let prixCentimes = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAfficher/100);
        totalPrix.innerHTML = "Total : " + prixCentimes;
    };
};
totalPrixCalcule();