let chart;
let labels = [];
let dataPoints = [];

async function getPrices(){

try{

const res = await fetch("https://data-asg.goldprice.org/dbXRates/USD");
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

}catch(error){

console.log("API error:", error);

}

}
}

function updateSignal(ratio){

document.getElementById("ratioValue").innerText = ratio.toFixed(2);

let signal="";

if(ratio > 80){

signal="Silver may be undervalued";

}
else if(ratio < 60){

signal="Gold may be undervalued";

}
else{

signal="Neutral zone";

}

document.getElementById("signalText").innerText=signal;

}

function createChart(){

const ctx=document.getElementById("ratioChart");

chart=new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Gold Silver Ratio",
data:dataPoints,
borderWidth:2
}]
},

options:{
responsive:true
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
data:[ratio,100-ratio]
}]
},
options:{
rotation:-90,
circumference:180,
cutout:'70%',
plugins:{
legend:{display:false}
}
}
});

}

function updateTime(){

let now = new Date();

document.getElementById("lastUpdated").innerText =
"Last Updated: " + now.toLocaleTimeString();

}

createChart();
getPrices();
updateGauge(ratio);
updateTime();

setInterval(getPrices,60000);





