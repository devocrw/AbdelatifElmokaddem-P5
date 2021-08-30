// Enregistrement dans le LocalStorage
let enregistementDansLocalStorage = JSON.parse(localStorage.getItem("Articles"));

// Nombres d'articles dans le panier - affichage sur toutes les pages
const calculNombreArticle = () => {
    let nombreArticleAjoutPanier = document.getElementById("nombre_article_ajout");
    if(enregistementDansLocalStorage == null) {
      nombreArticleAjoutPanier.innerHTML = "(" + "0" + ")";
    } else {
      nombreArticleAjoutPanier.innerHTML = "(" + enregistementDansLocalStorage.length + ")";
    };
  };
  calculNombreArticle();