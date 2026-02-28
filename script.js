/* ===================================================
   Under This Same Sky - V2
   Full cinematic engine + dialogue + branching
   For mobile/iPad (touch optimized)
=================================================== */

const textDiv = document.getElementById("text");
const choicesDiv = document.getElementById("choices");
const chapterDiv = document.getElementById("chapter");
const cinematicTop = document.getElementById("cinematic-top");
const cinematicBottom = document.getElementById("cinematic-bottom");
const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas.getContext("2d");
const particleCanvas = document.getElementById("particles");
const particleCtx = particleCanvas.getContext("2d");

let width, height;
let stars = [];
let particles = [];
let love = 0;
let ego = 0;
let trust = 0;
let vulnerability = 0;
let starfishTaps = 0;
let holdInterval;
let holdProgress = 0;

/* =======================
   Resize canvases
======================= */
function resize() {
    width = starCanvas.width = particleCanvas.width = window.innerWidth;
    height = starCanvas.height = particleCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* =======================
   Starfield Layer
======================= */
for(let i=0;i<150;i++){
    stars.push({x:Math.random()*width, y:Math.random()*height, size:Math.random()*2, speed:Math.random()*0.3});
}
function drawStars(){
    starCtx.clearRect(0,0,width,height);
    starCtx.fillStyle="white";
    stars.forEach(star=>{
        star.y += star.speed;
        if(star.y>height) star.y=0;
        starCtx.beginPath();
        starCtx.arc(star.x,star.y,star.size,0,Math.PI*2);
        starCtx.fill();
    });
}

/* =======================
   Glowing Particles Layer
======================= */
for(let i=0;i<40;i++){
    particles.push({
        x:Math.random()*width,
        y:Math.random()*height,
        size:Math.random()*4+1,
        speedX:(Math.random()-0.5)*0.2,
        speedY:(Math.random()-0.5)*0.2,
        opacity:Math.random()
    });
}
function drawParticles(){
    particleCtx.clearRect(0,0,width,height);
    particles.forEach(p=>{
        p.x += p.speedX;
        p.y += p.speedY;
        if(p.x<0||p.x>width)p.speedX*=-1;
        if(p.y<0||p.y>height)p.speedY*=-1;
        particleCtx.beginPath();
        particleCtx.arc(p.x,p.y,p.size,0,Math.PI*2);
        particleCtx.fillStyle=`rgba(255,200,255,${p.opacity})`;
        particleCtx.fill();
    });
}

/* =======================
   Animate Loop
======================= */
function animate(){
    drawStars();
    drawParticles();
    requestAnimationFrame(animate);
}
animate();

/* =======================
   Utility Functions
======================= */
function clearChoices(){choicesDiv.innerHTML="";}
function createButton(text,action){
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = action;
    choicesDiv.appendChild(btn);
}
function typeText(text,callback){
    textDiv.innerHTML="";
    let i=0;
    let interval=setInterval(()=>{
        textDiv.innerHTML+=text[i];
        i++;
        if(i>=text.length){
            clearInterval(interval);
            if(callback)callback();
        }
    },30);
}

/* =======================
   Cinematic Bar Functions
======================= */
function showCinematicBars(){
    cinematicTop.style.height="80px";
    cinematicBottom.style.height="80px";
}
function hideCinematicBars(){
    cinematicTop.style.height="0px";
    cinematicBottom.style.height="0px";
}

/* =======================
   Scene Engine
======================= */
const scenes = [

/* ---------- Prologue ---------- */
{
    id:"prologue",
    chapter:"PROLOGUE",
    text:["Some stories don’t begin with love…","They begin with almost losing it.","This is Tanisha and Rafay."],
    choices:[{text:"Begin",next:"scene1"}],
    effect:()=>{hideCinematicBars();}
},

/* ---------- Scene 1 ---------- */
{
    id:"scene1",
    chapter:"The Words We Didn't Mean",
    text:["Rafay didn’t mean to sound angry. He was just scared.","Tanisha went quiet… her messages became short and dry."],
    choices:[
        {text:"Apologize properly",love:2,next:"scene2"},
        {text:"Defend yourself",ego:1,next:"scene2"},
        {text:"Say you're scared of losing her",love:2,trust:1,vulnerability:1,next:"scene2"}
    ],
    effect:()=>{hideCinematicBars();}
},

/* ---------- Scene 2 ---------- */
{
    id:"scene2",
    chapter:"Silence Feels Loud",
    text:["No notifications…","Time stretches…","Then — headlights. A flash of white. Wind rushes past.","Some distances aren’t measured in miles… but in seconds you almost didn’t get."],
    choices:[
        {text:"Promise to change",love:2,vulnerability:1,next:"scene3"},
        {text:"Blame fate",ego:1,next:"scene3"}
    ],
    effect:()=>{showCinematicBars();}
},

/* ---------- Scene 3 ---------- */
{
    id:"scene3",
    chapter:"Am I Unlovable?",
    text:["Tanisha whispers:","'Rafay… what if one day you stop loving me?'","'Sometimes I feel unlovable.'"],
    choices:[
        {text:"You are my only ever love.",love:2,trust:1,vulnerability:1,next:"scene4"},
        {text:"Don't overthink",next:"scene4"}
    ],
    effect:()=>{hideCinematicBars();}
},

/* ---------- Scene 4 ---------- */
{
    id:"scene4",
    chapter:"Starfish Mode",
    text:["Flashback: City lights, night sky.","Tanisha calls Rafay her lil starfish."],
    choices:[
        {text:"Playfully respond",love:1,next:"scene5"}
    ],
    effect:()=>{hideCinematicBars();}
},

/* ---------- Scene 5 ---------- */
{
    id:"scene5",
    chapter:"First Kiss Memory",
    text:["Night sky.","City lights glowing below.","'Under city lights… under the same sky… Tanisha leaned in first.'"],
    choices:[
        {text:"Admit you were nervous",love:1,next:"scene6"},
        {text:"Tell her that was the moment you knew",love:2,next:"scene6"}
    ],
    effect:()=>{hideCinematicBars();}
},

/* ---------- Scene 6 ---------- */
{
    id:"scene6",
    chapter:"Parallel Futures",
    text:["Four paths appear before you…","Choose wisely."],
    choices:[
        {text:"Ego wins",ego:1,next:"fakeEnding"},
        {text:"Distance grows",ego:1,next:"fakeEnding"},
        {text:"Fear controls",ego:1,next:"fakeEnding"},
        {text:"Love stays",love:2,trust:1,vulnerability:1,next:"hiddenEnding"}
    ],
    effect:()=>{showCinematicBars();}
},

/* ---------- Fake Ending ---------- */
{
    id:"fakeEnding",
    chapter:"FAKE ENDING",
    text:["Tanisha lost Rafay…","...like he’d ever let that happen."],
    choices:[{text:"Continue",next:"finalScene"}],
    effect:()=>{showCinematicBars();}
},

/* ---------- Hidden Ending ---------- */
{
    id:"hiddenEnding",
    chapter:"FOREVER ENDING",
    text:["Tanisha…","If you break my heart…","If the world tries to take you from me…","Under this same sky…","I will always love you.","You are my perfect girl. Meri jaan. My lil baby princess.","And I’ll always be right here."],
    choices:[{text:"Hold the screen to promise",next:"finalScene",hold:true}],
    effect:()=>{hideCinematicBars();}
},

/* ---------- Final Scene ---------- */
{
    id:"finalScene",
    chapter:"THE END",
    text:["Forever.","Under the same sky.","Always."],
    choices:[],
    effect:()=>{hideCinematicBars();}
}

];

/* =======================
   Scene Player
======================= */
let currentScene=null;

function playScene(sceneId){
    const scene = scenes.find(s=>s.id===sceneId);
    if(!scene) return;
    currentScene=scene;
    chapterDiv.innerText = scene.chapter;
    if(scene.effect) scene.effect();
    clearChoices();
    let i=0;
    function showNextLine(){
        if(i<scene.text.length){
            typeText(scene.text[i],()=>{
                i++;
                showNextLine();
            });
        } else {
            // Show choices
            if(scene.choices.length>0){
                scene.choices.forEach(choice=>{
                    const btn=document.createElement("button");
                    btn.innerText=choice.text;
                    btn.onclick=()=>{
                        if(choice.love) love+=choice.love;
                        if(choice.ego) ego+=choice.ego;
                        if(choice.trust) trust+=choice.trust;
                        if(choice.vulnerability) vulnerability+=choice.vulnerability;
                        if(choice.hold){
                            createHoldButton();
                        } else {
                            playScene(choice.next);
                        }
                    };
                    choicesDiv.appendChild(btn);
                });
            }
        }
    }
    showNextLine();
}

/* =======================
   Hold-To-Promise Mechanic
======================= */
function createHoldButton(){
    const btn=document.createElement("button");
    btn.innerText="Hold if you promise to stay";
    const bar=document.createElement("div");
    bar.id="holdBar";
    btn.appendChild(bar);

    btn.onmousedown=btn.ontouchstart=()=>{
        holdInterval=setInterval(()=>{
            holdProgress+=2;
            bar.style.width=holdProgress+"%";
            if(holdProgress>=100){
                clearInterval(holdInterval);
                playScene("finalScene");
            }
        },100);
    };

    btn.onmouseup=btn.ontouchend=()=>{
        clearInterval(holdInterval);
        holdProgress=0;
        bar.style.width="0%";
    };

    choicesDiv.appendChild(btn);
}

/* =======================
   Starfish Secret Tap
======================= */
const starfish = document.createElement("div");
starfish.innerText="⭐";
starfish.style.position="fixed";
starfish.style.bottom="20px";
starfish.style.right="20px";
starfish.style.fontSize="30px";
starfish.style.cursor="pointer";
starfish.style.zIndex="30";
document.body.appendChild(starfish);
starfish.style.display="block";

starfish.addEventListener("click",()=>{
    starfishTaps++;
    if(starfishTaps===7){
        love++;
        alert("You were never dumb. Just soft in a world that isn’t.");
    }
});

/* =======================
   Start Game
======================= */
playScene("prologue");
