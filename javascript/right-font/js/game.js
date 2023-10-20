document.addEventListener("DOMContentLoaded", (event) => {

    // Déclaration des variables 
    const fontMaxWeight = 1000;
    const fontMinWeight = 200;
    const fontMaxWidth = 125;
    const fontMinWidth = 75;
    const widthTolerance = 10;
    const weightTolerance = 20;

    let modelWeight, modelWidth;
    
    let score = 0;
    let record = 0;

    let mouseControl = true;
    
    let gameState = {
        home : "home",
        starting : "starting",
        game : "game",
        endGame : "endGame",
    };

    let currentGameState = gameState.home;

    const homeContainer = document.getElementsByClassName("home-container")[0];
    const gameContainer = document.getElementsByClassName("game-container")[0];
    const endgamePopUp = document.getElementsByClassName("pop-up-container")[0];
    
    const hamburger = document.getElementById("hamburger");
    const model = document.getElementById("model");
    const demoModel = document.getElementById("demoModel");
    const demoHamburger = document.getElementById("demoHamburger");
    const background = document.getElementById("background");

    const gameDescription = document.getElementsByClassName("game-description")[0];

    let countdown = 60;
    let timeRemaining = countdown;
    let gaugeRemaining = 100;
    let timerGauge = document.querySelector('.timer-gauge');

    const scoreContainer = document.getElementsByClassName("score-container")[0];
    const scoringIndicator = document.getElementById("scoring-indicator");

    const faviconTarget = document.getElementById("favicon");
    let faviconSelection = 0;

    let fontTarget = demoHamburger;
    let modelTarget = demoModel;

    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const homePageButton = document.getElementById("home-page");
    const wordList = [
        "Hamburger", "Bonjour", "Chocolat", "Danse", "Amour", "Écouter", "Musique", "Bonheur", "Voyage", "Papillon",
        "Fenêtre", "Cuisine", "Ordinateur", "Écran", "Château", "Guitare", "Bibliothèque", "Montagne", "Piano",
        "Tableau", "Téléphone", "Plage", "Restaurant", "Télévision", "Football", "Jardin", "Bateau",
        "Université", "Sourire", "Livre", "Fleur", "Étoile", "Arbre", "École", "Tortue",
        "Horloge", "Voiture", "Maison", "Forêt", "Porte", "Souris", "Feuille", "Dessin",
        "Chocolat", "Papier", "Maison", "Montre", "Chanson", "Voyage", "Plante", "Tigre",
        "Cahier", "Courir", "Voler", "Vendre", "Acheter", "Écrire", "Nager", "Manger", "Aimer",
        "Danseur", "Chanteur", "Peindre", "Étudier", "Regarder", "Dormir", "Chaussure", "Lunettes", "Robe", "Chapeau", "Bougie", "Crayon", "Piano", "Globe", "Tapis", "Coussin", "Couverture",
        "Chaise", "Cuillère", "Fourchette", "Assiette", "Verre", "Bouteille", "Gâteau", "Télécommande", "Microphone",
        "Téléphone", "Internet", "Radio", "École", "Université", "Cinéma", "Théâtre", "Musée", "Hôtel",
        "Avion", "Bateau", "Voiture", "Bicyclette", "Taxi", "Marche", "Course", "Natation", "Plongée",
        "Saut", "Cinéma", "Musée", "Jardin",
        "Fête", "Festival", "Concert", "Spectacle", "Opéra", "Cinéma", "Bibliothèque", "École", "Collège", "Lycée", "Université", "Classe", "Professeur",
        "Élève", "Cahier", "Crayon", "Stylo", "Tableau", "Chaise", "Bureau", "Cartable", "Calculatrice", "Physique", "Chimie", "Biologie", "Histoire", "Géographie", "Musique", "Sport", "Anglais", "Français",
        "Espagnol", "Allemand", "Italien", "Japonais", "Chinois", "Arabe", "Russe", "Politique", "Économie", "Science",
        "Informatique", "Télévision", "Internet", "Téléphone", "Radio", "Cinéma", "Musée", "Photographie", "Spectacle", "Concert", "Opéra", "Ballet", "Chanson", "Musique",
        "Rock", "Classique", "Blues", "Reggae", "Country", "Disco", "Latino",
        "Rapide", "Triste", "Colère", "Couleur", "Forme", "Taille", "Poids", "Distance", "Temps", "Semaine", "Année", "Aujourd'hui", "Demain",
        "Matin", "Après-midi", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche", "Janvier", "Février", "Mars", "Avril", "Mai"
    ];

    const colorTheme = [
    {
        name: "blue",
        faviconLink: "assets/favicon-blue.png",
        darkerColor: "#0C4A6E",
        primaryColor: "#7DD3FC",
        lighterColor: "#E0F2FE",
    },
    {
        name: "purple",
        faviconLink: "assets/favicon-purple.png",
        darkerColor: "#581C87",
        primaryColor: "#C084FC",
        lighterColor: "#F3E8FF",
    },
    {
        name: "green",
        faviconLink: "assets/favicon-green.png",
        darkerColor: "#14532D",
        primaryColor: "#86EFAC",
        lighterColor: "#DCFCE7",
    },
    {
        name: "orange",
        faviconLink: "assets/favicon-orange.png",
        darkerColor: "#7C2D12",
        primaryColor: "#FDBA74",
        lighterColor: "#FFEDD5",
    },
    {
        name: "yellow",
        faviconLink: "assets/favicon-tutu.png",
        darkerColor: "#713F12",
        primaryColor: "#FDE047",
        lighterColor: "#FEF9C3",
    }]


    ///////////////
    // Fonctions //
    ///////////////

    // Fonction compte à rebours
    function updateCountdown (){
        if (timeRemaining <= 0){
            if (currentGameState === gameState.starting){
                currentGameState = gameState.game;
                handleGameState();
            }
            else if (currentGameState === gameState.game){
                mouseControl = false;
                currentGameState = gameState.endGame;
    
                handleGameState();
            }
        }
        else {
            activeTime = setTimeout(updateCountdown, 100)
            timeRemaining = timeRemaining - 0.1;
            gaugeRemaining = timeRemaining*100/countdown;
            timerGauge.style.width = gaugeRemaining + '%';
            if (currentGameState === gameState.starting){
                model.textContent = Math.floor(timeRemaining) + 1;
                fontTarget.textContent = Math.floor(timeRemaining) + 1;
            }
        }
    };

    // Fonction de génération de la font model (width et weight aléatoire)
    let previousIndexWord = -1;
    function modelGenerator (){
        modelWeight = Math.floor(Math.random() * (fontMaxWeight - fontMinWeight + 1)) + fontMinWeight;
        modelWidth = Math.floor(Math.random() * (fontMaxWidth - fontMinWidth + 1)) + fontMinWidth;

        let newRandomIndexWord = wordList[Math.floor(Math.random()* wordList.length)];

        while (newRandomIndexWord === previousIndexWord){
            newRandomIndexWord = wordList[Math.floor(Math.random()* wordList.length)];
        }

        console.log(model);
        modelTarget.style.fontVariationSettings = `"wght" ${modelWeight}, "wdth" ${modelWidth}`;
        model.textContent = newRandomIndexWord;
        hamburger.textContent = newRandomIndexWord;
    }

    let previousIndexTheme = -1;
    function ThemeSelector (){
        let newRandomIndexTheme = Math.floor(Math.random() * colorTheme.length);

        while (newRandomIndexTheme === previousIndexTheme){
            newRandomIndexTheme = Math.floor(Math.random() * colorTheme.length);
        }

        background.style.backgroundColor = colorTheme[newRandomIndexTheme].lighterColor;
        modelTarget.style.color = colorTheme[newRandomIndexTheme].primaryColor;
        fontTarget.style.color = colorTheme[newRandomIndexTheme].darkerColor;
        timerGauge.style.backgroundColor = colorTheme[newRandomIndexTheme].primaryColor;

        gameDescription.style.color = colorTheme[newRandomIndexTheme].darkerColor;

        startButton.style.backgroundColor = colorTheme[newRandomIndexTheme].primaryColor;
        startButton.style.color = colorTheme[newRandomIndexTheme].darkerColor;
        
        restartButton.style.backgroundColor = 'white';
        restartButton.style.color = colorTheme[newRandomIndexTheme].darkerColor;
        endgamePopUp.getElementsByClassName("action-container")[0].style.backgroundColor = colorTheme[newRandomIndexTheme].darkerColor;
        homePageButton.style.backgroundColor = colorTheme[newRandomIndexTheme].primaryColor;
        homePageButton.style.color = colorTheme[newRandomIndexTheme].darkerColor;
        
        
        document.getElementById("previous-score").style.color = colorTheme[newRandomIndexTheme].darkerColor;
        document.getElementById("record").style.color = colorTheme[newRandomIndexTheme].primaryColor;
        
        document.getElementById("score").style.color = colorTheme[newRandomIndexTheme].darkerColor;
        scoreContainer.style.backgroundColor = colorTheme[newRandomIndexTheme].primaryColor;

        scoringIndicator.style.color = colorTheme[newRandomIndexTheme].darkerColor;

        faviconTarget.href = colorTheme[newRandomIndexTheme].faviconLink;
        

        previousIndexTheme=newRandomIndexTheme;
    }

    /*function changeFavicon (){
        switch (faviconSelection){
            // Theme blue
            case colorTheme[0]:
                faviconTarget.href="assets/favicon-blue.png";
                break;
            // Theme purple
            case colorTheme[1]:
                faviconTarget.href="assets/favicon-purple.png";
                break;
            // Theme green
            case colorTheme[2]:
                faviconTarget.href="assets/favicon-green.png";
                break;

            // Theme orange
            case colorTheme[3]:
                faviconTarget.href="assets/favicon-orange.png";
                break;

            // Theme yellow
            case colorTheme[4]:
                faviconTarget.href="assets/favicon-yellow.png";
                break;
        }
    }*/



    // Fonction de gestion des "pages"
    function pageGenerator (){
        switch (currentGameState){
            case gameState.home:

                // Affichage de la page home
                homeContainer.style.display="flex";
                
                gameContainer.style.display="none";
                endgamePopUp.style.display="none"

                console.log("currentGameState = " + currentGameState);

                break;

            case gameState.starting:

                gameContainer.style.display="block";
                
                homeContainer.style.display="none";
                endgamePopUp.style.display="none"
                scoreContainer.style.display="none"
                
                console.log("currentGameState = " + currentGameState);
                break;
                
            case gameState.game:

                // Affichage de la page home
                gameContainer.style.display="block";
                scoreContainer.style.display="block"
                
                homeContainer.style.display="none";
                endgamePopUp.style.display="none"
                console.log("currentGameState = " + currentGameState);
                break;

            case gameState.endGame:

                // Affichage de la page home
                endgamePopUp.style.display="flex";
                console.log("currentGameState = " + currentGameState);
                break;
        }
    }

    function startingInit (){
        mouseControl = true;
        countdown = 3;
        timeRemaining = countdown;
    }

    function gameInit (){
        mouseControl = true;
        countdown = 60;
        timeRemaining = countdown;
        score = 0;

        //Récupération du cord en local storage
        var recordStocked = localStorage.getItem('myRecord');
        if (recordStocked !== null){
            record = parseInt(recordStocked, 10);
        }
    }

    ////////// Fonction du jeu entier //////////
    // Partie 1 : Gestion mouvement de la souris + jeu 
    function handleMouseMouvement (e, fontTarget){
        let ratioMouseX = e.clientX / window.innerWidth;
        let ratioMouseY = e.clientY / window.innerHeight;
        let fontMouseWeight = calculateFontTransformation(ratioMouseX, fontMinWeight, fontMaxWeight); 
        let fontMouseWidth = calculateFontTransformation(ratioMouseY, fontMinWidth, fontMaxWidth); 

        if (mouseControl === true){
            setFontVariation(fontMouseWeight, fontMouseWidth, fontTarget);
            if (FontMatchVerification(fontMouseWeight, fontMouseWidth)){
                isFontMatch();
            }
    
            else{
                isNotFontMatch();
            }
        }
        else{
            currentGameState = gameState.endGame;
        }
    }

    // Partie 2  : Calcul des variations des fonts en fonction de la souris
    function calculateFontTransformation(ratioMouse, fontMinProperty, fontMaxProperty){
        return fontMinProperty + ratioMouse * (fontMaxProperty - fontMinWidth);
    }

    // Partie 3 : application des variations aux font
    function setFontVariation (fontMouseWeight, fontMouseWidth, fontTarget){
        fontTarget.style.fontVariationSettings = `"wght" ${fontMouseWeight}, "wdth" ${fontMouseWidth}`;
        // console.log(fontTarget, fontMouseWeight, fontMouseWidth);
    }

    // Partie 4 : Vérification des deux font pour voir si elle match
    function FontMatchVerification (fontMouseWeight, fontMouseWidth){
        return (Math.abs(modelWeight - fontMouseWeight) < weightTolerance && Math.abs(modelWidth - fontMouseWidth) < widthTolerance)
    }

    // Partie 5 : Evenement de points marqué 
    function isFontMatch (){
        if (currentGameState === gameState.game){
            score ++;
            document.getElementById("score").textContent=`SCORE : ${score}`;
            modelGenerator();
            ThemeSelector();

            showScoringIndicator();

            console.log("it's a match en game")
        }
        if (currentGameState == gameState.home){
            modelGenerator();
            ThemeSelector();
            console.log("it's a match en home")
        }
    }

    // Partie 6 : Evenement pas de match 
    function isNotFontMatch (){

    }

    // Fonction de record
    function recordVerification (){
        if (score > record) {
            record = score;
            localStorage.setItem('myRecord', record);
        }
    }

    function showScoringIndicator() {
        scoringIndicator.style.opacity = 0;
        console.log("opacity avant", scoringIndicator.style.opacity)
        scoringIndicator.textContent = '+1';
        scoringIndicator.classList.add('scoring-animation');
        scoreContainer.classList.add('score-container-animation');
    
        setTimeout(function () {
            scoringIndicator.classList.remove('scoring-animation');
            scoringIndicator.style.opacity = 1;
            scoringIndicator.textContent = '';
            console.log("opacity après", scoringIndicator.style.opacity);
            scoreContainer.classList.remove('score-container-animation');
        }, 500);
    }

    function showPopUpEndgame(){
        // endgamePopUp.style.opacity = 1;
        setTimeout(function () {
            endgamePopUp.classList.add('pop-up-animation');

        }, 100)
    }

    function hidePopUpEndgame(){
        endgamePopUp.classList.remove('pop-up-animation');
        // endgamePopUp.style.opacity = 0;
    }
    
    // Fonction de gestion de l'état du jeu
    function handleGameState (){
        switch (currentGameState){
            case gameState.home:

                // Instructions de la page home
                mouseControl = true;
                ThemeSelector();
                hidePopUpEndgame();
                modelGenerator();
                pageGenerator();

                break;

            case gameState.starting:

                startingInit();
                hidePopUpEndgame();
                pageGenerator();
                modelGenerator();
                updateCountdown();
                ThemeSelector();

                break;


            
            case gameState.game:

                // Instructions de la page jeu
                gameInit();
                hidePopUpEndgame();
                pageGenerator();
                modelGenerator();
                updateCountdown();
                ThemeSelector();
                

                document.getElementById("score").textContent = `SCORE : ${score}`;



                break;
            
            case gameState.endGame:

                // Instructions de la pop up endgame

                recordVerification();
                showPopUpEndgame();
                pageGenerator();

                document.getElementById("previous-score").textContent = `SCORE : ${score}`;
                document.getElementById("record").textContent = `RECORD : ${record}`;

                break;
        }
    }

    startButton.addEventListener("click", function () {
        currentGameState = gameState.starting;
        fontTarget = hamburger;
        modelTarget = model;
        handleGameState();
    });
    
    restartButton.addEventListener("click", function () {
        currentGameState = gameState.starting;
        fontTarget = hamburger;
        modelTarget = model;
        handleGameState();
    });

    homePageButton.addEventListener("click", function () {
        currentGameState = gameState.home;
        fontTarget = demoHamburger;
        modelTarget = demoModel;
        handleGameState();
    });
    
    document.addEventListener("mousemove", function (e) {
        handleMouseMouvement(e, fontTarget);
    });

    console.log(mouseControl)
    // Appel initial de handleGameState
    handleGameState();
});  