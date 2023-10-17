document.addEventListener("DOMContentLoaded", (event) => {
	// Ici le document est chargé, je peux écrire mon code...

	/*
		NB : Ceci est un commentaire javascript
		Chaque instruction doit être terminée par " ; "
	*/

	console.log("Le fichier game.js a bien été chargé");

    var randomMin = 1;
    var randomMax = 100;

    var majeurEurope = 18;
    var majeurUSA = 21;

    var isInUSA = false


    document.getElementById("ageForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        var age = parseInt(document.getElementById("ageInput").value); // Récupérez l'âge et convertissez-le en nombre entier

        var majeurUSA = 21; // L'âge de la majorité aux États-Unis
        var majeurEurope = 18; // L'âge de la majorité en Europe

        var toggleSwitch = document.getElementById("toggleSwitch");

        if (toggleSwitch.checked) {
            if (age >= majeurUSA) {
                console.log(`La personne est majeure car elle a ${age} ans.`);
            } else if (age >= 10) {
                console.log(`T'est un ado car tu as ${age} ans.`);
            } else {
                console.log(`T'est un gros bébé car tu as ${age} ans.`);
            }
        } else {
            if (age >= majeurEurope) {
                console.log(`La personne est majeure car elle a ${age} ans.`);
            } else if (age >= 10) {
                console.log(`T'est un ado car tu as ${age} ans.`);
            } else {
                console.log(`T'est un gros bébé car tu as ${age} ans.`);
            }x 
        }

        document.getElementById("ageInput").value = ""; // Réinitialisez le champ d'entrée
    });

    // let i = 0
    // var money = 0

    // for (i=0; i<10; i++){
    //     money=money+50
    //     console.log(`Mon argent est de ${money}`)
    // }
});