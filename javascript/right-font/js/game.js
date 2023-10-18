document.addEventListener("DOMContentLoaded", (event) => {

    // Déclaration des variables 
    const fontMaxWeight = 1000;
    const fontMinWeight = 200;
    const fontMaxWidth = 125;
    const fontMinWidth = 75;
    const widthTolerance = 10;
    const weightTolerance = 20;

    let rightFont = false;
    let modelWeight, modelWidth;
    
    let score = 0;
    let record = 0;
    // let homeSection = true;
    let gameOn = true;
    // let endgame = true;
    
    let gameState = {
        home : "home",
        starting : "starting",
        game : "game",
        endGame : "endGame",
    };
    let currentGameState = gameState.home;

    let homeContainer = document.getElementsByClassName("home-container")[0];
    let gameContainer = document.getElementsByClassName("game-container")[0];
    let endgamePopUp = document.getElementsByClassName("pop-up-container")[0];
    
    let hamburger = document.getElementById("hamburger");
    let model = document.getElementById("model");
    let demoHamburger = document.getElementById("demoHamburger");

    let fontTarget = demoHamburger;

    const verifContainer = document.getElementsByClassName("mouse-controler-container")[0];
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const homePageButton = document.getElementById("home-page");
    const wordList = ["Hamburger", "Bonjour", "Soleil", "Chocolat", "Danse", "Amour", "Écouter", "Musique", "Bonheur", "Voyage", "Papillon"]

    let countdown = 5;
    let timeRemaining = countdown;
    let gaugeRemaining = 100;
    let timerGauge = document.querySelector('.timer-gauge');


    ///////////////
    // Fonctions //
    ///////////////
    
    // Fonction compte à rebours
    function updateCountdown (){
        if (timeRemaining <= 0){
            gameOn = false;
            currentGameState = gameState.endGame;

            handleGameState();
        }
        else {
            activeTime = setTimeout(updateCountdown, 100)
            timeRemaining = timeRemaining - 0.1;
            gaugeRemaining = timeRemaining*100/60;
            timerGauge.style.width = gaugeRemaining + '%';
        }
    };

    // Fonction de génération de la font model (width et weight aléatoire)
    function modelGenerator (){
        modelWeight = Math.floor(Math.random() * (fontMaxWeight - fontMinWeight + 1)) + fontMinWeight;
        modelWidth = Math.floor(Math.random() * (fontMaxWidth - fontMinWidth + 1)) + fontMinWidth;

        let wordSelection = wordList[Math.floor(Math.random()* wordList.length)];

        console.log(model);
        model.style.fontVariationSettings = `"wght" ${modelWeight}, "wdth" ${modelWidth}`;
        model.textContent = wordSelection;
        hamburger.textContent = wordSelection;
    }

    // Fonction de gestion des "pages"
    function pageGenerator (){
        switch (currentGameState){
            case gameState.home:

                // Affichage de la page home
                homeContainer.style.display="flex";
                
                gameContainer.style.display="none";
                endgamePopUp.style.display="none"

                console.log("currentGameState = " + currentGameState)
                break;
                
            case gameState.game:

                // Affichage de la page home
                gameContainer.style.display="block";
                
                homeContainer.style.display="none";
                endgamePopUp.style.display="none"
                console.log("currentGameState = " + currentGameState)
                break;

            case gameState.endGame:

                // Affichage de la page home
                endgamePopUp.style.display="flex"
                console.log("currentGameState = " + currentGameState)
                break;
        }
    }

    ////////// Fonction du jeu entier //////////
    // Partie 1 : Gestion mouvement de la souris + jeu 
    function handleMouseMouvement (e, fontTarget){
        let ratioMouseX = e.clientX / window.innerWidth;
        let ratioMouseY = e.clientY / window.innerHeight;

        let fontMouseWeight = calculateFontTransformation(ratioMouseX, fontMinWeight, fontMaxWeight); 
        let fontMouseWidth = calculateFontTransformation(ratioMouseY, fontMinWidth, fontMaxWidth); 

        if (gameOn === true){
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
        return fontMinProperty + ratioMouse * (fontMaxProperty - fontMinWidth)
    }

    // Partie 3 : application des variations aux font
    function setFontVariation (fontMouseWeight, fontMouseWidth, fontTarget){
        fontTarget.style.fontVariationSettings = `"wght" ${fontMouseWeight}, "wdth" ${fontMouseWidth}`;
    }

    // Partie 4 : Vérification des deux font pour voir si elle match
    function FontMatchVerification (fontMouseWeight, fontMouseWidth){
        return (Math.abs(modelWeight - fontMouseWeight) < weightTolerance && Math.abs(modelWidth - fontMouseWidth) < widthTolerance)
    }

    // Partie 5 : Evenement de points marqué 
    function isFontMatch (){
        rightFont = true;
        verifContainer.classList.add('verif');
        console.log(score);
        score ++;
        document.getElementById("score").textContent=`SCORE : ${score}`;
        modelGenerator();
    }

    // Partie 6 : Evenement pas de match 
    function isNotFontMatch (){
        rightFont = false;
        verifContainer.classList.remove('verif');
    }

    // Fonction de record
    function recordVerification (){
        if (score > record) {
            record = score;
        }
    }
    
    // Fonction de gestion de l'état du jeu
    function handleGameState (){
        switch (currentGameState){
            case gameState.home:

                // Instructions de la page home
                pageGenerator();
                gameOn = true;

                document.addEventListener("mousemove", function (e) {
                    handleMouseMouvement(e, fontTarget);
                });

                break;
            
            case gameState.game:

                // Instructions de la page jeu
                pageGenerator();
                modelGenerator();
                updateCountdown();
            
                

                document.getElementById("score").textContent = `SCORE : ${score}`;
                document.addEventListener("mousemove", function (e) {
                    handleMouseMouvement(e, fontTarget);
                });



                break;
            
            case gameState.endGame:

                // Instructions de la pop up endgame

                recordVerification();
                pageGenerator();

                document.getElementById("previous-score").textContent = `SCORE : ${score}`;
                document.getElementById("score").textContent = `RECORD : ${record}`;

                break;
        }
    }
    function handleGameState (){
        switch (currentGameState){
            case gameState.home:

                // Instructions de la page home
                pageGenerator();

                document.addEventListener("mousemove", function (e) {
                    handleMouseMouvement(e, fontTarget);
                });

                break;
            
            case gameState.game:

                // Instructions de la page jeu
                pageGenerator();
                modelGenerator();
                updateCountdown();
            
                

                document.getElementById("score").textContent = `SCORE : ${score}`;
                document.addEventListener("mousemove", function (e) {
                    handleMouseMouvement(e, fontTarget);
                });



                break;
            
            case gameState.endGame:

                // Instructions de la pop up endgame

                recordVerification();
                pageGenerator();
                clearInterval();

                document.getElementById("previous-score").textContent = `SCORE : ${score}`;
                document.getElementById("score").textContent = `RECORD : ${record}`;

                break;
        }
    }

    startButton.addEventListener("click", function () {
        currentGameState = gameState.game;
        fontTarget = hamburger;
        handleGameState();
    });

    restartButton.addEventListener("click", function () {
        currentGameState = gameState.game;
        fontTarget = hamburger;
        handleGameState();
        timeRemaining = countdown
        console.log("tu as cliqué sur le restart")
    });

    homePageButton.addEventListener("click", function () {
        currentGameState = gameState.home;
        fontTarget = demoHamburger;
        handleGameState();
        console.log("lala");
        console.log(fontTarget);
    });
        
    // Appel initial de handleGameState
    handleGameState();
});  // Fermeture de la fonction globale