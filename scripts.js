const buttons = document.querySelectorAll(".item-slider");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // remove .active de todos
    buttons.forEach((btn) => btn.classList.remove("active"));

    // adiciona .active ao clicado
    button.classList.add("active");

    // adiciona a animação "jump"
    button.classList.add("jump");

    // remove a classe de animação depois que ela termina
    setTimeout(() => {
      button.classList.remove("jump");
    }, 400); // mesmo tempo da animação no CSS
  });
});

class Product {
  constructor(title, oldPrice, price, image, collection) {
    this.title = title;
    this.oldPrice = oldPrice;
    this.price = price;
    this.image = image;
    this.collection = collection;
  }
}

const products = [
  new Product(
    "Desodorante Cristal Stick Vegano 120g ",
    95.0,
    85.5,
    "https://alvapersonalcare.com.br/cdn/shop/files/5_1_f6c48bf5-803c-46ac-aac6-d7dcb1733cd8.png?v=1748520280&width=600",
    "desodorante"
  ),
  new Product(
    "Desodorante Cristal Stick Vegano 60g ",
    75.0,
    67.5,
    "https://alvapersonalcare.com.br/cdn/shop/files/5_1_f6c48bf5-803c-46ac-aac6-d7dcb1733cd8.png?v=1748520280&width=600",
    "desodorante"
  ),
  new Product(
    "Desodorante Roll on Cristal Natural Lavanda Vegano 70ml ",
    52.0,
    46.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/fotosstill_26.png?v=1741876797&width=600",
    "desodorante"
  ),
  new Product(
    "Shampoo Cabelos Normais e Secos - Lavanda e Baunilha Vegano 250ml ",
    64.0,
    57.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Leve_Mais_Pague_Menos_26.png?format=webp&v=1749999601&width=800",
    "body-hair"
  ),
  new Product(
    "Shampoo Cabelos Mistos e Oleosos - Alecrim e Menta Vegano 250ml ",
    64.0,
    57.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Leve_Mais_Pague_Menos_22.png?v=1749999638&width=600",
    "body-hair"
  ),
  new Product(
    "Raspador de Língua de Cobre ",
    58.0,
    52.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/34_ff568667-4393-4c6e-bb36-8a09df385a7d.png?v=1751459033&width=600",
    "oral-care"
  ),
  new Product(
    "Pasta de Dente Relax - Limão e Canela Vegano  90g",
    30.0,
    27.5,
    "https://alvapersonalcare.com.br/cdn/shop/files/64.png?v=1700700825&width=600",
    "oral-care"
  ),
  new Product(
    "Desodorante em Barra Infantil Camomila Vegano 33g ",
    45.0,
    40.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/14_f8801b7a-a7d4-4dc2-ada8-8e620048f593.png?v=1739319505&width=600",
    "kids"
  ),
  new Product(
    "Creme de Pentear Infantil Laranja Doce e Baunilha 160ml ",
    49.0,
    44.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/373.png?v=1717696535&width=600",
    "kids"
  ),
  new Product(
    "Hidratante Labial Orgânico Hortelã 4,25g ",
    49.9,
    44.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Foto_Balm_Hortel_C3_A3_01.png?v=1739905849&width=600",
    "personal-care"
  ),
  new Product(
    "Hidratante Labial Orgânico Citrus 4,25g ",
    49.9,
    44.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Foto_Balm_Citrus_01.png?v=1739905865&width=600",
    "personal-care"
  ),
  new Product(
    "Balm Natural FPS 45  Personal Care",
    159.0,
    143.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/2_10.png?v=1717678778&width=600",
    "sun"
  ),
  new Product(
    "Balm Natural FPS 55 Efeito Matte  Personal Care",
    159.0,
    143.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Balm_Matte_Cor_40_1.png?v=1751488288&width=600",
    "sun"
  ),
  new Product(
    "Necessaire + Scrunchie ",
    44.9,
    39.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/16_1.png?v=1715635844&width=600",
    "accessorio"
  ),
  new Product(
    "Necessaire Puffer ",
    54.9,
    49.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/fotosstill_41.png?v=1741978702&width=600",
    "accessorio"
  ),
];

const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".item-slider");

let total = 0;

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function updateTotalDisplay() {
  document.getElementById("total-value").textContent = formatPrice(total);
}

function renderProducts(filter = "all") {
  productList.innerHTML = "";

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.collection === filter);

  if (filtered.length === 0) {
    productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  filtered.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" class="product-image" />
    <div class="product-info">
        <h3>${product.title}</h3>
        <p class="old-price">${formatPrice(product.oldPrice)}</p>
        <p class="price">${formatPrice(product.price)}</p>
    </div>
    <div class="add-section">
      <button class="btn-want">Quero</button>
      <div class="add-controls hidden">
        <input type="number" class="qty-input" min="1" value="100">
        <button class="btn-add">ADD</button>
      </div>
    </div>
    `;

    const btnWant = productCard.querySelector(".btn-want");
    const controls = productCard.querySelector(".add-controls");
    const input = productCard.querySelector(".qty-input");
    const btnAdd = productCard.querySelector(".btn-add");

    btnWant.addEventListener("click", () => {
      btnWant.style.display = "none";
      controls.classList.remove("hidden");
    });

    btnAdd.addEventListener("click", () => {
      const quantity = parseInt(input.value);
      if (!isNaN(quantity) && quantity > 0) {
        const subtotal = quantity * product.price;
        total += subtotal;
        updateTotalDisplay();
        btnAdd.textContent = "Adicionado!";
        btnAdd.disabled = true;
      }
    });

    productList.appendChild(productCard);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    renderProducts(filter);
  });
});

renderProducts();

