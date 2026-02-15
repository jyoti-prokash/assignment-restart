const allProductsUrl = 'https://fakestoreapi.com/products';
const trendingProducts = () =>{
    fetch(allProductsUrl)
    .then(res => res.json())
    .then(data => trendingProductShow(data))
}
trendingProducts();
const trendingProductShow = (products) =>{
    const trendingContainer = document.getElementById('trending-container');
    const top3product = products.filter(product => product.rating?.rate > 4.6).slice(0, 3);
    top3product.forEach(product => {
        const {title, price, image, rating, category} = product;
        const div = document.createElement('div');
        div.classList.add('w-[420px]', 'h-[450px]', 'bg-base-100', 'shadow-xl', 'p-2', 'mx-auto');
        div.innerHTML = `
            <figure><img class="w-48 h-[230px] mx-auto" src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
            <div class="flex justify-between items-center gap-10">
            <p class="badge badge-soft badge-info p-2 text-lg font-semibold rounded-2xl">${category}</p>
            <p class="text-bold text-xl"> <span class=""><i class="fa-regular fa-star text-yellow-600 "></i> ${rating?.rate}</span>
            </p>
            </div>
                <h2 class="card-title">${title}</h2>
                <p class="text-xl font-bold">$${price}</p>
                <div class="flex justify-between">
                    <button class="btn font-bold">Details</button>
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `
        trendingContainer.appendChild(div);
})
}