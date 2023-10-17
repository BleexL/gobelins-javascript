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
    let gameOn = true;
    
    let homeContainer = document.getElementsByClassName("home-container")[0];
    let gameContainer = document.getElementsByClassName("game-container")[0];
    
    let hamburger = document.getElementById("hamburger");
    let model = document.getElementById("model");
    const verifContainer = document.getElementsByClassName("mouse-controler-container")[0];

    let countdown = 60;
    let timeRemaining = countdown;
    let gaugeRemaining = 100;
    let timerGauge = document.querySelector('.timer-gauge');


    // Function de compte à rebours
    function updateCountdown (){
        if (timeRemaining > 0){
            timeRemaining = timeRemaining - 0.1;
            // document.getElementById("countdown").textContent=timeRemaining;

            gaugeRemaining = timeRemaining*100/60;
            timerGauge.style.width = gaugeRemaining + '%';
        }
    };

    // Fonction de génération de la font model (width et weight aléatoire)
    function modelGenerator (){
        modelWeight = Math.floor(Math.random() * (fontMaxWeight - fontMinWeight + 1)) + fontMinWeight;
        modelWidth = Math.floor(Math.random() * (fontMaxWidth - fontMinWidth + 1)) + fontMinWidth;

        console.log(model);
        model.style.fontVariationSettings = `"wght" ${modelWeight}, "wdth" ${modelWidth}`;
    }

    function pageGenerator (){
        if (gameOn === false){
            homeContainer.style.display="flex";
            gameContainer.style.display="none";
        }
        else{
            homeContainer.style.display="none";
            gameContainer.style.display="block";
        }
    }

    pageGenerator();

    modelGenerator();
    document.getElementById("score").textContent=`SCORE : ${score}`;

    // Récupération de la position de la souris + modification de la font en fonction.
    document.addEventListener("mousemove", (e) => {
        let mouseX = e.clientX / window.innerWidth;
        let mouseY = e.clientY / window.innerHeight;

        let fontMouseWeight = fontMinWeight + mouseX * (fontMaxWeight - fontMinWeight);
        let fontMouseWidth = fontMinWidth + mouseY * (fontMaxWidth - fontMinWidth);

        hamburger.style.fontVariationSettings = `"wght" ${fontMouseWeight}, "wdth" ${fontMouseWidth}`;

        // Comparaison pour vérifier que les deux font sont identiques avec la tolérance
        if (Math.abs(modelWeight - fontMouseWeight) < weightTolerance && Math.abs(modelWidth - fontMouseWidth) < widthTolerance){
            rightFont = true;
            verifContainer[0].classList.add('verif');
            console.log(score);
            score ++;
            document.getElementById("score").textContent=`SCORE : ${score}`;
            modelGenerator();
        }
        else {
            rightFont = false;
            verifContainer[0].classList.remove('verif');
        }
    });

    updateCountdown();
    activeTime = setInterval(updateCountdown, 100);

  
});