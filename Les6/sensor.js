
// activeer de Device Orientation API
window.addEventListener('deviceorientation', handleOrientation);

// event handler
function handleOrientation(eventData){
    let alpha, beta, gamma;
    // alpha rotation compass rotation Z-axis
    alpha = Math.round(eventData.alpha);
    // beta rotation front back rotation X-axis
    beta = Math.round(eventData.beta);
    // gamma rotation left right rotation Y-axis
    gamma = Math.round(eventData.gamma);
    
    // doe iets met de data
    doSomething(alpha, beta, gamma);     
}   


function doSomething(alpha, beta, gamma){
    showDataColor(alpha, beta, gamma); // kleurtjes en tekst
    activateVoice(alpha, beta, gamma); // geluid
    showMyImage(alpha, beta, gamma);   // afbeelding  
}

function showDataColor(alpha, beta, gamma){
    //show the data in HTML
    document.getElementById('beta').innerHTML = beta;
    document.getElementById('gamma').innerHTML = gamma;
    document.getElementById('alpha').innerHTML = alpha;

    // change background color
     // gamma rotation left right rotation Y-axis
    document.body.style.background = `rgb(150, ${Math.abs(gamma)*5}, 150)`;
}

function activateVoice(alpha, beta, gamma){
    // voice if Z-axis rotation > value
    document.getElementById('voice').innerHTML = "";

    if(alpha > 120){
        let myTxt = "Why do you rotate me?";  
        sayItLoud(myTxt); // text 2 speech

        // laat het ook in de HTML zien
        document.getElementById('voice').innerHTML += " " + myTxt;
        }
    else{
        // haal de tekst weg
        
        }

    if(beta > 60)
    {
        let myTxt = "Dit is beta rotatie";  
        sayItLoud(myTxt); // text 2 speech

        // laat het ook in de HTML zien
        document.getElementById('voice').innerHTML += " " + myTxt;
        }
    else{
        // haal de tekst weg
        
        }

    if(gamma > 60)
    {
        let myTxt = "Dit is gamma rotatie";
        sayItLoud(myTxt); // text 2 speech

        // laat het ook in de HTML zien
        document.getElementById('voice').innerHTML += " " + myTxt;
    }
    else{
        // haal de tekst weg
    }
}

function showMyImage(alpha, beta, gamma){
    // image if X-axis > value
    document.getElementById('myImage').src = ""; // no image

    if(beta > 40){
        document.getElementById('myImage').src = "https://scx2.b-cdn.net/gfx/news/hires/2019/3-robot.jpg"; // show image
        }
        else {
            
        }

    if(alpha > 40){
        document.getElementById('myImage').src = "https://www.robotzorg.nl/wp-content/uploads/2015/08/Zora-robot.jpg"; // show image
        }
        else {
            
        }

    if(gamma > 40){
        document.getElementById('myImage').src = "https://media.istockphoto.com/vectors/cartoon-robot-isolated-on-a-white-background-vector-id1182595599"; // show image
        }
        else {

        }
}