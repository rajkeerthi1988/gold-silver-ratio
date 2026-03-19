let previousRatio = localStorage.getItem("previousRatio");

async function fetchRatio(){

try{

const res = await fetch(
"https://fragrant-brook-82bb.alexkeerthi.workers.dev"
);

const data = await res.json();

if(!data.gold || !data.silver || !data.ratio){
throw new Error("Invalid API data");
}

let gold = Number(data.gold);
let silver = Number(data.silver);
let ratio = Number(data.ratio);

if(!gold || !silver){
console.error("Invalid price data", data);
return;
}
  
/* UPDATE PRICES */

updateElement("goldPrice","$" + gold.toFixed(2));
updateElement("silverPrice","$" + silver.toFixed(2));
  
updateElement("topGold","Gold: $" + gold.toFixed(2));
updateElement("topSilver","Silver: $" + silver.toFixed(2));
updateElement("topRatio","Ratio: " + ratio.toFixed(2));
  
/* TREND INDICATOR */

let trendSymbol = "";
let trendColor = "black";

if(previousRatio !== null){

previousRatio = parseFloat(previousRatio);

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

localStorage.setItem("previousRatio", ratio);
previousRatio = ratio;

/* STORE CURRENT RATIO */

previousRatio = ratio;

/* UPDATE DASHBOARD */

updateSignal(ratio);
updateStrategy(ratio);
updateGauge(ratio);
updateSentiment(ratio);
updateRatioZone(ratio);
  
/* UPDATE TIME */

updateElement(
"lastUpdated",
"Last updated: " + new Date().toLocaleTimeString()
);

}catch(error){

console.error("Price fetch error:",error);

updateElement("ratio","⚠ API Error");
updateElement("goldPrice","--");
updateElement("silverPrice","--");

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
ctx.fillStyle="white";
ctx.fillText(ratio.toFixed(1),135,120);

}

function calculatePerformance(){

let goldStart = parseFloat(document.getElementById("goldStart").value);
let goldEnd = parseFloat(document.getElementById("goldEnd").value);

let silverStart = parseFloat(document.getElementById("silverStart").value);
let silverEnd = parseFloat(document.getElementById("silverEnd").value);

if(isNaN(goldStart) || isNaN(goldEnd) || isNaN(silverStart) || isNaN(silverEnd)){
document.getElementById("performanceResult").innerText = "Please enter valid values";
return;
}

let goldReturn = ((goldEnd - goldStart) / goldStart) * 100;
let silverReturn = ((silverEnd - silverStart) / silverStart) * 100;

let result = "";

if(goldReturn > silverReturn){
result = "Gold performed better (" + goldReturn.toFixed(2) + "% vs " + silverReturn.toFixed(2) + "%)";
}
else if(silverReturn > goldReturn){
result = "Silver performed better (" + silverReturn.toFixed(2) + "% vs " + goldReturn.toFixed(2) + "%)";
}
else{
result = "Both performed equally";
}

document.getElementById("performanceResult").innerText = result;

}

function updateRatioZone(ratio){

let position = Math.min(Math.max(ratio,40),120);

let percent = ((position-40)/80)*100;

const indicator = document.getElementById("ratioIndicator");
const textEl = document.getElementById("ratioZoneText");

if(indicator){
indicator.style.left = percent + "%";
}

if(textEl){
textEl.innerText = text;
}

let text="";

if(ratio>80){
text="Silver appears historically undervalued.";
}
else if(ratio<60){
text="Gold appears historically undervalued.";
}
else{
text="Ratio in neutral historical zone.";
}

document.getElementById("ratioZoneText").innerText=text;

}

const historyLabels = [
"1980","1985","1990","1995","2000",
"2005","2010","2015","2020","2025"
];

const historyData = [
15,45,95,65,60,
50,40,75,120,80
];

const ctx = document.getElementById("historyChart");

if(ctx){
new Chart(ctx,{
  type:"line",
  data:{
    labels:historyLabels,
    datasets:[{
      label:"Gold Silver Ratio",
      data:historyData,
      borderWidth:3,
      tension:0.3,
      pointRadius:4,
      fill:false
    }]
  },
  options:{
    responsive:true,
    plugins:{ legend:{display:true} },
    scales:{ y:{beginAtZero:false} }
  }
});
}


fetchRatio()

let isFetching = false;

async function fetchRatio(){

if(isFetching) return;
isFetching = true;

try{
  setInterval(fetchRatio,60000)
}
catch(error){
  console.error("Price fetch error:",error);
}
finally{
  isFetching = false;
}

}

