//////// REQUETE FETCH - RECUPERATION DES ARTICLES SUR SERVEUR (*plan test)

const getCameras = async () => {
  let response = await fetch("http://localhost:3000/api/cameras");

  if (response.ok) {
    return await response.json();
  } else {
    alert("erreur");
  }
};

getCameras();
console.log(getCameras());
