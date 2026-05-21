async function loadProducts() {

  const response = await fetch("http://localhost:5000/products");

  const products = await response.json();

  const productsDiv = document.getElementById("products");

  productsDiv.innerHTML = "";

  products.forEach(product => {

    productsDiv.innerHTML += `
    
      <div class="card">

        <img src="${product.image}">

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <button onclick="openProduct()">
          View Details
        </button>

      </div>
    `;
  });
}

function openProduct(){

  window.location.href = "product.html";

}

loadProducts();