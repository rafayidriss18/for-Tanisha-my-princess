/* ===================================================
   Under This Same Sky - Full Cinematic Story Engine
   Complete Script with All Scenes + Animations
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
let love=0, ego=0, trust=0, vulnerability=0;
let starfishTaps=0;
let holdInterval, holdProgress=0;
let auroraOpacity=0, zoomLevel=1;

/* Resize Canvases */
function resize(){width=starCanvas.width=particleCanvas.width=window.innerWidth;height=starCanvas.height=particleCanvas.height=window.innerHeight;}
window.addEventListener("resize",resize);
resize();

/* Starfield Layer */
for(let i=0;i<150;i++){stars.push({x:Math.random()*width,y:Math.random()*height,size:Math.random()*2,speed:Math.random()*0.3});}
function drawStars(){starCtx.clearRect(0,0,width,height);starCtx.save();starCtx.scale(zoomLevel,zoomLevel);starCtx.fillStyle="white";stars.forEach(s=>{s.y+=s.speed;if(s.y>height)s.y=0;starCtx.beginPath();starCtx.arc(s.x,s.y,s.size,0,Math.PI*2);starCtx.fill();});starCtx.restore();}

/* Particle Layer */
for(let i=0;i<40;i++){particles.push({x:Math.random()*width,y:Math.random()*height,size:Math.random()*4+1,speedX:(Math.random()-0.5)*0.2,speedY:(Math.random()-0.5)*0.2,opacity:Math.random()});}
function drawParticles(){particleCtx.clearRect(0,0,width,height);particleCtx.save();particleCtx.scale(zoomLevel,zoomLevel);particles.forEach(p=>{p.x+=p.speedX;p.y+=p.speedY;if(p.x<0||p.x>width)p.speedX*=-1;if(p.y<0||p.y>height)p.speedY*=-1;particleCtx.beginPath();particleCtx.arc(p.x,p.y,p.size,0,Math.PI*2);particleCtx.fillStyle=`rgba(255,200,255,${p.opacity})`;particleCtx.fill();});if(auroraOpacity>0){particleCtx.fillStyle=`rgba(255,180,220,${auroraOpacity})`;particleCtx.fillRect(0,0,width,height);}particleCtx.restore();}

function animate(){drawStars();drawParticles();requestAnimationFrame(animate);}animate();

/* Utilities */
function clearChoices(){choicesDiv.innerHTML="";}
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

/* Cinematic Bars */
function showCinematicBars(){cinematicTop.style.height="80px";cinematicBottom.style.height="80px";}
function hideCinematicBars(){cinematicTop.style.height="0px";cinematicBottom.style.height="0px";}

/* Typewriter */
async function typeText(text,emotion="normal"){const line=document.createElement("div");line.style.opacity=0;line.style.transition="opacity 0.8s";if(emotion==="dry")line.style.color="#aaaaaa";if(emotion==="playful"){line.style.color="#ffc0ff";line.style.textShadow="0 0 6px #ff88ff";}if(emotion==="romantic"){line.style.color="#ffe0e0";line.style.textShadow="0 0 12px #ff99cc";}textDiv.appendChild(line);for(let i=0;i<text.length;i++){line.innerHTML+=text[i];await sleep(50);}line.style.opacity=1;await sleep(400);}

/* Screen Shake & Flash */
async function screenShake(intensity=10,duration=500){const start=Date.now();return new Promise(resolve=>{function loop(){const now=Date.now();if(now-start<duration){const x=(Math.random()-0.5)*intensity;const y=(Math.random()-0.5)*intensity;starCanvas.style.transform=`translate(${x}px,${y}px) scale(${zoomLevel})`;particleCanvas.style.transform=`translate(${x}px,${y}px) scale(${zoomLevel})`;requestAnimationFrame(loop);}else{starCanvas.style.transform=`scale(${zoomLevel})`;particleCanvas.style.transform=`scale(${zoomLevel})`;resolve();}}loop();});}
async function flashWhite(duration=300){const overlay=document.createElement("div");overlay.style.position="fixed";overlay.style.top=0;overlay.style.left=0;overlay.style.width="100%";overlay.style.height="100%";overlay.style.background="white";overlay.style.opacity=1;overlay.style.zIndex=50;overlay.style.pointerEvents="none";document.body.appendChild(overlay);overlay.style.transition=`opacity ${duration/1000}s ease`;await sleep(50);overlay.style.opacity=0;await sleep(duration);overlay.remove();}

/* Aurora & Zoom */
function setAurora(value){auroraOpacity=value;}
function setZoom(value){zoomLevel=value;}

/* Scenes */
const scenes=[
{
id:"prologue",chapter:"PROLOGUE",lines:[{text:"Some stories don’t begin with love…"},{text:"They begin with almost losing it."},{text:"This is our story, Tanisha and Rafay."}],choices:[{text:"Begin",next:"scene1"}],effect:()=>{hideCinematicBars();}}
,
{
id:"scene1",chapter:"The Words We Didn't Mean",lines:[{text:"Rafay didn’t mean to sound angry…",emotion:"romantic"},{text:"Tanisha went quiet… her messages became short and dry.",emotion:"dry"}],choices:[{text:"Apologize properly",love:2,next:"scene2"},{text:"Defend yourself",ego:1,next:"scene2"},{text:"Say you're scared of losing him",love:2,trust:1,vulnerability:1,next:"scene2"}],effect:()=>{hideCinematicBars();}}
,
{
id:"scene2",chapter:"Silence Feels Loud",lines:[{text:"No notifications…",emotion:"dry"},{text:"Time stretches…",emotion:"dry"},{text:"Then — headlights. A flash of white. Wind rushes past.",emotion:"dry",animation:async()=>{await flashWhite(300);await screenShake(10,600);particles.forEach(p=>p.speedY+=0.5);}}],choices:[{text:"Promise to change",love:2,vulnerability:1,next:"scene3"},{text:"Blame fate",ego:1,next:"scene3"}],effect:()=>{showCinematicBars();}}
,
{
id:"scene3",chapter:"Am I Unlovable?",lines:[{text:"Tanisha whispers: 'Rafay… what if one day you stop loving me?'",emotion:"dry"},{text:"'Sometimes I feel unlovable.'",emotion:"dry"}],choices:[{text:"You are my only ever love.",love:2,trust:1,vulnerability:1,next:"scene4"},{text:"Don't overthink",next:"scene4"}],effect:()=>{hideCinematicBars();}}
,
{
id:"scene4",chapter:"Starfish Mode",lines:[{text:"Flashback: City lights, night sky.",emotion:"romantic"},{text:"Tanisha calls Rafay her lil starfish.",emotion:"playful"}],choices:[{text:"Playfully respond",love:1,next:"scene5"}],effect:()=>{hideCinematicBars();}}
,
{
id:"scene5",chapter:"First Kiss Memory",lines:[{text:"Night sky. City lights glowing below.",emotion:"romantic"},{text:"'Under city lights… under the same sky… Tanisha leaned in first.'",emotion:"romantic",animation:async()=>{setAurora(0.5);setZoom(1.05);}}],choices:[{text:"Admit you were nervous",love:1,next:"scene6"},{text:"Tell him that was the moment you knew",love:2,next:"scene6"}],effect:()=>{setAurora(0.4);setZoom(1.05);}}
,
{
id:"scene6",chapter:"Parallel Futures",lines:[{text:"Four paths appear before you…",emotion:"dry"},{text:"Choose wisely.",emotion:"dry"}],choices:[{text:"Ego wins",ego:1,next:"fakeEnding"},{text:"Distance grows",ego:1,next:"fakeEnding"},{text:"Fear controls",ego:1,next:"fakeEnding"},{text:"Love stays",love:2,trust:1,vulnerability:1,next:"hiddenEnding"}],effect:()=>{showCinematicBars();}}
,
{
id:"fakeEnding",chapter:"FAKE ENDING",lines:[{text:"Tanisha lost Rafay…",emotion:"dry"},{text:"...like he’d ever let that happen.",emotion:"romantic"}],choices:[{text:"Continue",next:"finalScene"}],effect:()=>{showCinematicBars();}}
,
{
id:"hiddenEnding",chapter:"FOREVER ENDING",lines:[{text:"Tanisha…",emotion:"romantic"},{text:"Even if you break my heart…",emotion:"romantic"},{text:"If the world ever tries to take you from me…",emotion:"romantic"},{text:"Under this same sky…",emotion:"romantic"},{text:"I will always love you.",emotion:"romantic"},{text:"You are my perfect lil girl. Meri jaan ki tokri. My lil baby girl my perfect lil princess.",emotion:"romantic"},{text:"And I’ll always be right here loving you",emotion:"romantic"}],choices:[{text:"Hold the screen to promise",next:"finalScene",hold:true}],effect:()=>{hideCinematicBars();}}
,
{
id:"finalScene",chapter:"THE END",lines:[{text:"Forever.",emotion:"romantic"},{text:"Under the same sky.",emotion:"romantic"},{text:"Always.",emotion:"romantic"}],choices:[],effect:()=>{hideCinematicBars();setAurora(0);}}
];

/* Play Scene */
async function playScene(sceneId){const scene=scenes.find(s=>s.id===sceneId);if(!scene)return;chapterDiv.innerText=scene.chapter;if(scene.effect)scene.effect();clearChoices();textDiv.innerHTML="";for(let line of scene.lines){if(line.animation)await line.animation();await typeText(line.text,line.emotion||"normal");}if(scene.choices.length>0){for(let choice of scene.choices){const btn=document.createElement("button");btn.innerText=choice.text;btn.style.opacity=0;btn.style.transition="opacity 0.6s";choicesDiv.appendChild(btn);setTimeout(()=>{btn.style.opacity=1;},200);btn.onclick=()=>{if(choice.love)love+=choice.love;if(choice.ego)ego+=choice.ego;if(choice.trust)trust+=choice.trust;if(choice.vulnerability)vulnerability+=choice.vulnerability;if(choice.hold){createHoldButton();}else{playScene(choice.next);}};}}}

/* Hold-To-Promise */
function createHoldButton(){const btn=document.createElement("button");btn.innerText="Hold if you promise to stay";const bar=document.createElement("div");bar.id="holdBar";bar.style.height="5px";bar.style.width="0%";bar.style.background="pink";bar.style.marginTop="5px";btn.appendChild(bar);btn.onmousedown=btn.ontouchstart=()=>{holdInterval=setInterval(()=>{holdProgress+=2;bar.style.width=holdProgress+"%";if(holdProgress>=100){clearInterval(holdInterval);playScene("finalScene");}},100);};btn.onmouseup=btn.ontouchend=()=>{clearInterval(holdInterval);holdProgress=0;bar.style.width="0%";};clearChoices();choicesDiv.appendChild(btn);}

/* Starfish Secret */
const starfish=document.createElement("div");starfish.innerText="⭐";starfish.style.position="fixed";starfish.style.bottom="20px";starfish.style.right="20px";starfish.style.fontSize="30px";starfish.style.cursor="pointer";starfish.style.zIndex="30";document.body.appendChild(starfish);starfish.addEventListener("click",()=>{starfishTaps++;if(starfishTaps===7){love++;auroraOpacity=0.3;alert("You were never dumb. Just soft in a world that isn’t.");}});

/* Start Game */
playScene("prologue");
