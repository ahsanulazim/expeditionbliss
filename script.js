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
        inputSeat.setAttribute("class", "hotSeat bg-grey-color btn font-inter block border-0 hover:border-0");
        inputSeat.setAttribute("value", `${seatCount}`);
        firstCol.appendChild(inputSeat);
    }
    for (let t = 0; t < secondSeatRow.length; t++) {
        let seatCount = seat[i] + secondSeatRow[t];

        const inputSeat = document.createElement("input");
        inputSeat.setAttribute("type", "button");
        inputSeat.setAttribute("class", "hotSeat bg-grey-color btn font-inter block border-0 hover:border-0");
        inputSeat.setAttribute("value", `${seatCount}`);
        secondCol.appendChild(inputSeat);
    }
}

const hotSeat = document.getElementsByClassName("hotSeat");
const msg = document.getElementById("msg");
const selectCount = document.getElementById("selectCount");
const sSeat = [];
let totalFare = document.getElementById("totalFare");
let fare = document.getElementsByClassName("fare");
const extraSit = document.getElementById("extraSit");
const couponApply = document.getElementById("couponApply");
const grandTotal = document.getElementById("grandTotal");

for (let h = 0; h < hotSeat.length; h++) {
    totalFare.innerText = `BDT ${0}`;
    hotSeat[h].addEventListener("click", function () {
        let seatIndex = sSeat.indexOf(hotSeat[h].value);
        if (seatIndex == -1) {
            if (sSeat.length < 4) {
                sSeat.push(hotSeat[h].value);
                hotSeat[h].classList.add("bg-main-color");
                hotSeat[h].classList.add("hover:bg-green-600");
                hotSeat[h].classList.add("text-white");

                const selectedLi = document.createElement('tr');
                selectedLi.innerHTML = `<td class="pl-0">${hotSeat[h].value}</td>
                    <td class="pl-0">AC Luxury</td>
                    <td class="pr-0 text-right fare">550</td>`;
                selectedLi.setAttribute('id', `seat-${hotSeat[h].value}`);
                msg.appendChild(selectedLi);

            } else {
                extraSit.classList.remove("hidden");
                extraSit.classList.add("flex");
                setInterval(function () {
                    extraSit.classList.remove("flex");
                    extraSit.classList.add("hidden");
                }, 3000);
            }

        } else {
            sSeat.splice(seatIndex, 1)
            hotSeat[h].classList.remove("bg-main-color");
            hotSeat[h].classList.remove("hover:bg-green-600");
            hotSeat[h].classList.remove("text-white");
            console.log("Exists");
            const existingSelSeat = document.getElementById(`seat-${hotSeat[h].value}`);
            if (existingSelSeat) {
                extraSit.classList.remove("flex");
                extraSit.classList.add("hidden");
                msg.removeChild(existingSelSeat);
            }
        }
        selectCount.innerText = 0 + sSeat.length;
        totalFare.innerText = `BDT ${sSeat.length * 550}`;
        grandTotal.innerText = `BDT ${sSeat.length * 550}`;
        (sSeat.length == 0 || sSeat.length == 1) ? couponApply.setAttribute("disabled", "") : couponApply.removeAttribute("disabled", "");
        couponApply.addEventListener("click", function () {
            const coupon = document.getElementById("coupon").value.toUpperCase();
            if (coupon === "NEW15") {
                grandTotal.innerText = `BDT ${(sSeat.length * 550) - ((sSeat.length * 550) * 0.15)}`;
            }
            else if (coupon === "COUPLE20") {
                grandTotal.innerText = `BDT ${(sSeat.length * 550) - ((sSeat.length * 550) * 0.2)}`;
            }
            else {
                grandTotal.innerText = `BDT ${sSeat.length * 550}`;
            }
            console.log(coupon);
        })
    });
    selectCount.innerText = 0;
}