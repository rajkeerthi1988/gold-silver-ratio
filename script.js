const goldPrice = 2100
const silverPrice = 25

document.getElementById("gold").innerHTML = "$" + goldPrice
document.getElementById("silver").innerHTML = "$" + silverPrice

let ratio = goldPrice / silverPrice

document.getElementById("ratio").innerHTML = ratio.toFixed(2)

const ctx = document.getElementById('ratioChart')

new Chart(ctx,{
type:'line',

data:{
labels:["Jan","Feb","Mar","Apr","May","Jun"],
datasets:[{
label:"Gold Silver Ratio",
data:[78,80,82,79,85,84]
}]
}

})
