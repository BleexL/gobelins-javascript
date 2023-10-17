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
    let homeSection = true;
    let gameOn = true;
    let endgame = false;
    
    let homeContainer = document.getElementsByClassName("home-container")[0];
    let gameContainer = document.getElementsByClassName("game-container")[0];
    let endgamePopUp = document.getElementsByClassName("pop-up-container")[0];
    
    let hamburger = document.getElementById("hamburger");
    let model = document.getElementById("model");
    let demoHamburger = document.getElementById("demoHamburger");

    let fontTarget = demoHamburger

    const verifContainer = document.getElementsByClassName("mouse-controler-container")[0];
    const startButton = document.getElementById("start");

    let countdown = 60;
    let timeRemaining = countdown;
    let gaugeRemaining = 100;
    let timerGauge = document.querySelector('.timer-gauge');


    ///////////////
    // Fonctions //
    ///////////////
    
    // Fonction compte à rebours
    function updateCountdown (){
        if (timeRemaining > 0){
            timeRemaining = timeRemaining - 0.1;
            // document.getElementById("countdown").textContent=timeRemaining;

            gaugeRemaining = timeRemaining*100/60;
            timerGauge.style.width = gaugeRemaining + '%';
        }
        else {
            gameOn = false;
        }
    };

    // Fonction de génération de la font model (width et weight aléatoire)
    function modelGenerator (){
        modelWeight = Math.floor(Math.random() * (fontMaxWeight - fontMinWeight + 1)) + fontMinWeight;
        modelWidth = Math.floor(Math.random() * (fontMaxWidth - fontMinWidth + 1)) + fontMinWidth;

        console.log(model);
        model.style.fontVariationSettings = `"wght" ${modelWeight}, "wdth" ${modelWidth}`;
    }

    // Fonction de gestion des "pages"
    function pageGenerator (){
        if (homeSection === true){
            homeContainer.style.display="flex";
            gameContainer.style.display="none";
        }
        else{
            homeContainer.style.display="none";
            gameContainer.style.display="block";
        }

        if (endgame === false){
            endgamePopUp.style.display="none";
        }
        else{
            endgamePopUp.style.display="flex";
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

    pageGenerator();
    modelGenerator();

    startButton.addEventListener("click", function(){
        homeSection = false;
        pageGenerator();
        fontTarget = hamburger;
    });

    document.getElementById("score").textContent=`SCORE : ${score}`;
    document.addEventListener("mousemove", function (e) {
        handleMouseMouvement(e, fontTarget);
    });

    updateCountdown();
    activeTime = setInterval(updateCountdown, 100);

  
});