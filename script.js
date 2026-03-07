let chart;
let labels = [];
let dataPoints = [];

async function getPrices(){

try{

const goldRes = await fetch("https://api.gold-api.com/price/XAU");
const silverRes = await fetch("https://api.gold-api.com/price/XAG");

const goldData = await goldRes.json();
const silverData = await silverRes.json();

const gold = goldData.price;
const silver = silverData.price;

const ratio = gold / silver;

document.getElementById("goldPrice").innerText = "$" + gold.toFixed(2);
document.getElementById("silverPrice").innerText = "$" + silver.toFixed(2);
document.getElementById("ratio").innerText = ratio.toFixed(2);

updateSignal(ratio);
updateChart(ratio);

}catch(err){

console.log(err);

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

createChart();
getPrices();

setInterval(getPrices,60000);
