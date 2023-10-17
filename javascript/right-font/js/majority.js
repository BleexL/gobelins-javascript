document.addEventListener("DOMContentLoaded", (event) => {
    var majority = 18
    var age = 14

    
    function isMajor (age, majority){
        let isAdult = false
        if (age>=majority){
            isAdult = true
        }
        return(isAdult);
    }
    console.log(isMajor(24, 18))
    console.log(isMajor(15, 18))
    console.log(isMajor(18, 21))
});
