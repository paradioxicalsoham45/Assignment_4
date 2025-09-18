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
        const inCart = cart.find(item => item.name === s.name);
        serviceList.innerHTML += `
          <div class="service-item">
            <div class="service-info">
              <span class="service-name">${s.name}</span>
              <span class="price">₹${s.price}</span>
            </div>
            <button class="btn ${inCart ? "btn-remove" : "btn-add"}" onclick="toggleCart(${index})">
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
      const existing = cart.find(item => item.name === service.name);
      if (existing) {
        const pos = cart.indexOf(existing);
        cart.splice(pos, 1);
      } else {
        cart.push(service);
      }
      renderServices();
      renderCart();
    }

    renderServices();
