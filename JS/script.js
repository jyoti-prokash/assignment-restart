const allProductsUrl = "https://fakestoreapi.com/products";
const categoriesUrl = "https://fakestoreapi.com/products/categories";

const trendingProducts = () => {
  fetch(allProductsUrl)
    .then(res => res.json())
    .then(data => {
      trendingProductShow(data);
      loadProducts(); 
    });
};
trendingProducts();

const trendingProductShow = (products) => {
  const trendingContainer = document.getElementById("trending-container");
  trendingContainer.innerHTML = "";

  const top3product = products
    .filter(product => product.rating?.rate > 4.6)
    .slice(0, 3);
  top3product.forEach(product => {
    const { title, price, image, rating, category } = product;
    const div = document.createElement("div");
    div.classList.add("w-[420px]", "h-[450px]", "bg-base-100", "shadow-xl", "p-2", "mx-auto");

    div.innerHTML = `
      <figure><img class="w-48 h-[230px] mx-auto" src="${image}" /></figure>
      <div class="card-body">
        <div class="flex justify-between items-center">
          <p class="badge badge-info">${category}</p>
          <p><i class="fa-regular fa-star text-yellow-600"></i> ${rating?.rate}</p>
        </div>
        <h2 class="card-title">${title}</h2>
        <p class="text-xl font-bold">$${price}</p>
        <div class="flex justify-between">
          <button onclick="loadProductDetails(${product.id})" class="btn">Details</button>
          <button class="btn btn-primary">Add Cart</button>
        </div>
      </div>
    `;
    trendingContainer.appendChild(div);
  });
};

const loadProductDetails = (productId) => {
    fetch(`${allProductsUrl}/${productId}`)
      .then(res => res.json())
      .then(data => {
        const { title, price, image, rating, category, description } = data;
        const detailsContainer = document.getElementById("details-container");
        detailsContainer.innerHTML = `
          <div class="card bg-base-100 shadow-2xl p-6 max-w-2xl mx-auto">
  <figure class="bg-gray-100 rounded-xl p-6">
    <img
      class="w-[280px] h-[280px] object-contain mx-auto hover:scale-105 transition duration-300"
      src="${image}"
      alt="${title}"
    />
  </figure>
  <div class="card-body px-0">
    <div class="flex justify-between items-center">
      <p class="badge badge-info badge-lg">${category}</p>
      <div class="flex items-center gap-1 font-semibold text-yellow-500">
        ⭐ ${rating?.rate || "No rating"}
      </div>
    </div>
    <!-- Title -->
    <h2 class="text-2xl font-bold mt-2">
      ${title}
    </h2>
    <!-- Description -->
    <p class="text-gray-500 leading-relaxed max-h-36 overflow-y-auto">
      ${description}
    </p>
    <!-- Price -->
    <div class="text-3xl font-bold text-primary mt-3">
      $${price}
    </div>
    <!-- Buttons -->
    <div class="modal-action mt-6">
      <form method="dialog" class="flex gap-3 w-full">
        <button class="btn btn-outline flex-1">
          Close
        </button>
        <button class="btn btn-primary flex-1">
          🛒 Add Cart
        </button>
        <button class="btn btn-success flex-1">
          Buy Now
        </button>
      </form>
    </div>
  </div>
</div>
        `;
        document.getElementById("my_modal_1").showModal();
      });
  };  
  
  const showProducts = () => {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("products").classList.remove("hidden");
  };
  const showHome = () => {
    document.getElementById("products").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
  };
  
const productCategory = () => {
  fetch(categoriesUrl)
    .then(res => res.json())
    .then(data => {
      const categoryContainer = document.getElementById("category-container");
      categoryContainer.innerHTML = "";

      const allBtn = document.createElement("button");
      allBtn.innerText = "All Products";
      allBtn.className = "btn btn-outline rounded-2xl p-5 active-btn";

      allBtn.onclick = () => {
        loadProducts();
        setActiveBtn(allBtn);
      };
      categoryContainer.appendChild(allBtn);
      data.forEach(category => {
        const btn = document.createElement("button");
        btn.innerText = category;
        btn.className = "btn btn-outline rounded-2xl p-5";
        btn.onclick = () => {
          loadProducts(category);
          setActiveBtn(btn);
        };
        categoryContainer.appendChild(btn);
      });
    });
};

productCategory();

const setActiveBtn = (clickedBtn) => {
  document.querySelectorAll("#category-container button").forEach(btn => {
    btn.classList.remove("active-btn");
  });

  clickedBtn.classList.add("active-btn");
};
const loadProducts = (category = "") => {
    const url = category
      ? `${allProductsUrl}/category/${encodeURIComponent(category)}`
      : allProductsUrl;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const productContainer = document.getElementById("product-container");
        productContainer.innerHTML = "";
        data.forEach(product => {
          const div = document.createElement("div");
          div.innerHTML = `
            <div class="card p-5 shadow">
              <img class='w-48 h-[230px] mx-auto' src="${product.image}">
              <div class="flex justify-between items-center">
                <p class="badge badge-info">${product.category}</p>
                <p class="text-yellow-600">⭐ ${product?.rating?.rate || "No rating"}</p>
              </div>
              <h2 class="font-bold">${product.title}</h2>
              <p>$${product.price}</p>
              <div class="flex justify-between mt-3">
                <button onclick="loadProductDetails(${product.id})" class="btn">Details</button>
                <button class="btn btn-primary">Add Cart</button>
              </div>
            </div>
          `;
          productContainer.appendChild(div);
        });
      });
  };
  