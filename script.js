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

console.log("Price fetch failed")

}

}

getPrices()

setInterval(getPrices,60000)

let labels = []
let dataPoints = []

const ctx = document.getElementById("ratioChart")

const ratioChart = new Chart(ctx,{
type:'line',
data:{
labels:labels,
datasets:[{
label:"Gold Silver Ratio",
data:dataPoints,
borderWidth:2
}]
}
})

function updateChart(ratio){

let time = new Date().toLocaleTimeString()

labels.push(time)
dataPoints.push(ratio)

if(labels.length > 20){
labels.shift()
dataPoints.shift()
}

ratioChart.update()

}