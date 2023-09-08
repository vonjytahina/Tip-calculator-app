const billInput = document.getElementById("bill");
const errorDiv = document.querySelector(".bill .error");
const errorDivPeople = document.querySelector(".people .error");
const tipLiElements = document.querySelectorAll(".tip li:not(.custom)");
const peopleInput = document.getElementById("people-number");
const customInput = document.querySelector(".tip ul li.custom input");
const tipValueElement = document.querySelector(".tip-ammount .value");
const totalValueElement = document.querySelector(".total .value");
const resetButton = document.querySelector(".reset");

let percentageValue = "0";

// Function to validate the bill input
function validateBillInput() {
  const billValue = parseFloat(billInput.value);

  if (isNaN(billValue)) {
    errorDiv.style.display = "block";
    billInput.classList.add("input-error");
    errorDiv.textContent = "Enter a numeric value";
  } else if (billValue === 0) {
    errorDiv.style.display = "block";
    billInput.classList.add("input-error");
    errorDiv.textContent = "Can't be zero";
  } else if (billValue < 0) {
    errorDiv.style.display = "block";
    billInput.classList.add("input-error");
    errorDiv.textContent = "Enter a positive value";
  } else {
    errorDiv.style.display = "none";
    billInput.classList.remove("input-error");
    errorDiv.textContent = "";
    return true;
  }
}

// Function to validate the people input
function validatePeopleInput() {
  const peopleValue = peopleInput.value.trim();

  if (!/^\d+$/.test(peopleValue)) {
    errorDivPeople.style.display = "block";
    peopleInput.classList.add("input-error");
    errorDivPeople.textContent = "Enter an integer";
  } else if (peopleValue === "0") {
    errorDivPeople.style.display = "block";
    peopleInput.classList.add("input-error");
    errorDivPeople.textContent = "Can't be zero";
  } else if (parseInt(peopleValue) < 0) {
    errorDivPeople.style.display = "block";
    peopleInput.classList.add("input-error");
    errorDivPeople.textContent = "Enter a positive value";
  } else {
    errorDivPeople.style.display = "none";
    peopleInput.classList.remove("input-error");
    return true;
  }
}

function validateCustomInput() {
  const customValue = customInput.value.trim();

  if (!/^\d+$/.test(customValue)) {
    customInput.classList.add("input-error");
  } else if (parseInt(customValue) <= 0) {
    customInput.classList.add("input-error");
  } else {
    customInput.classList.remove("input-error");
    if (validateBillInput() && validatePeopleInput()) {
      calculateTipAndTotal()
    }
    return true;
  }
}

function calculateTipAndTotal() {
  const billValue = parseFloat(billInput.value);
  const peopleValue = parseFloat(peopleInput.value);

    // Calculate the tip with two decimal places and round down
    let tipCalc =
      Math.floor(((billValue * percentageValue) / 100 / peopleValue) * 100) /
      100;

    // Calculate the total with two decimal places and round down
    let tipPlusPercentage = (
      (billValue + (billValue * percentageValue) / 100) /
      peopleValue
    ).toFixed(2);
    tipValueElement.textContent = `$${tipCalc.toFixed(2)}`;
    totalValueElement.textContent = `$${tipPlusPercentage}`;
    resetButton.classList.remove("disabled");
  
}

function handleCustomInputKeyPress(event) {
  if (event.key === "Enter") {
    if (validateCustomInput() && validateBillInput() && validatePeopleInput()) {
      percentageValue = parseFloat(customInput.value);
      console.log(percentageValue);
      calculateTipAndTotal();
    }
  }
}

customInput.addEventListener("keypress", handleCustomInputKeyPress);

customInput.addEventListener("input", () => {
  const customValue = customInput.value.trim();

  if (!/^\d+$/.test(customValue)) {
    customInput.classList.add("input-error");
  } else if (parseInt(customValue) <= 0) {
    customInput.classList.add("input-error");
  } else {
    customInput.classList.remove("input-error");
  }
});

tipLiElements.forEach((tipLi) => {
  tipLi.addEventListener("click", (e) => {
    tipLiElements.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    percentageValue = parseFloat(e.target.getAttribute("data-percentage"));
    validateBillInput();
    validatePeopleInput();
    if (validateBillInput() && validatePeopleInput()) {
      calculateTipAndTotal();
    }
  });
});

resetButton.addEventListener("click", () => {
  tipValueElement.textContent = "$0.00";
  totalValueElement.textContent = "$0.00";
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipLiElements.forEach((tipLi) => {
    tipLi.classList.remove("active");
  });
  resetButton.classList.add('disabled')
});
