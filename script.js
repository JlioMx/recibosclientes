function generarRecibos(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF("p","pt","letter");

let fechaBase = new Date(document.getElementById("fecha").value);
let distribuidora = document.getElementById("distribuidora").value;
let cliente = document.getElementById("cliente").value;
let credito = parseFloat(document.getElementById("credito").value);
let num_recibos = parseInt(document.getElementById("num_recibos").value);
let plazo = document.getElementById("plazo").value;

let saldo = credito;
let pago = credito / num_recibos;

let width = 612;
let height = 792;

let recibo_width = width / 2;
let recibo_height = height / 3;

for(let i=0;i<num_recibos;i++){

let col = i % 2;
let row = Math.floor(i/2) % 3;

let x = col * recibo_width;
let y = row * recibo_height;

let fechaRecibo = new Date(fechaBase);

if(plazo === "semana"){
fechaRecibo.setDate(fechaBase.getDate() + (7*i));
}else{
fechaRecibo.setDate(fechaBase.getDate() + (15*i));
}

saldo -= pago;

doc.rect(x,y,recibo_width,recibo_height);

doc.text(`Recibo #${i+1}`, x+20, y+30);
doc.text(`Distribuidora: ${distribuidora}`, x+20, y+50);
doc.text(`Cliente: ${cliente}`, x+20, y+70);

doc.text(`Fecha: ${fechaRecibo.toLocaleDateString()}`, x+20, y+90);

doc.text(`Pago: $${pago.toFixed(2)}`, x+20, y+110);

doc.text(`Saldo restante: $${saldo.toFixed(2)}`, x+20, y+130);

if((i+1)%6===0){
doc.addPage();
}

}

doc.save("recibos.pdf");

}