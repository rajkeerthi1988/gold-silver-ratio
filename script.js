async function fetchRatio(){

try{

const response = await fetch("https://api.metals.live/v1/spot");

const data = await response.json();

let gold = data.find(m => m.gold)?.gold;
let silver = data.find(m => m.silver)?.silver;

if(!gold || !silver){
throw new Error("Metal prices missing");
}

let ratio = gold / silver;

document.getElementById("ratio").innerText = ratio.toFixed(2);

updateSignal(ratio);
updateStrategy(ratio);
updateGauge(ratio);
updateSentiment(ratio);

}catch(error){

console.error("Price fetch error:", error);

document.getElementById("ratio").innerText="API Error";

}

}

function updateFromManual(){

let ratio = parseFloat(document.getElementById("manualRatio").value);

if(isNaN(ratio)){
alert("Please enter a valid ratio");
return;
}

document.getElementById("ratio").innerText = ratio.toFixed(2);

updateSignal(ratio);
updateStrategy(ratio);
updateGauge(ratio);
updateSentiment(ratio);

}


function updateSignal(ratio){

let signal="";

if(ratio > 80){
signal="Silver Undervalued";
}
else if(ratio < 60){
signal="Silver Overvalued";
}
else{
signal="Neutral Zone";
}

document.getElementById("signal").innerText=signal;

}



function updateStrategy(ratio){

let strategy="";

if(ratio > 80){
strategy="Consider Buying Silver / Selling Gold";
}
else if(ratio < 60){
strategy="Consider Buying Gold / Selling Silver";
}
else{
strategy="Hold Current Allocation";
}

document.getElementById("strategy").innerText=strategy;

}



function updateSentiment(ratio){

let sentiment="";

if(ratio > 85){
sentiment="Extreme Silver Opportunity";
}
else if(ratio > 75){
sentiment="Silver Slightly Undervalued";
}
else if(ratio < 55){
sentiment="Silver Expensive";
}
else{
sentiment="Balanced Market";
}

document.getElementById("sentiment").innerText=sentiment;

}



function updateGauge(ratio){

const canvas=document.getElementById("gauge");
const ctx=canvas.getContext("2d");

ctx.clearRect(0,0,300,150);

let percentage=Math.min(ratio/120,1);

ctx.beginPath();
ctx.arc(150,150,100,Math.PI,Math.PI+(Math.PI*percentage));
ctx.lineWidth=20;
ctx.stroke();

ctx.font="20px Arial";
ctx.fillText(ratio.toFixed(1),135,120);

}

fetchRatio()

setInterval(fetchRatio,60000)
