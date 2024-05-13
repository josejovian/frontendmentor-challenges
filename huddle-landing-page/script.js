const parentInput = document.getElementsByClassName("mailing__input")[0];
const emailInput = document.getElementById("input__elm");
const emailError = document.getElementById("input__error");
const confirmBtn = document.getElementById("mailing__submit");

function validate() {
  const regex = new RegExp(/^\S+@\S+\.\S+$/);

  const isValid = regex.test(emailInput.value);

  if (isValid) {
    emailError.innerText = "";
    parentInput.classList = "mailing__input";
  } else {
    emailError.innerText = "Check your email please";
    parentInput.classList = "mailing__input mailing__input-error";
  }
}

confirmBtn.addEventListener("click", () => {
  validate();
});
