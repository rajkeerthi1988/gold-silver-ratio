let previousRatio = null;

async function fetchRatio(){

try{

const res = await fetch(
"https://fragrant-brook-82bb.alexkeerthi.workers.dev"
);

const data = await res.json();

if(!data.gold || !data.silver || !data.ratio){
throw new Error("Invalid API data");
}

let gold = data.gold;
let silver = data.silver;
let ratio = data.ratio;

/* UPDATE PRICES */

updateElement("goldPrice","$"+gold.toFixed(2));
updateElement("silverPrice","$"+silver.toFixed(2));

/* TREND INDICATOR */

let trendSymbol = "";
let trendColor = "black";

if(previousRatio !== null){

if(ratio > previousRatio){
trendSymbol = " ▲";
trendColor = "green";
}
else if(ratio < previousRatio){
trendSymbol = " ▼";
trendColor = "red";
}
else{
trendSymbol = " ▬";
trendColor = "gray";
}

}

updateElement("ratio", ratio.toFixed(2) + trendSymbol);

document.getElementById("ratio").style.color = trendColor;

previousRatio = ratio;

/* UPDATE RATIO DISPLAY */

updateElement("ratio", ratio.toFixed(2) + trendSymbol);

document.getElementById("ratio").style.color = trendColor;

/* STORE CURRENT RATIO */

previousRatio = ratio;

/* UPDATE DASHBOARD */

updateSignal(ratio);
updateStrategy(ratio);
updateGauge(ratio);
updateSentiment(ratio);

/* UPDATE TIME */

updateElement(
"lastUpdated",
"Last updated: " + new Date().toLocaleTimeString()
);

}catch(error){

console.error("Price fetch error:",error);

updateElement("ratio","API Error");

}

}

function updateElement(id,value){

const el = document.getElementById(id);

if(el){
el.innerText = value;
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

if(ratio > 80){
signal="Silver Undervalued";
color="green";
}
else if(ratio < 60){
signal="Gold Undervalued";
color="goldenrod";
}
else{
signal="Neutral Zone";
color="gray";
}

let el=document.getElementById("signal");
el.innerText=signal;
el.style.color=color;

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

function calculatePerformance(){

let start = parseFloat(document.getElementById("startRatio").value);
let end = parseFloat(document.getElementById("endRatio").value);

if(isNaN(start) || isNaN(end)){
document.getElementById("result").innerText = "Please enter valid ratios";
return;
}

let change = ((start - end) / start) * 100;

if(end < start){
document.getElementById("result").innerText =
"Silver outperforms Gold by about " + change.toFixed(2) + "%";
}

else if(end > start){
document.getElementById("result").innerText =
"Gold outperforms Silver by about " + change.toFixed(2) + "%";
}

else{
document.getElementById("result").innerText =
"No relative performance change.";
}

}

fetchRatio()

setInterval(fetchRatio,60000)

