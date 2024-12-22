const firstCol = document.getElementById("firstCol");
const secondCol = document.getElementById("secondCol");
const serial = document.getElementById("serial");

let seat = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
let firstSeatRow = [1, 2];
let secondSeatRow = [3, 4];

for (let i = 0; i < seat.length; i++) {
    let a = seat[i];
    const allSerial = document.createElement("p")
    allSerial.innerText = a;
    allSerial.setAttribute("class", "font-inter")
    serial.appendChild(allSerial)
    for (let s = 0; s < firstSeatRow.length; s++) {
        let seatCount = seat[i] + firstSeatRow[s];

        const inputSeat = document.createElement("input");
        inputSeat.setAttribute("type", "button");
        inputSeat.setAttribute("class", "hotSeat btn font-inter block");
        inputSeat.setAttribute("value", `${seatCount}`);
        firstCol.appendChild(inputSeat);
    }
    for (let t = 0; t < secondSeatRow.length; t++) {
        let seatCount = seat[i] + secondSeatRow[t];

        const inputSeat = document.createElement("input");
        inputSeat.setAttribute("type", "button");
        inputSeat.setAttribute("class", "hotSeat btn font-inter block");
        inputSeat.setAttribute("value", `${seatCount}`);
        secondCol.appendChild(inputSeat);
    }
}