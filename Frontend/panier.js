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
        let prixCentimes = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalAfficher / 100);
        totalPrix.innerHTML = "Total : " + prixCentimes;
    };
};
totalPrixCalcule();

// FORMULAIRE
let EnregistrementPrixTotal = totalPrix.textContent;
let form = document.getElementById("form");

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

let indication = document.getElementById("indication");
indication.className = "text-center mt-2";
let btnEnvoiForm = document.getElementById("btn_envoi_form");

// REGEX vérifications
let RegexLettre = /^[a-zA-ZÀ-ÿ-\s]+$/;
let RegexLettreNombre = /^[a-zA-ZÀ-ÿ-0-9-\s]+$/;
let RegexLettreNombreVirgule = /^[a-zA-ZÀ-ÿ-0-9-\s,']+$/;

// Conditions de validation des champs du formulaire 
form.addEventListener("submit", (event) => {
    if (RegexLettre.test(firstName.value) == false) {
        event.preventDefault();
        indication.textContent = "Le champs est vide ou n'accepte pas les caractères spéciaux, veuillez ressaisir à nouveau vos informations.";
        indication.style.display = "block";

    } else if (RegexLettre.test(lastName.value) == false) {
        event.preventDefault();
        indication.textContent = "Le champs est vide ou n'accepte pas les caractères spéciaux, veuillez ressaisir à nouveau vos informations.";
        indication.style.display = "block";

    } else if (RegexLettreNombre.test(city.value) == false) {
        event.preventDefault();
        indication.textContent = "Le champs est vide ou n'accepte pas les caractères spéciaux, veuillez ressaisir à nouveau vos informations.";
        indication.style.display = "block";

    } else if (RegexLettreNombreVirgule.test(address.value) == false) {
        event.preventDefault();
        indication.textContent = "Le champs est vide ou n'accepte pas les caractères spéciaux, veuillez ressaisir à nouveau vos informations.";
        indication.style.display = "block";

    } else if (email.value == "") {
        event.preventDefault();
        indication.textContent = "Le champs est vide, veuillez saisir votre adresss mail.";
        indication.style.display = "block";

        // Validation du panier
    } else if (enregistementDansLocalStorage < 1 || enregistementDansLocalStorage == null) {
        event.preventDefault();
        alert("Votre panier est vide");
        return false;
    } else {
        event.preventDefault();
        // ENREGISTREMENT DU FORMULAIRE DANS L'API
        // Récupération id produits sous forme de tableau
        let products = [];
        for (let i = 0; i < enregistementDansLocalStorage.length; i++) {
            products.push(enregistementDansLocalStorage[i].id);
        };

        //Objet contact
        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        };

        // Les infos à envoyer dans l'API
        let envoiInfos = JSON.stringify({
            contact,
            products,
        });

        // ENVOI DANS L'API CAMERAS/ORDER
        const envoiApi = () => {
            const options = {
                method: "POST",
                body: envoiInfos,
                headers: {
                    "Content-Type": "application/json"
                }
            };

            fetch("http://localhost:3000/api/cameras/order", options)
                .then(response => response.json())
                .then(response => {
                    localStorage.setItem("Order Id", JSON.stringify(response.orderId));
                    localStorage.setItem("Contact", JSON.stringify(response.contact));
                    localStorage.setItem("Prix Total", JSON.stringify(EnregistrementPrixTotal));
                    localStorage.removeItem("Articles");

                })
                .catch((error) => console.log(error));
        };
        envoiApi();
    };
});