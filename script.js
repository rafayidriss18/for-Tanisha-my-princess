/* ================================================
   "Under This Same Sky" - COMPLETE Cinematic Interactive Love Story
   All Scenes + Gestures + Starfish + Aurora + Particles + Zoom + Music/SFX
   Fully mobile/iPad ready, immersive continuous flow
=================================================== */

const textDiv = document.getElementById("text");
const chapterDiv = document.getElementById("chapter");
const cinematicTop = document.getElementById("cinematic-top");
const cinematicBottom = document.getElementById("cinematic-bottom");
const starCanvas = document.getElementById("starfield");
const starCtx = starCanvas.getContext("2d");
const particleCanvas = document.getElementById("particles");
const particleCtx = particleCanvas.getContext("2d");

let width, height;
let stars = [], particles = [];
let love=0, ego=0, trust=0, vulnerability=0;
let starfishTaps=0, holdInterval, holdProgress=0;
let auroraOpacity=0, zoomLevel=1;

/* Resize Canvases */
function resize(){width=starCanvas.width=particleCanvas.width=window.innerWidth;height=starCanvas.height=particleCanvas.height=window.innerHeight;}
window.addEventListener("resize",resize); resize();

/* Stars */
for(let i=0;i<150;i++){stars.push({x:Math.random()*width,y:Math.random()*height,size:Math.random()*2,speed:Math.random()*0.3});}
function drawStars(){starCtx.clearRect(0,0,width,height);starCtx.save();starCtx.scale(zoomLevel,zoomLevel);starCtx.fillStyle="white";stars.forEach(s=>{s.y+=s.speed;if(s.y>height)s.y=0;starCtx.beginPath();starCtx.arc(s.x,s.y,s.size,0,Math.PI*2);starCtx.fill();});starCtx.restore();}

/* Particles */
for(let i=0;i<40;i++){particles.push({x:Math.random()*width,y:Math.random()*height,size:Math.random()*4+1,speedX:(Math.random()-0.5)*0.2,speedY:(Math.random()-0.5)*0.2,opacity:Math.random()});}
function drawParticles(){particleCtx.clearRect(0,0,width,height);particleCtx.save();particleCtx.scale(zoomLevel,zoomLevel);particles.forEach(p=>{p.x+=p.speedX;p.y+=p.speedY;if(p.x<0||p.x>width)p.speedX*=-1;if(p.y<0||p.y>height)p.speedY*=-1;particleCtx.beginPath();particleCtx.arc(p.x,p.y,p.size,0,Math.PI*2);particleCtx.fillStyle=`rgba(255,200,255,${p.opacity})`;particleCtx.fill();});if(auroraOpacity>0){particleCtx.fillStyle=`rgba(255,180,220,${auroraOpacity})`;particleCtx.fillRect(0,0,width,height);}particleCtx.restore();}
function animate(){drawStars();drawParticles();requestAnimationFrame(animate);} animate();

/* Utilities */
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

/* Cinematic Bars */
function showCinematicBars(){cinematicTop.style.height="80px";cinematicBottom.style.height="80px";}
function hideCinematicBars(){cinematicTop.style.height="0px";cinematicBottom.style.height="0px";}

/* Typewriter */
async function typeText(text,emotion="normal"){const line=document.createElement("div");line.style.opacity=0;line.style.transition="opacity 0.8s";if(emotion==="dry")line.style.color="#aaaaaa";if(emotion==="playful"){line.style.color="#ffc0ff";line.style.textShadow="0 0 6px #ff88ff";}if(emotion==="romantic"){line.style.color="#ffe0e0";line.style.textShadow="0 0 12px #ff99cc";}textDiv.appendChild(line);for(let i=0;i<text.length;i++){line.innerHTML+=text[i];await sleep(60);}line.style.opacity=1;}

/* Screen Shake & Flash */
async function screenShake(intensity=10,duration=500){const start=Date.now();return new Promise(resolve=>{function loop(){const now=Date.now();if(now-start<duration){const x=(Math.random()-0.5)*intensity;const y=(Math.random()-0.5)*intensity;starCanvas.style.transform=`translate(${x}px,${y}px) scale(${zoomLevel})`;particleCanvas.style.transform=`translate(${x}px,${y}px) scale(${zoomLevel})`;requestAnimationFrame(loop);}else{starCanvas.style.transform=`scale(${zoomLevel})`;particleCanvas.style.transform=`scale(${zoomLevel})`;resolve();}}loop();});}
async function flashWhite(duration=300){const overlay=document.createElement("div");overlay.style.position="fixed";overlay.style.top=0;overlay.style.left=0;overlay.style.width="100%";overlay.style.height="100%";overlay.style.background="white";overlay.style.opacity=1;overlay.style.zIndex=50;overlay.style.pointerEvents="none";document.body.appendChild(overlay);overlay.style.transition=`opacity ${duration/1000}s ease`;await sleep(50);overlay.style.opacity=0;await sleep(duration);overlay.remove();}

/* Aurora & Zoom */
function setAurora(value){auroraOpacity=value;}
function setZoom(value){zoomLevel=value;}

/* Audio */
const bgMusic=new Audio(); bgMusic.loop=true;
async function playMusic(track){bgMusic.src=track; bgMusic.volume=0; bgMusic.play(); for(let i=0;i<=1;i+=0.05){bgMusic.volume=i; await sleep(100);}}
async function stopMusic(){for(let i=bgMusic.volume;i>=0;i-=0.05){bgMusic.volume=i;await sleep(100);} bgMusic.pause();}
function playSFX(track){const sfx=new Audio(track); sfx.play();}

/* Starfish Secret */
const starfish=document.createElement("div");starfish.innerText="⭐";starfish.style.position="fixed";starfish.style.bottom="20px";starfish.style.right="20px";starfish.style.fontSize="30px";starfish.style.cursor="pointer";starfish.style.zIndex="30";document.body.appendChild(starfish);
starfish.addEventListener("click",()=>{starfishTaps++;if(starfishTaps===7){love++;auroraOpacity=0.3;playSFX('assets/sfx/twinkle.mp3');alert("You were never dumb. Just soft in a world that isn’t.");}});

/* Play Scene Engine */
async function playScene(scene){
    textDiv.innerHTML="";
    chapterDiv.innerText=scene.chapter;
    if(scene.effect)scene.effect();
    for(let line of scene.lines){
        if(line.animation)await line.animation();
        await typeText(line.text,line.emotion||"normal");
    }
    if(scene.interaction){
        await scene.interaction();
    }
}

/* Full Scene Definitions */
const scenes=[
  {chapter:"PROLOGUE",lines:[{text:"Some stories don’t begin with love…",emotion:"romantic"},{text:"They begin with almost losing it.",emotion:"dry"},{text:"This is our story, Tanisha and Rafay.",emotion:"romantic"}],effect:()=>{hideCinematicBars();},interaction: async ()=>{playScene(scenes[1]);}},

  {chapter:"THE ARGUMENT",lines:[{text:"Rafay didn’t mean to sound angry…",emotion:"romantic"},{text:"Tanisha went quiet…",emotion:"dry"},{text:"Messages became short, cold.",emotion:"dry"}],effect:()=>{showCinematicBars();playMusic('assets/music/tense.mp3');},interaction: async ()=>{const prompt=document.createElement("div");prompt.innerText="Hold the screen to apologize";prompt.style.fontSize="18px";prompt.style.color="white";prompt.style.marginTop="20px";textDiv.appendChild(prompt);return new Promise(resolve=>{let holdProgress=0;function startHold(){holdInterval=setInterval(()=>{holdProgress+=2;if(holdProgress>=100){clearInterval(holdInterval);playScene(scenes[2]);resolve();}},100);}document.body.onmousedown=startHold;document.body.ontouchstart=startHold;document.body.onmouseup=document.body.ontouchend=()=>{clearInterval(holdInterval);holdProgress=0;};});}},

  {chapter:"CAR CRASH",lines:[{text:"The world blurred around Rafay…",emotion:"dry"},{text:"He feared he might lose her…",emotion:"romantic"}],effect: async ()=>{await screenShake(15,700);await flashWhite(400);playSFX('assets/sfx/crash.mp3');},interaction: async ()=>{playScene(scenes[3]);}},

  {chapter:"COMFORTING MOMENT",lines:[{text:"Mera dil, I am right here always loving you",emotion:"romantic"},{text:"Always. No matter what.",emotion:"romantic"}],effect:()=>{setAurora(0.2);setZoom(1.05);playMusic('assets/music/romantic.mp3');},interaction: async ()=>{playScene(scenes[4]);}},

  {chapter:"PLAYFUL STARFISH",lines:[{text:"Hey lil starfishy, tap me!",emotion:"playful"},{text:"Show me your love.",emotion:"playful"}],interaction: async ()=>{playScene(scenes[5]);}},

  {chapter:"FIRST KISS MEMORY",lines:[{text:"The night sky glimmered over the city lights…",emotion:"romantic"},{text:"Our first kiss, Tanisha, I remember every moment.",emotion:"romantic"}],effect:()=>{setAurora(0.4);setZoom(1.1);playSFX('assets/sfx/kiss.mp3');},interaction: async ()=>{playScene(scenes[6]);}},

  {chapter:"FEAR OF LOSING EACH OTHER",lines:[{text:"Every time I lose sight of you, my heart races…",emotion:"romantic"},{text:"We promised, no matter what, we stay together.",emotion:"romantic"}],effect:()=>{setAurora(0.25);setZoom(1.05);playSFX('assets/sfx/heartbeat.mp3');},interaction: async ()=>{playScene(scenes[7]);}},

  {chapter:"SOFT HEALING MOMENTS",lines:[{text:"You warm up, my perfect lil girl…",emotion:"romantic"},{text:"Your smile heals every scar, every fear.",emotion:"romantic"}],effect:()=>{setAurora(0.3);setZoom(1.05);},interaction: async ()=>{playScene(scenes[8]);}},

  {chapter:"HIDDEN ENDING",lines:[{text:"You held me, soft and true…",emotion:"romantic"},{text:"No matter what, my heart is yours forever.",emotion:"romantic"}],effect:()=>{setAurora(0.5);playSFX('assets/sfx/twinkle.mp3');},interaction: async ()=>{playScene(scenes[9]);}},

  {chapter:"FINAL SCENE",lines:[{text:"Mera jaan, my perfect lil princess…",emotion:"romantic"},{text:"No matter what happens, I will always love you.",emotion:"romantic"}],effect:()=>{setAurora(0.6);setZoom(1.1);playMusic('assets/music/final.mp3');},interaction: async ()=>{console.log('Game Complete');}}
];

/* Start Game */
playScene(scenes[0]);
