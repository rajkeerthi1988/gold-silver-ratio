let labels = []
let dataPoints = []

const ctx = document.getElementById("ratioChart").getContext("2d")

const ratioChart = new Chart(ctx,{
type:'line',
data:{
labels:labels,
datasets:[{
label:"Gold Silver Ratio",
data:dataPoints,
borderWidth:2,
fill:false
}]
},
options:{
responsive:true
}
})

async function getPrices(){

try{

let goldResponse = await fetch("https://api.gold-api.com/price/XAU")
let goldData = await goldResponse.json()

let silverResponse = await fetch("https://api.gold-api.com/price/XAG")
let silverData = await silverResponse.json()

let gold = goldData.price
let silver = silverData.price

document.getElementById("gold").innerHTML = "$" + gold.toFixed(2)
document.getElementById("silver").innerHTML = "$" + silver.toFixed(2)

let ratio = gold / silver

document.getElementById("ratio").innerHTML = ratio.toFixed(2)

updateChart(ratio)

}catch(error){

console.log("Price fetch failed", error)

}

}

function updateSignal(ratio){

document.getElementById("ratioValue").innerText = ratio.toFixed(2);

let signal = "";
let color = "";

if(ratio > 80){
signal = "Silver may be undervalued";
color = "green";
}
else if(ratio < 60){
signal = "Gold may be undervalued";
color = "goldenrod";
}
else{
signal = "Neutral zone";
color = "gray";
}

const text = document.getElementById("signalText");
text.innerText = signal;
text.style.color = color;

}

getPrices()
updateSignal(ratio)
setInterval(getPrices,5000)

<script src="https://s3.tradingview.com/tv.js"></script>

<script>
new TradingView.widget({
  "container_id": "tradingview_ratio",
  "width": "100%",
  "height": 500,
  "symbol": "TVC:GOLD/TVC:SILVER",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "en",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "allow_symbol_change": false
});
</script>





