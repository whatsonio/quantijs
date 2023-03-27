
//Declaraer un dataLayer Quanti 

//Modifier la fonction gtag pour ajouter une fonction send si reçoit un event en plus des vars de config et vide les fonctions event quand c'est envoyé


function gtag() {

    console.log('own')

    dataLayer.push(arguments);

    console.log({ dataLayer })
}

