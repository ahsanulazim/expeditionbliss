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
const couponAlert = document.getElementById("couponAlert");
const submit = document.getElementById("submit");

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
                }, 5000);
            }

        } else {
            sSeat.splice(seatIndex, 1)
            hotSeat[h].classList.remove("bg-main-color");
            hotSeat[h].classList.remove("hover:bg-green-600");
            hotSeat[h].classList.remove("text-white");
            const existingSelSeat = document.getElementById(`seat-${hotSeat[h].value}`);
            if (existingSelSeat) {
                extraSit.classList.remove("flex");
                extraSit.classList.add("hidden");
                msg.removeChild(existingSelSeat);
            }
        }

        //Next Button JS
        (sSeat.length > 0) ? submit.removeAttribute("disabled") : submit.setAttribute("disabled", "");
        //Next Button JS Ends

        selectCount.innerText = sSeat.length;
        totalFare.innerText = `BDT ${sSeat.length * 550}`;
        grandTotal.innerText = `BDT ${sSeat.length * 550}`;
        (sSeat.length == 0 || sSeat.length == 1) ? couponApply.setAttribute("disabled", "") : couponApply.removeAttribute("disabled", "");
        couponApply.addEventListener("click", function () {
            const coupon = document.getElementById("coupon").value.toUpperCase();
            if (coupon === "NEW15") {
                grandTotal.innerText = `BDT ${(sSeat.length * 550) - ((sSeat.length * 550) * 0.15)}`;
                if (sSeat.length == 2) {
                    couponAlert.innerHTML =
                        `<div role="alert" class="alert alert-info border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-inter">Use <span class="font-bold">COUPON20</span> to get more discount!</span>
              </div>`;
                    setInterval(function () {
                        couponAlert.innerHTML = "";
                    }, 4000);
                }
            } else if (sSeat.length == 2) {
                if (coupon === "COUPLE20") {
                    grandTotal.innerText = `BDT ${(sSeat.length * 550) - ((sSeat.length * 550) * 0.2)}`;
                }
            }
            else {
                grandTotal.innerText = `BDT ${sSeat.length * 550}`;
                if (coupon === "COUPLE20") {
                    couponAlert.innerHTML = `<div role="alert" class="alert alert-error border-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-inter"><span class="font-bold">COUPON20</span> is only applicable for 2 Seats!</span>
                </div>`}
                setInterval(function () {
                    couponAlert.innerHTML = "";
                }, 5000);
            }
        })
    });
}

//Form Js Here

const pname = document.getElementById("pname");
const phone = document.getElementById("phone");

submit.addEventListener("click", function () {
    if (pname.value == "" && phone.value == "") {
        pname.classList.add("border-red-600");
        phone.classList.add("border-red-600");
    } else if (phone.value == "") {
        phone.classList.add("border-red-600");
        pname.classList.remove("border-red-600");
    } else if (pname.value == "") {
        pname.classList.add("border-red-600");
        phone.classList.remove("border-red-600");
    } else {
        pname.classList.remove("border-red-600");
        phone.classList.remove("border-red-600");
    }

})