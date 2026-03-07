let chart;
let labels = [];
let dataPoints = [];

async function getPrices(){

try{

const res = await fetch("https://api.metals.live/v1/spot");
const data = await res.json();

let gold = data.items[0].xauPrice;
let silver = data.items[0].xagPrice;

let ratio = gold / silver;

document.getElementById("goldPrice").innerText = "$" + gold.toFixed(2);
document.getElementById("silverPrice").innerText = "$" + silver.toFixed(2);
document.getElementById("ratio").innerText = ratio.toFixed(2);

updateSignal(ratio);
updateStrategy(ratio);
updateChart(ratio);
updateGauge(ratio);
updateSentiment(ratio);  
updatePerformance(gold, silver)
updateTime();

}catch(error){

console.log("API error:", error);

}

}


function updateSignal(ratio){

let signal="";

if(ratio > 80){
signal="Silver undervalued";
}
else if(ratio < 60){
signal="Gold undervalued";
}
else{
signal="Neutral";
}

document.getElementById("signalText").innerText = signal;

}

function createChart(){

const ctx = document.getElementById("ratioChart");

chart = new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Gold Silver Ratio",
data:dataPoints,
borderWidth:3,
tension:0.4,
pointRadius:3,
fill:false
}]
},

options:{
responsive:true,

animation:{
duration:800
},

plugins:{
legend:{
display:true
},
tooltip:{
enabled:true
}
},

scales:{
y:{
beginAtZero:false
}
}

}

});

}

function updateChart(ratio){

const time=new Date().toLocaleTimeString();

labels.push(time);
dataPoints.push(ratio);

if(labels.length>20){

labels.shift();
dataPoints.shift();

}

chart.update();

}

function updateStrategy(ratio){

let signal="";
let advice="";

if(ratio > 80){

signal="Switch to Silver";
advice="Silver historically outperforms when ratio is high.";

}

else if(ratio < 60){

signal="Switch to Gold";
advice="Gold historically outperforms when ratio is low.";

}

else{

signal="Hold Position";
advice="Market is balanced between gold and silver.";

}

document.getElementById("strategySignal").innerText = signal;
document.getElementById("strategyAdvice").innerText = advice;

}

function updateGauge(ratio){

const ctx = document.getElementById("ratioGauge");

new Chart(ctx,{
type:'doughnut',
data:{
datasets:[{
data:[ratio,120-ratio],
backgroundColor:[
"#ffd700",
"#eeeeee"
]
}]
},
options:{
rotation:-90,
circumference:180,
cutout:'70%',
plugins:{
title:{
display:true,
text:"Live Gold Silver Ratio"
},
legend:{
display:false
}
}
}
});

}
function updateTime(){

let now = new Date();

document.getElementById("lastUpdated").innerText =
"Last Updated: " + now.toLocaleTimeString();

}

function updateSentiment(ratio){

let sentiment="";
let color="";

if(ratio > 80){

sentiment="Bullish for Silver";
color="green";

}
else if(ratio < 60){

sentiment="Bullish for Gold";
color="goldenrod";

}
else{

sentiment="Neutral Market";
color="gray";

}

document.getElementById("sentimentValue").innerText = sentiment;
document.getElementById("sentimentValue").style.color = color;

document.getElementById("sentimentText").innerText =
"Based on the current Gold-Silver Ratio.";

}

function updateSignal(ratio){

let signal = "";
let color = "";

if(ratio > 80){
signal = "Silver Looks Undervalued";
color = "green";
}

else if(ratio < 60){
signal = "Gold Looks Undervalued";
color = "gold";
}

else{
signal = "Neutral Zone";
color = "gray";
}

const el = document.getElementById("ratioSignal");
el.innerText = signal + " (Ratio: " + ratio.toFixed(2) + ")";
el.style.color = color;

}

function updatePerformance(gold, silver){

let winner = "";
let text = "";

if(gold > silver){
winner = "Gold Stronger Today";
text = "Gold price is outperforming silver today.";
}
else if(silver > gold){
winner = "Silver Stronger Today";
text = "Silver price is outperforming gold today.";
}
else{
winner = "Equal Performance";
text = "Both metals are moving similarly.";
}

document.getElementById("performanceWinner").innerText = winner;
document.getElementById("performanceText").innerText = text;

}

createChart();
getPrices();

setInterval(getPrices,60000);
















