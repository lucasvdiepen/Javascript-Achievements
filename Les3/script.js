    "use strict"   
    let myText = document.getElementById('myText');
    let myImage = document.getElementById('myImage');
    let myButton = document.getElementById('myButton');
    let myReset = document.getElementById('myReset');

    myButton.addEventListener('click', function(){
        main();
    })

    myReset.addEventListener('click', function(){
        Reset();
    })

    function main(){
         let dezeTextWordtHet = makeThisSentence();
         myText.innerHTML = dezeTextWordtHet;
         sayItLoud(dezeTextWordtHet, getRndInteger(0, 3), getRndInteger(1, 10)); // say something nice say it loud
         selectThisImage(); // show a nice image
    }
    
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
    
    function randomizer(range = 1){ 
        // Math.random geeft een waarde  0 <= waarde < 1 (dus exclusief 1)
        return Math.floor((Math.random() * range));
    }
    
    
    function makeThisSentence(){
        let index = randomizer(arrayLength);
        let index2 = randomizer(arrayLength);
        let index3 = randomizer(arrayLength);
        let woord1 = onderwerp[index];
        let woord2 = werkwoord[index2];
        let woord3 = restwoord[index3];
        let outputString = woord1 + " " + woord2 + " " + woord3;
        return outputString;
    }
    
    function selectThisImage(){
        let index = randomizer(arrayLength);
        myImage.src = plaatjes[index]; 
    }
    
    function sayItLoud (textString, p, r) {
      let message = new SpeechSynthesisUtterance(textString);
      let voices = window.speechSynthesis.getVoices();
      message.voice = voices[1];
      message.pitch = p; // range between 0 and 2
      message.rate = r; // range between 0.1 (lowest) and 10 (highest) 
      window.speechSynthesis.speak(message);
    }
    
    function Reset()
    {
        myText.innerHTML = "....";
        myImage.src = "https://www.ma-web.nl/static/vector/Logo_blok.svg";
    }
    
    const onderwerp = ["Ze", "Ed", "Rosmerta"];
    const werkwoord = ["loopt", "leert", "drinkt"];
    const restwoord = ["hard", "op school", "koffie"];
        
    let plaatjes = ["https://cdn.pixabay.com/photo/2018/07/09/17/44/baby-elephant-3526681__340.png", "https://www.how-to-draw-funny-cartoons.com/images/cartoon-baby-007.jpg", "https://thumbs.dreamstime.com/b/smiling-heart-cartoon-open-arms-nice-image-all-projects-love-representing-version-its-suggest-idea-40930153.jpg", "https://observer.com/wp-content/uploads/sites/2/2020/05/yoda-art-observer.jpg?quality=80"]
    let arrayLength = onderwerp.length;
