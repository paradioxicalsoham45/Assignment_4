// Initialize EmailJS
(function () {
  emailjs.init("qXX-8LIBDoFzkCTF9"); // Replace with your actual EmailJS Public Key
})();

document.addEventListener("DOMContentLoaded", () => {
  const bookBtn = document.querySelector(".book-btn");
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  // Create confirmation message element
  const confirmationMsg = document.createElement("p");
  confirmationMsg.style.color = "green";
  confirmationMsg.style.marginTop = "10px";

  bookBtn.addEventListener("click", function () {
    if (!fullName.value || !email.value || !phone.value) {
      alert("Please fill in all fields before booking!");
      return;
    }

    // Prepare params for EmailJS
    const templateParams = {
      from_name: fullName.value,
      from_email: email.value,
      phone: phone.value,
      message: `Booking request from ${fullName.value} with phone ${phone.value}`,
    };

    // Send email using EmailJS
    emailjs.send("service_0kjag4c", "template_j0t0tuc", templateParams).then(
      function () {
        confirmationMsg.textContent =
          "Thank you For Booking the Service. We will get back to you soon!";
        bookBtn.insertAdjacentElement("afterend", confirmationMsg);

        // Reset form fields
        fullName.value = "";
        email.value = "";
        phone.value = "";
      },
      function (error) {
        console.error("FAILED...", error);
        alert("Oops! Something went wrong. Please try again.");
      }
    );
  });
});
