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

    // const bookBtn = document.getElementById("bookBtn");
    // if (cart.length > 0) {
    //     bookBtn.disabled = false;
    //     bookBtn.style.opacity = 1;
    // } else {
    //     bookBtn.disabled = true;
    //     bookBtn.style.opacity = 0.5;
    // }
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
    const responseMessage = document.getElementById("responseMessage");

    responseMessage.innerHTML = "";
    responseMessage.style.color = "";

    if (cart.length === 0) {
        responseMessage.style.color = "red";
        responseMessage.innerHTML = "⚠️ Please add at least one service to the cart before booking.";
        return;
    }

    if (!fullName || !email || !phone) {
        responseMessage.innerHTML = "⚠️ Please fill in all fields.";
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
        services_list: cart.map(item => item.name).join(", "),
        total_amount: cart.reduce((sum, item) => sum + item.price, 0), // optional: send total
    };

    emailjs
        .send("service_14erkfu", "template_41rviac", templateParams)
        .then(() => {
            responseMessage.style.color = "green";
            responseMessage.innerHTML =
                "✅ Thank you for booking the service! We will get back to you soon.";
            setTimeout(() => {
                responseMessage.classList.add("fade-out");

                setTimeout(() => {
                    document.getElementById("fullName").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("phone").value = "";
                    cart.splice(0, cart.length)
                    renderCart();
                    renderServices();
                    responseMessage.remove("fade-out");
                    responseMessage.innerHTML = "";
                    responseMessage.style.color = ""
                }, 4000);
            }, 3000);
        })
        .catch((err) => {
            responseMessage.style.color = "red";
            responseMessage.innerHTML =
                "❌ Failed to send email. Please try again later.";
            console.error(err);
        });
}

renderServices();