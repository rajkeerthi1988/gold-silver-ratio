async function fetchRatio(){

try{

const res = await fetch(
"https://fragrant-brook-82bb.alexkeerthi.workers.dev"
);

const data = await res.json();

let gold = data.gold;
let silver = data.silver;
let ratio = data.ratio;

updateElement("goldPrice","$"+gold.toFixed(2));
updateElement("silverPrice","$"+silver.toFixed(2));
updateElement("ratio",ratio.toFixed(2));

updateSignal(ratio);
updateStrategy(ratio);
updateGauge(ratio);
updateSentiment(ratio);

}catch(error){

console.error("Price fetch error:",error);

updateElement("ratio","API Error");

}

}


function updateElement(id,value){

const el=document.getElementById(id);

if(el){
el.innerText=value;
}

}


function updateFromManual(){

let ratio=parseFloat(document.getElementById("manualRatio").value);

if(isNaN(ratio)){
alert("Please enter a valid ratio");
return;
}

updateElement("ratio",ratio.toFixed(2));

updateSignal(ratio);
updateStrategy(ratio);
updateGauge(ratio);
updateSentiment(ratio);

}


function updateSignal(ratio){

let signal="";
let color="gray";

if(ratio>80){
signal="Silver Undervalued";
color="green";
}
else if(ratio<60){
signal="Silver Overvalued";
color="red";
}
else{
signal="Neutral Zone";
color="orange";
}

const el=document.getElementById("signal");

if(el){
el.innerText=signal;
el.style.background=color;
el.style.color="white";
}

}

function updateStrategy(ratio){

let strategy="";

if(ratio>80){
strategy="Consider Buying Silver / Selling Gold";
}
else if(ratio<60){
strategy="Consider Buying Gold / Selling Silver";
}
else{
strategy="Hold Current Allocation";
}

updateElement("strategy",strategy);

}


function updateSentiment(ratio){

let sentiment="";

if(ratio>85){
sentiment="Extreme Silver Opportunity";
}
else if(ratio>75){
sentiment="Silver Slightly Undervalued";
}
else if(ratio<55){
sentiment="Silver Expensive";
}
else{
sentiment="Balanced Market";
}

updateElement("sentiment",sentiment);

}


function updateGauge(ratio){

const canvas=document.getElementById("gauge");

if(!canvas) return;

const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,300,150);

let percentage=Math.min(ratio/120,1);

ctx.beginPath();
ctx.arc(150,150,100,Math.PI,Math.PI+(Math.PI*percentage));
ctx.lineWidth=20;
ctx.strokeStyle="#FFD700";
ctx.stroke();

ctx.font="20px Arial";
ctx.fillStyle="black";
ctx.fillText(ratio.toFixed(1),135,120);

}


fetchRatio()

setInterval(fetchRatio,60000)

