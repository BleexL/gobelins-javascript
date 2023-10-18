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
    let mouseControl = true;
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
    let background = document.getElementById("background");

    let fontTarget = demoHamburger;

    const verifContainer = document.getElementsByClassName("mouse-controler-container")[0];
    const startButton = document.getElementById("start");
    const restartButton = document.getElementById("restart");
    const homePageButton = document.getElementById("home-page");
    const wordList = ["Hamburger", "Bonjour", "Soleil", "Chocolat", "Danse", "Amour", "Écouter", "Musique", "Bonheur", "Voyage", "Papillon"]

    let countdown = 60;
    let timeRemaining = countdown;
    let gaugeRemaining = 100;
    let timerGauge = document.querySelector('.timer-gauge');

    const colorTheme = [
    {
        name: "blue",
        darkerColor: "#0C4A6E",
        primaryColor: "#7DD3FC",
        lighterColor: "#E0F2FE",
    },
    {
        name: "purple",
        darkerColor: "#581C87",
        primaryColor: "#C084FC",
        lighterColor: "#F3E8FF",
    },
    {
        name: "green",
        darkerColor: "#14532D",
        primaryColor: "#86EFAC",
        lighterColor: "#DCFCE7",
    },
    {
        name: "orange",
        darkerColor: "#7C2D12",
        primaryColor: "#FDBA74",
        lighterColor: "#FFEDD5",
    },
    {
        name: "yellow",
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
            mouseControl = false;
            currentGameState = gameState.endGame;

            handleGameState();
        }
        else {
            activeTime = setTimeout(updateCountdown, 100)
            timeRemaining = timeRemaining - 0.1;
            gaugeRemaining = timeRemaining*100/countdown;
            timerGauge.style.width = gaugeRemaining + '%';
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
        model.style.fontVariationSettings = `"wght" ${modelWeight}, "wdth" ${modelWidth}`;
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
        model.style.color = colorTheme[newRandomIndexTheme].primaryColor;
        hamburger.style.color = colorTheme[newRandomIndexTheme].darkerColor;
        timerGauge.style.backgroundColor = colorTheme[newRandomIndexTheme].primaryColor;

        previousIndexTheme=newRandomIndexTheme;
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

    function gameInit (){
        mouseControl = true;
        timeRemaining = countdown;
        score = 0;
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
        return fontMinProperty + ratioMouse * (fontMaxProperty - fontMinWidth)
    }

    // Partie 3 : application des variations aux font
    function setFontVariation (fontMouseWeight, fontMouseWidth, fontTarget){
        fontTarget.style.fontVariationSettings = `"wght" ${fontMouseWeight}, "wdth" ${fontMouseWidth}`;
        console.log(fontTarget, fontMouseWeight, fontMouseWidth);
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
        ThemeSelector();
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
                mouseControl = true;
                pageGenerator();

                break;
            
            case gameState.game:

                // Instructions de la page jeu
                gameInit();
                pageGenerator();
                modelGenerator();
                updateCountdown();
                ThemeSelector();
                

                document.getElementById("score").textContent = `SCORE : ${score}`;



                break;
            
            case gameState.endGame:

                // Instructions de la pop up endgame

                recordVerification();
                pageGenerator();

                document.getElementById("previous-score").textContent = `SCORE : ${score}`;
                document.getElementById("record").textContent = `RECORD : ${record}`;

                break;
        }
    }

    startButton.addEventListener("click", function () {
        currentGameState = gameState.game;
        fontTarget = hamburger;
        handleGameState();
    });

    restartButton.addEventListener("click", function () {
        console.log("tu as cliqué sur le restart")
        currentGameState = gameState.game;
        fontTarget = hamburger;
        handleGameState();
    });

    homePageButton.addEventListener("click", function () {
        currentGameState = gameState.home;
        fontTarget = demoHamburger;
        handleGameState();
    });
    
    document.addEventListener("mousemove", function (e) {
        handleMouseMouvement(e, fontTarget);
    });

    // Appel initial de handleGameState
    handleGameState();
});  // Fermeture de la fonction globale