const successElm = document.getElementById("main__success");
const formElm = document.getElementById("main__form");
const nameInput = document.getElementById("input__name");
const numberInput = document.getElementById("input__number");
const monthInput = document.getElementById("input__exp-mm");
const yearInput = document.getElementById("input__exp-yy");
const cvcInput = document.getElementById("input__cvc");
const confirmBtn = document.getElementById("confirm");
const continueBtn = document.getElementById("continue");
const cardNameElm = document.getElementById("card__name");
const cardNumberElm = document.getElementById("card__number");
const cardExpElm = document.getElementById("card__exp");

function showSuccess() {
  successElm.style.display = "flex";
  formElm.style.display = "none";
}

function hideSuccess() {
  successElm.style.display = "none";
  formElm.style.display = "block";
}

function updateErrorState(id, error) {
  const element = document.getElementById(`error__${id}`);
  const parent = element.parentElement;

  if (error) {
    parent.className = "main__detail main__detail--error";
    element.innerHTML = error;
  } else {
    parent.className = "main__detail";
    element.innerHTML = "";
  }
}

function updateCardState(id, value) {
  const element = document.getElementById(`card__${id}`);
  element.innerText = value;
}

function isNumber(str) {
  return !isNaN(Number(str));
}

function validate() {
  const CANNOT_BE_BLANK = "Can't be blank!";
  const MUST_BE_NUMBER = "Wrong format, numbers only";
  const MUST_BE_CVC = "Wrong format, 3 digits only";

  let count = 0;
  let errorName;
  const name = nameInput.value;
  if (name.length === 0) {
    count++;
    errorName = CANNOT_BE_BLANK;
  }
  updateErrorState("name", errorName);

  const number = numberInput.value;
  const regexNumber = new RegExp(/^([0-9]{4}\ ){3}[0-9]{4}$/);
  let errorNumber;
  if (number.length === 0) {
    count++;
    errorNumber = CANNOT_BE_BLANK;
  } else if (!regexNumber.test(number)) {
    count++;
    errorNumber = MUST_BE_NUMBER;
  }
  updateErrorState("number", errorNumber);

  const month = monthInput.value;
  const year = yearInput.value;
  let errorExp;
  if (month.length === 0 || year.length === 0) {
    count++;
    errorExp = CANNOT_BE_BLANK;
  } else if (isNaN(month) || isNaN(year)) {
    count++;
    errorExp = MUST_BE_NUMBER;
  } else if (month > 12 || month < 0) {
    count++;
    errorExp = "Month must be between 1-12";
  }
  updateErrorState("exp", errorExp);

  const cvc = cvcInput.value;
  const regexCvc = new RegExp(/^[0-9]{3}$/);
  let errorCvc;
  if (cvc.length === 0) {
    errorCvc = CANNOT_BE_BLANK;
  } else if (isNumber(cvc) && !regexCvc.test(cvc)) {
    errorCvc = MUST_BE_CVC;
  } else if (!regexCvc.test(cvc)) {
    errorCvc = MUST_BE_NUMBER;
  }
  updateErrorState("cvc", errorCvc);

  if (count === 0) {
    showSuccess();
  }
}

confirmBtn.addEventListener("click", () => {
  validate();
});

continueBtn.addEventListener("click", () => {
  hideSuccess();
});

nameInput.addEventListener("change", (e) => {
  updateCardState("name", e.target.value);
});

numberInput.addEventListener("change", (e) => {
  updateCardState("number", e.target.value);
});

cvcInput.addEventListener("change", (e) => {
  updateCardState("cvc", e.target.value);
});
