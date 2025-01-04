// ================================
//              Slider
// ================================
const track = document.querySelector(".slider-track");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

let currentSlide = 0;

function calculateDimensions() {
  const cardWidth = document.querySelector(".card").offsetWidth + 10;
  const sliderWidth = document.querySelector(".slider").offsetWidth;
  const cardsToShow = Math.floor(sliderWidth / cardWidth);
  const totalCards = document.querySelectorAll(".card").length;

  return { cardWidth, cardsToShow, totalCards };
}

function updateslider() {
  const { cardWidth, cardsToShow, totalCards } = calculateDimensions();
  const offset = -(currentSlide * cardWidth);
  track.style.transform = `translateX(${offset}px)`;

  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide >= totalCards - cardsToShow;
}

nextButton.addEventListener("click", () => {
  const { cardsToShow, totalCards } = calculateDimensions();
  if (currentSlide < totalCards - cardsToShow) {
    currentSlide++;
    updateslider();
  }
});

prevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateslider();
  }
});

// Update card dimensions on window resize
window.addEventListener("resize", updateslider);

// Initialize slider
updateslider();

// ================================
//           Add to cart
// ================================
// Cart data array and cart count element
const cart = [];
const cartCountElement = document.getElementById("cart-count");

// Modal elements
const cartModal = document.getElementById("cart-modal");
const closeModalButton = document.getElementById("close-modal");
const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");

// Select all 'Shop Now' buttons
const shopNowButtons = document.querySelectorAll(".shopnow-btn");

// Attach click event listeners to each button
shopNowButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const productName = card.querySelector("h3").textContent;
    const productPrice = parseFloat(
      card.querySelector("h4").textContent.replace(/[^0-9.-]+/g, "")
    );

    const product = {
      name: productName,
      price: productPrice,
    };

    // Add product to cart
    cart.push(product);
    alert(`${productName} has been added to the cart!`);
    updateCart();
  });
});

// Function to update the cart UI and show the number of items
function updateCart() {
  cartCountElement.innerHTML = `<img class="cart" src="assets/shopping-bag.png" alt="cart-icon"><span class="cart-count-badge">${cart.length}</span>`;
}

// Open the cart modal
cartCountElement.addEventListener("click", () => {
  updateCartModal();
  cartModal.style.display = "block";
});

// Close the modal
closeModalButton.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Update the modal with cart items and total
function updateCartModal() {
  cartItemsElement.innerHTML = "";
  let totalPrice = 0;

  // Check if the cart is empty
  if (cart.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty.";
    emptyMessage.classList.add("empty-cart-message");
    cartItemsElement.appendChild(emptyMessage);
  } 
  
  else {
    cart.forEach((product) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      itemElement.innerHTML = `
          <p>${product.name}</p>
          <p>Price: $${product.price}</p>
        `;

      cartItemsElement.appendChild(itemElement);
      totalPrice += product.price;
    });
  }

  // Update the total price in the modal
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// close the cart modal and update product counter
function checkout() {
  cartModal.style.display = "none";

  cart.length = 0;
  updateCart();
}

//contact Form
// Get the checkbox and submit button elements
const checkbox = document.getElementById("data");
const submitButton = document.getElementById("submit-btn");

// Add an event listener to the checkbox
checkbox.addEventListener("change", function () {
  // Enable or disable the submit button based on the checkbox state
  submitButton.disabled = !checkbox.checked;
});
