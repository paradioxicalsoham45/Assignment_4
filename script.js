const services = [
    { name: "Dry Cleaning", price: 200 },
    { name: "Wash & Fold", price: 100 },
    { name: "Ironing", price: 130 },
    { name: "Stain Removal", price: 150 },
    { name: "Leather & Suede Cleaning", price: 999 },
    { name: "Wedding Dress Cleaning", price: 2800 },
];

const cart = [];
const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const totalAmountEl = document.getElementById("totalAmount");

function renderServices() {
    serviceList.innerHTML = "";
    services.forEach((s, index) => {
        const inCart = cart.find((item) => item.name === s.name);
        serviceList.innerHTML += `
          <div class="service-item">
            <div class="service-info">
              <span class="service-name">${s.name}</span>
              <span class="price">₹${s.price}</span>
            </div>
            <button class="btn ${
              inCart ? "btn-remove" : "btn-add"
            }" onclick="toggleCart(${index})">
              ${inCart ? "Remove" : "Add"}
            </button>
          </div>
        `;
    });
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
        total += item.price;
        cartItems.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
          </tr>
        `;
    });
    totalAmountEl.textContent = total;
}

function toggleCart(index) {
    const service = services[index];
    const existing = cart.find((item) => item.name === service.name);
    if (existing) {
        const pos = cart.indexOf(existing);
        cart.splice(pos, 1);
    } else {
        cart.push(service);
    }
    renderServices();
    renderCart();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function sendMail() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const responseMessage = document.getElementById("resposeMessage");

    responseMessage.innerHTML = ""
    responseMessage.style.color = ""

    if (!fullName || !email || !phone) {
        responseMessage.innerHTML = "⚠️ Please fill in all fields."
        return;
    }

    if (!validateEmail(email)) {
        responseMessage.innerHTML = "⚠️ Please enter a valid email address.";
        return;
    }


    const templateParams = {
        to_email: email, // user input
        user_name: fullName, // user input
        user_phone: phone,
    };

    emailjs.send("service_14erkfu", "template_41rviac", templateParams).then(() => {
            responseMessage.style.color = "green";
            responseMessage.innerHTML = "✅ Thank you for booking the service! We will get back to you soon."
        })
        .catch(err => {
            responseMessage.style.color = "red"
            responseMessage.innerHTML = "❌ Failed to send email. Please try again later."
            console.error(err);
        })
}

renderServices();