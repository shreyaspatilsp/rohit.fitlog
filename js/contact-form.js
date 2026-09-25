document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("enquiryForm");
  if (!form) return;

  var successEl = document.getElementById("formSuccess");

  function setError(fieldId, message) {
    var field = document.getElementById(fieldId).closest(".field");
    var err = field.querySelector(".err");
    if (message) {
      field.classList.add("has-error");
      err.textContent = message;
    } else {
      field.classList.remove("has-error");
      err.textContent = "";
    }
  }

  function validate(data) {
    var valid = true;

    if (!data.name.trim()) { setError("cf-name", "Please enter your name."); valid = false; }
    else setError("cf-name", "");

    var phoneDigits = data.phone.replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10) { setError("cf-phone", "Enter a valid phone number."); valid = false; }
    else setError("cf-phone", "");

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("cf-email", "Enter a valid email address, or leave it blank.");
      valid = false;
    } else {
      setError("cf-email", "");
    }

    if (!data.message.trim()) { setError("cf-message", "Let Rohit know what you're looking for."); valid = false; }
    else setError("cf-message", "");

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value
    };

    if (!validate(data)) {
      successEl.classList.remove("is-visible");
      return;
    }

    var text =
      "Hi Rohit, I'm " + data.name + ".\n" +
      data.message +
      (data.email ? "\n\nEmail: " + data.email : "") +
      "\nPhone: " + data.phone;

    var waUrl = "https://wa.me/919595949194?text=" + encodeURIComponent(text);

    successEl.classList.add("is-visible");
    successEl.textContent = "Thanks, " + data.name.split(" ")[0] + " — opening WhatsApp so you can send this straight to Rohit.";

    window.open(waUrl, "_blank", "noopener");
    form.reset();
  });
});
