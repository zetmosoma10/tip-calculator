const bill = document.getElementById("bill");
const people = document.getElementById("people");
const customTip = document.getElementById("CustomTip");
const textWarning = document.querySelector(".text-warning");
const tips = [...document.querySelectorAll(".tip")];
const btnReset = document.querySelector(".btn-reset");

colors = {
  dangerColor: "#e17052",
  defaultColor: "hsl(189, 41%, 97%)",
};

let billValue = 0;
let tipValue = 0;
let numberOfPeople = 1;

// Event for bill
bill.addEventListener("change", (event) => {
  billValue = parseInt(event.currentTarget.value);
  calculateTotal();
});
// Event for people
people.addEventListener("keyup", (event) => {
  numberOfPeople = parseInt(event.currentTarget.value);
  if (!numberOfPeople) {
    textWarning.style.display = "block";
    people.style.borderColor = colors.dangerColor;
    btnReset.disabled = true;
  } else {
    textWarning.style.display = "none";
    people.style.borderColor = colors.defaultColor;
    btnReset.removeAttribute("disabled");
  }

  calculateTotal();
});
// Event for customTip
customTip.addEventListener("change", (event) => {
  tipValue = parseFloat(event.currentTarget.value) / 100;
  calculateTotal();
});
// Event for tip
tips.forEach((tip) => {
  tip.addEventListener("click", (event) => {
    // Remove all active class on each tip
    for (let i = 0; i < tips.length; i++) {
      if (tips[i].classList.contains("tip-active")) {
        tips[i].classList.remove("tip-active");
      }
    }

    // add active class to clicked tip
    tip.classList.add("tip-active");

    tipValue = parseFloat(event.currentTarget.dataset.id) / 100;
    calculateTotal();
  });
});

// Reset Button
btnReset.addEventListener("click", () => {
  bill.value = "";
  customTip.value = "";
  people.value = "";

  tips.forEach((tip) => {
    tip.classList.remove("tip-active");
  });

  billValue = 0;
  tipValue = 0;
  numberOfPeople = 1;
  calculateTotal();
});

// calculateTotal();
function calculateTotal() {
  const tipPerPerson = (billValue * tipValue) / numberOfPeople;
  const totalPerPerson =
    (billValue + tipPerPerson * numberOfPeople) / numberOfPeople;

  displayData(tipPerPerson.toFixed(2), totalPerPerson.toFixed(2));
}

// Display Data
function displayData(tip, total) {
  const totalWrapper = document.querySelector(".total-wrapper");

  if (!tip || isNaN(tip)) tip = 0;
  if (!total || isNaN(total)) total = 0;

  totalWrapper.innerHTML = `<div class="tip-amount">
            <div>
              <p class="tip-person">Tip Amount</p>
              <p class="person">/ person</p>
            </div>
            <div class="tip-amount_person">$${tip}</div>
            </div>
          <div class="tip-amount">
            <div>
              <p class="tip-person">Total</p>
              <p class="person">/ person</p>
            </div>
            <div class="tip-amount_person">$${total}</div>
          </div>`;
}
displayData();
