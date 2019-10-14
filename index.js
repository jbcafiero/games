//START OF NAVBAR
    //Queary for the other general components
    let menu = document.getElementById("menuBar")
    let menuContainer = document.getElementById("actualMenu")
    let toggleMenu = false;
    let menuContents = document.getElementById("menuContent");
    let navigationBar = document.getElementById("navBar")

    //Queary for the navBar canvas

    let menuCanvas = document.getElementById("menuCanvas");
    let menuCanvReference = menuCanvas.getContext("2d");
    let dots = [];

    menuCanvas.width = window.innerHeight/2;
    menuCanvas.height = window.innerHeight/2;


    //Quearies for About Area Fade Ins
    let triggerElem = document.querySelector("#mainAboutArea");

    let aboutImageContents = document.querySelector('#imageContent');
    let aboutImageFadeInRainbow = document.querySelector('#imageFadeInAnimator');
    let aboutImageMainContainer = document.querySelector("#parentImageHolder");

    let aboutInfoTextContents = document.querySelector("#textHolder");
    let aboutInfoTextFadeInRainbow = document.querySelector("#imageFadeInAnimatorText");
    let aboutInfoTextMainContainer = document.querySelector("#parentTextHolder");

    //tools area
    let mainToolsArea = document.querySelector("#mainToolsArea");


    //Declaration of Dot Class
    class Dot {
        constructor(){
            Dot.quantity += 1;
            this.velocityX = 0;
            this.velocityY = 0;
            this.radius = 2.5
            this.angularSpeed = 0.03+Math.random()*(0.01+0.01)-0.01;
            this.rotationalPosition = Math.random()*2;
            this.turnRadius = 20;
            this.isFree = true;
            this.variableColor = 255;
            this.isOdd = false;
            this.color = `rgb(255, ${this.variableColor}, ${this.variableColor})`
            this.positionX = this.turnRadius*(Math.cos((this.rotationalPosition-0.1)*Math.PI));
            this.positionY = this.turnRadius*(Math.sin((this.rotationalPosition-0.1)*Math.PI));
        }
        move() {

            // console.log(this.positionX)

            if (this.isFree==false) {
                let futureXPosition = this.turnRadius*(Math.cos(this.rotationalPosition*Math.PI));
                let futureYPosition = this.turnRadius*(Math.sin(this.rotationalPosition*Math.PI));
                this.rotationalPosition += this.angularSpeed;

                let holdVelocityX = Math.abs(futureXPosition-this.positionX);
                let holdVelocityY = Math.abs(futureYPosition-this.positionY);
                
                if(holdVelocityX>=holdVelocityY) {
                    this.velocityX = (this.angularSpeed*180)*Math.sign(futureXPosition-this.positionX);
                    this.velocityY = (this.angularSpeed*180)*(holdVelocityY/holdVelocityX)*Math.sign(futureYPosition-this.positionY);
                }
                else {  
                    this.velocityX = (this.angularSpeed*180)*(holdVelocityX/holdVelocityY)*Math.sign(futureXPosition-this.positionX);
                    this.velocityY = (this.angularSpeed*180)*Math.sign(futureYPosition-this.positionY);
                }
                if (holdVelocityX < 3 && holdVelocityY < 3) {
                    this.velocityX = (futureXPosition-this.positionX)
                    this.velocityY = (futureYPosition-this.positionY)
                }
                if (this.turnRadius == 10) {
                    this.variableColor = this.variableColor<=0 ? 0 : this.variableColor-10;
                }
                else {
                    this.variableColor = this.variableColor>=255 ? 255 : this.variableColor+10;
                }
            }
            else {
                if(this.positionX+Dot.offsetX >=menuCanvas.width-this.radius || this.positionX+Dot.offsetX <=this.radius) {this.velocityX*=-1}
                if(this.positionY+Dot.offsetY>=menuCanvas.width-this.radius || this.positionY+Dot.offsetY<=this.radius) {this.velocityY*=-1}
            }
            this.positionX += this.velocityX;
            this.positionY += this.velocityY;
            this.color = `rgb(255, ${this.variableColor}, ${this.variableColor})`
            ////////
            menuCanvReference.beginPath();
            menuCanvReference.arc(Dot.offsetX+this.positionX, Dot.offsetY+this.positionY, this.radius, 0, 2*Math.PI);
            menuCanvReference.fillStyle = this.color;
            menuCanvReference.closePath();
            menuCanvReference.fill();
        }
    }
    //end of class

    //instantiation of dots
    Dot.isFree = false;
    Dot.offsetX = menuCanvas.width-50;
    Dot.offsetY = 50;
    Dot.quantity = 0;
    for (let i = 0; i < 30; i ++) {
        dots[i] = new Dot();
    }



    //All of the toggle actions when menu bar is clicked
    menu.addEventListener("click",() => {
        if (toggleMenu == true) {
            menuContainer.style.borderRadius = "50%";
            menuContainer.style.top = "50px";
            menuContainer.style.right = "60px";

            menu.style.transform = "scale(1)";
            menuContainer.style.width = "1px";
            menuContainer.style.height = "1px";
            Dot.isFree = false;
            toggleMenu = false;

            menuContents.style.transform = "scale(0.01)";
            menuContents.style.opacity = "0";
            menuContents.style.right = "-15vh";
            menuContents.style.top = "-15vh";
        }
        else {
            menuContainer.style.borderRadius = "1.5%";
            menuContainer.style.top = "0";
            menuContainer.style.right = "10";
            menuContainer.style.width = "100%";
            menuContainer.style.height = "100%";

            menu.style.transform = "scale(0.5)"
            Dot.isFree = true;
            toggleMenu = true;

            menuContents.style.transform = "scale(1)";
            menuContents.style.opacity = "1";
            menuContents.style.right = "0";
            menuContents.style.top = "0";

            for (let i = 0; i < Dot.quantity; i ++) {
                if(Dot.isFree == true && i%2 != 0) {
                    dots[i].velocityX *= 2.2;
                    dots[i].velocityY *= 2.2;
                }
            }
        }
    });

    //INTERVAL ACTIONS AT END OF CODE

//END OF NAVBAR

//START OF MAIN ENTRANCE BACKGROUND
    document.body.style.padding = "0";
    document.body.style.margin = "0";
    document.body.style.width = "100vw";
    document.body.style.height = "100vh";
    document.body.style.background = "#1a1a1a";
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canv = canvas.getContext("2d");
    ///
    let MouseX = window.innerWidth;
    let MouseY = window.innerHeight;
    window.addEventListener('mousemove', (e) => {
        MouseX = e.x;
        MouseY = e.y;
    })
    
    function drawDot(ratioWidth, ratioHeight, spacing, dotSize, indexX, indexY, color, speed, pad, offset, sideOffset) {
        canv.beginPath();
        canv.arc(((((speed*ratioWidth)*(spacing/2))+(indexX*spacing)-(pad/2))+sideOffset), ((((speed*ratioHeight)*(spacing/2))+(indexY*spacing)-(pad/2))+offset), dotSize, 0, 2*Math.PI)
        canv.fillStyle = color;
        canv.fill();
        canv.closePath();
    }
    let fallingPosition = 0;
    let sideMove = 0;
    //INTERVAL ACTIONS AT END OF CODE

//END OF MAIN ENTRANCE BACKGROUND

//TOOLS AREA JAVASCRIPT

var CURRENT_TOOL_BEING_LOOKED_AT;

let backgroundOfCont = document.querySelector('#containerBackground');
let infoCont = document.querySelector('#infoContent');
var BACKGROUND_STATE = false;
var elemIsOpen = false;

let infoTitle = document.querySelector("#infoTitle");
let infoCategory = document.querySelector("#infoCategory");
let infoProficiency = document.querySelector("#profInfo");
let exitTools = document.querySelector("#xStyleCloseTools");


let allGifTitles = document.getElementsByClassName('innerGifs');

function takeActionOnBackground (decide, color) {
    if (decide) {
        BACKGROUND_STATE = false;   
        backgroundOfCont.classList.remove("fadeBackgroundIn");
        backgroundOfCont.classList.add("fadeBackgroundOut");
    }
    else {
        BACKGROUND_STATE = true;
        backgroundOfCont.style.background = color;
        backgroundOfCont.classList.remove("fadeBackgroundOut");
        backgroundOfCont.classList.add("fadeBackgroundIn");
    }
}
function takeActionOnGifs(e, topDist, leftDist, text, color, proficiency, title, category) {
    
    if(!elemIsOpen){
        CURRENT_TOOL_BEING_LOOKED_AT = {object: e, topValue: topDist, leftValue: leftDist};
        for (let i=0; i < 7; i++) {
            document.getElementById(`gifTitle${i+1}`).classList.add("dontMakeGreyBar");
        }
    e.classList.remove("returnToSpace"); infoCont.innerHTML = text ; elemIsOpen = true; e.style.top = `${topDist}%`; e.style.left = `${leftDist}%`; e.classList.add("fillArea");
    takeActionOnBackground(BACKGROUND_STATE, color);
    infoTitle.innerHTML = title;
    infoCategory.innerHTML = category;
    infoProficiency.innerHTML = `Proficiency: ${proficiency}%`;
    }

}

let gifElem1 = document.querySelector('#gifElem1');
gifElem1.addEventListener("click", () => {takeActionOnGifs(gifElem1, 0*50, 0*25, aboutData.blender.text, 'rgb(255, 241, 227)', aboutData.blender.proficiency, "Blender", "Design / Asset Creation");});
let gifElem2 = document.querySelector('#gifElem2');
gifElem2.addEventListener("click", () => {takeActionOnGifs(gifElem2, 0*50, 1*25, aboutData.html.text, 'rgb(255, 232, 221)', aboutData.html.proficiency, "HTML", "Front-End Devlopment");});
let gifElem3 = document.querySelector('#gifElem3');
gifElem3.addEventListener("click", () => {takeActionOnGifs(gifElem3, 0*50, 2*25, aboutData.react.text, 'rgb(228, 253, 255)', aboutData.react.proficiency, "React JS", "Front-End Devlopment");});
let gifElem4 = document.querySelector('#gifElem4');
gifElem4.addEventListener("click", () => {takeActionOnGifs(gifElem4, 0*50, 3*25, aboutData.node.text, 'rgb(234, 255, 228)', aboutData.node.proficiency, "Node JS", "Front-End Devlopment / Back-End Development");});
let gifElem5 = document.querySelector('#gifElem5');
gifElem5.addEventListener("click", () => {takeActionOnGifs(gifElem5, 1*50, 0*25, aboutData.ai.text, 'rgb(240, 231, 227)', aboutData.ai.proficiency, "Adobe Illustrator", "Design/Asset Creation");});
let gifElem6 = document.querySelector('#gifElem6');
gifElem6.addEventListener("click", () => {takeActionOnGifs(gifElem6, 1*50, 1*25, aboutData.css.text, 'rgb(233, 241, 255)', aboutData.css.proficiency, "CSS", "Front-End Devlopment");});
let gifElem7 = document.querySelector('#gifElem7');
gifElem7.addEventListener("click", () => {takeActionOnGifs(gifElem7, 1*50, 2*25, aboutData.express.text, 'rgb(240, 240, 240)', aboutData.express.proficiency, "Express JS", "Back-End Development");});
let gifElem8 = document.querySelector('#gifElem8');
gifElem8.addEventListener("click", () => {takeActionOnGifs(gifElem8, 1*50, 3*25, aboutData.javascript.text, 'rgb(255, 253, 232)', aboutData.javascript.proficiency, "JavaScript", "Front-End Devlopment / Back-End Development");});

exitTools.addEventListener("click", () => {
    if(elemIsOpen) {
        for (let i=0; i < 7; i++) {
            document.getElementById(`gifTitle${i+1}`).classList.remove("dontMakeGreyBar");
        }
        CURRENT_TOOL_BEING_LOOKED_AT.object.classList.remove("fillArea"); elemIsOpen = false; CURRENT_TOOL_BEING_LOOKED_AT.object.classList.add("returnToSpace"); CURRENT_TOOL_BEING_LOOKED_AT.object.style.top = `${CURRENT_TOOL_BEING_LOOKED_AT.topValue}%`; CURRENT_TOOL_BEING_LOOKED_AT.object.style.left = `${CURRENT_TOOL_BEING_LOOKED_AT.leftValue}%`;
        takeActionOnBackground(BACKGROUND_STATE, "white");
    }
});

let aboutData = {
    blender: {
        text: "blender is the tool that I use for 3d asset creation, and is the tool that was used to create the asset you are currently looking at. This is more filler text that looks like normal text, and is trying to extend the length of this info area as long as possible",
        proficiency: 58
    },
    html: {
        text: "This is Html TExt and it is plentiful and it is unique",
        proficiency: 79
    },
    react: {
        text: "React text, react is a good tool, I use it often",
        proficiency: 81
    },
    node: {
        text: "Node is used in both front end and back end development, and it is a good time",
        proficiency: 71
    },
    ai: {
        text: "adobe illustrator is used on the design end and is useful",
        proficiency: 64
    },
    css: {
        text: "css is a great tool, and is capable of taking over many jobs from javascript",
        proficiency: 87
    },
    express: {
        text: "express is a backend framework that works off of nodejs and is my primary tool for backend development",
        proficiency: 56
    },
    javascript: {
        text: "javascript is my absolute favorite programming language and it is useful for all things web",
        proficiency: 88
    }
}

//FUNCTION AND A FEW QUEARIES THAT ALLOW TITLES TO BE MODULAR
let didInsertAbout = false;
let aboutElement = document.querySelector('#aboutHeader');
let didInsertTools = false;
let toolsElement = document.querySelector('#toolsHeader');
let didInsertContact = false;
let contactElement = document.querySelector('#contactHeader');

function triColorText(content, divToInsertIn) {
    let textContainter = document.createElement('DIV');
    textContainter.style.width = '100vw';
    textContainter.style.overflowX = 'hidden';
    textContainter.style.overflowY = 'visible';
    divToInsertIn.appendChild(textContainter);

    textContainter.innerHTML = 
        '<div id = "fullObject" style="overflow: visible; position: absolute;">'+
            '<div class="headers" style="'+
            'color: red;'+
            'position: absolute;'+
            'top: 0;'+
            'width: 100vw;'+
            'z-index: 3;'+
            'text-align: center;'+
            'animation: topIn 2s ease 0s;'+
            'animation-fill-mode: both;">' +
            content+
            '</div>'+
            '<div class="headers" style="'+
            'color: green;'+
            'position: absolute;'+
            'top: 0;'+
            'width: 100vw;'+
            'z-index: 2;'+
            'text-align: center;'+
            'animation: leftIn 2s ease 0s;'+
            'animation-fill-mode: both;'+
            '">'+
            content+
            '</div>'+
            '<div class="headers" style="'+
            'color: blue;'+
            'position: absolute;'+
            'top: 0;'+
            'width: 100vw;'+
            'z-index: 1;'+
            'text-align: center;'+
            'animation: rightIn 2s ease 0s;'+
            'animation-fill-mode: both;'+
            '">'+
            content+
            '</div>'+
            '<div class="headers" style="'+
            'position: relative;'+
            'top: 0;'+
            'width: 100vw;'+
            'color: white;'+
            'z-index: 4;'+
            'opacity: 0;'+
            'text-align: center;'+
            'animation: fadeInMainText 0.45s ease 1.8s;'+
            'animation-fill-mode: forwards;'+
            '">'+
            content+
            '</div>'+
        '</div>';
}

// EVENT LISTENERS CONDENSED HERE

    let toolsAreaExists = false;
    
    window.addEventListener("scroll",() => {
        //Dom listener, its job is to fix navbar when it has been scrolled past
        if (document.body.scrollTop > window.innerHeight) {
            navigationBar.style.position = "fixed";
        }
        else {
            navigationBar.style.position = "relative";
        }

        //event logic incharge of displaying tri-color headers
        if (document.body.scrollTop + window.innerHeight*(7/10) > aboutElement.offsetTop && didInsertAbout == false) {
            triColorText("About", aboutElement);
            didInsertAbout = true;
        }
        if (document.body.scrollTop + window.innerHeight*(7/10) > toolsElement.offsetTop && didInsertTools == false) {
            triColorText("Tools", toolsElement);
            didInsertTools = true;
        }
        if (document.body.scrollTop + window.innerHeight*(7/10) > contactElement.offsetTop && didInsertContact == false) {
            triColorText("Contact", contactElement);
            didInsertContact = true;
        }
        //Event logic to trigger About Fade Ins
        if (document.body.scrollTop + window.innerHeight*(5/10) > triggerElem.offsetTop) {
            aboutImageContents.classList.add("fadeInMainElem");//elem
            aboutImageMainContainer.classList.add("moveUp");//mainElem
            aboutImageFadeInRainbow.classList.add("fadeInAnimationRainbow");//innerElem

            aboutInfoTextContents.classList.add("fadeInMainElem");//textElem
            aboutInfoTextFadeInRainbow.classList.add("fadeInAnimationRainbow")//fadeInAnimaotr
            aboutInfoTextMainContainer.classList.add("moveUp");//textCont
        }
        //Event logic to trigger fade in of Tools
        // if (document.body.scrollTop + window.innerHeight*(6/10) > mainToolsArea.offsetTop && !toolsAreaExists) {
        //     toolsAreaExists = true;
        //     for(let i = 0; i < 8; i++) {
        //             document.querySelector(`#rainbowFadeIn${i+1}`).classList.add("fadeInAnimationRainbow")
        //     }
        // }

    });

// START OF INTERVAL
    setInterval(() => {
        //reset/adjust canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // set preference on dot size/space
        let space = 40;
        let dotWidth = 2.5;
        //calc ratio of mouse from center
        let ratioW = (MouseX-(canvas.width/2))/(canvas.width/2)
        let ratioH = (MouseY-(canvas.height/2))/(canvas.height/2)
        //defines the windo width and height
        let screenW = window.innerWidth;
        let screenH = window.innerHeight;
        //defines the padding so that dots do not show black background
        let padding = 550;
        //calc nessesary quanity for screen fill plus padding
        let quantityX = Math.round((padding+screenW)/(space));
        let quantityY = Math.round((padding+screenH)/(space));
        //draw dots
        for(let x=0; x<quantityX; x++) {
            for(let y=0; y<quantityY; y++) {
                drawDot(ratioW, ratioH, space, dotWidth, x, y, "blue", 1, padding, fallingPosition, sideMove)
                drawDot(ratioW, ratioH, space, dotWidth, x, y, "green", 2, padding, fallingPosition, sideMove)
                drawDot(ratioW, ratioH, space, dotWidth, x, y, "red", 3, padding, fallingPosition, sideMove)
            }
        }
        fallingPosition += ratioH;
        if (Math.abs(fallingPosition)>=space) {fallingPosition = 0;}
        sideMove += ratioW;
        if (Math.abs(sideMove)>=space) {sideMove = 0;}

        menuCanvas.width = window.innerHeight/2;
        menuCanvas.height = window.innerHeight/2;
        Dot.offsetX = menuCanvas.width-50;
        Dot.offsetY = 50;

        for (let i = 0; i < Dot.quantity; i ++) {
            if(Dot.isFree == true && i%2 != 0) {
                dots[i].isFree = true;
            }
            else if(Dot.isFree == true && i%2 == 0) {
                dots[i].turnRadius = 10;
            }
            else {
                dots[i].isFree = false;
                dots[i].turnRadius = 20;
            }
            dots[i].move();
        }
    }, 1000/30)
//END OF INTERVAL