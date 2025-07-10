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
    "desodorantes"
  ),
  new Product(
    "Desodorante Cristal Stick Vegano 60g ",
    75.0,
    67.5,
    "https://alvapersonalcare.com.br/cdn/shop/files/5_1_f6c48bf5-803c-46ac-aac6-d7dcb1733cd8.png?v=1748520280&width=600",
    "desodorantes"
  ),
  new Product(
    "Desodorante Roll on Cristal Natural Lavanda Vegano 70ml ",
    52.0,
    46.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/fotosstill_26.png?v=1741876797&width=600",
    "desodorantes"
  ),
  new Product(
    "Shampoo Cabelos Normais e Secos - Lavanda e Baunilha Vegano 250ml ",
    64.0,
    57.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Leve_Mais_Pague_Menos_26.png?format=webp&v=1749999601&width=800",
    "body & hair"
  ),
  new Product(
    "Shampoo Cabelos Mistos e Oleosos - Alecrim e Menta Vegano 250ml ",
    64.0,
    57.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/Leve_Mais_Pague_Menos_22.png?v=1749999638&width=600",
    "body & hair"
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
    "acessórios"
  ),
  new Product(
    "Necessaire Puffer ",
    54.9,
    49.9,
    "https://alvapersonalcare.com.br/cdn/shop/files/fotosstill_41.png?v=1741978702&width=600",
    "acessórios"
  ),
];

const productList = document.getElementById("product-list");
const filterButtons = document.querySelectorAll(".item-slider");

let cart = [];
let total = 0;
let currentFilter = "all";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function updateTotalDisplay() {
  document.getElementById("total-value").textContent = formatPrice(total);
}

function openModal(product, isEdit = false) {
  const modal = document.getElementById("modal");
  const qtyInput = document.getElementById("modal-qty");
  const modalTitle = document.getElementById("modal-title");
  const modalAdd = document.getElementById("modal-add");
  const modalRemove = document.getElementById("modal-remove");
  const modalCancel = document.getElementById("modal-cancel");

  modalTitle.textContent = isEdit ? "Editar produto" : "Adicionar produto";
  qtyInput.value = product.quantity || 100;
  modal.style.display = "flex";

  modalAdd.onclick = () => {
    const quantity = parseInt(qtyInput.value);
    if (!isNaN(quantity) && quantity > 0) {
      product.quantity = quantity;
      product.subtotal = quantity * product.price;

      const existing = cart.find(p => p.title === product.title);
      if (existing) {
        total -= existing.subtotal;
        Object.assign(existing, product);
      } else {
        cart.push(product);
      }

      total += product.subtotal;
      updateTotalDisplay();
      renderProducts(currentFilter);
      closeModal();
    }
  };

  modalRemove.style.display = isEdit ? "inline-block" : "none";
  modalRemove.onclick = () => {
    cart = cart.filter(p => p.title !== product.title);
    total = cart.reduce((acc, p) => acc + p.subtotal, 0);
    updateTotalDisplay();
    renderProducts(currentFilter);
    closeModal();
  };

  // 🔁 Adiciona novamente o evento de fechar
  modalCancel.onclick = closeModal;
}


function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function renderProducts(filter = "all") {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  const filtered = filter === "all" ? products : products.filter(p => p.collection === filter);

  if (filter === "all") {
    const grouped = {};

    filtered.forEach(p => {
      if (!grouped[p.collection]) grouped[p.collection] = [];
      grouped[p.collection].push(p);
    });

    Object.entries(grouped).forEach(([collection, items]) => {
      const title = document.createElement("h2");
      title.textContent = collection.replace("-", " ").toUpperCase();
      title.className = "collection-title";
      productList.appendChild(title);

      items.forEach(product => {
        const inCart = cart.find(p => p.title === product.title);
        const card = document.createElement("div");
        card.className = "product-card";

        const controls = inCart ? `
          <div class="qty-controls">
            <button class="btn-minus">-</button>
            <span class="qty-display">${inCart.quantity}</span>
            <button class="btn-plus">+</button>
          </div>
        ` : `<button class="btn-want">Quero</button>`;

        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}" class="product-image" />
          <div class="product-info">
            <h3>${product.title}</h3>
            <p class="old-price">${formatPrice(product.oldPrice)}</p>
            <p class="price">${formatPrice(product.price)}</p>
          </div>
          <div class="add-section">
            ${controls}
          </div>
        `;

        const section = card.querySelector(".add-section");

        if (!inCart) {
          section.querySelector(".btn-want").onclick = () => {
            openModal({ ...product }, false);
          };
        } else {
          section.querySelector(".qty-display").onclick = () => {
            openModal({ ...product, ...inCart }, true);
          };

          section.querySelector(".btn-minus").onclick = () => {
            if (inCart.quantity > 2) {
              inCart.quantity -= 2;
              inCart.subtotal = inCart.quantity * inCart.price;
              total = cart.reduce((acc, p) => acc + p.subtotal, 0);
              updateTotalDisplay();
              renderProducts(filter);
            }
          };

          section.querySelector(".btn-plus").onclick = () => {
            inCart.quantity += 2;
            inCart.subtotal = inCart.quantity * inCart.price;
            total = cart.reduce((acc, p) => acc + p.subtotal, 0);
            updateTotalDisplay();
            renderProducts(filter);
          };
        }

        productList.appendChild(card);
      });
    });
  } else {
    filtered.forEach(product => {
      const inCart = cart.find(p => p.title === product.title);
      const card = document.createElement("div");
      card.className = "product-card";

      const controls = inCart ? `
        <div class="qty-controls">
          <button class="btn-minus">-</button>
          <span class="qty-display">${inCart.quantity}</span>
          <button class="btn-plus">+</button>
        </div>
      ` : `<button class="btn-want">Quero</button>`;

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image" />
        <div class="product-info">
          <h3>${product.title}</h3>
          <p class="old-price">${formatPrice(product.oldPrice)}</p>
          <p class="price">${formatPrice(product.price)}</p>
        </div>
        <div class="add-section">
          ${controls}
        </div>
      `;

      const section = card.querySelector(".add-section");

      if (!inCart) {
        section.querySelector(".btn-want").onclick = () => {
          openModal({ ...product }, false);
        };
      } else {
        section.querySelector(".qty-display").onclick = () => {
          openModal({ ...product, ...inCart }, true);
        };

        section.querySelector(".btn-minus").onclick = () => {
          if (inCart.quantity > 2) {
            inCart.quantity -= 2;
            inCart.subtotal = inCart.quantity * inCart.price;
            total = cart.reduce((acc, p) => acc + p.subtotal, 0);
            updateTotalDisplay();
            renderProducts(filter);
          }
        };

        section.querySelector(".btn-plus").onclick = () => {
          inCart.quantity += 2;
          inCart.subtotal = inCart.quantity * inCart.price;
          total = cart.reduce((acc, p) => acc + p.subtotal, 0);
          updateTotalDisplay();
          renderProducts(filter);
        };
      }

      productList.appendChild(card);
    });
  }
  // Atualiza visualmente o botão ativo
document.querySelectorAll(".item-slider").forEach(btn => {
  btn.classList.remove("active");
  if (btn.dataset.filter === filter) {
    btn.classList.add("active");
  }
});

}




renderProducts(currentFilter);
updateTotalDisplay();

IMask(document.getElementById("documento"), {
  mask: [
    { mask: '000.000.000-00' },
    { mask: '00.000.000/0000-00' }
  ]
});

IMask(document.getElementById("telefone"), {
  mask: [
    { mask: '(00) 0000-0000' },
    { mask: '(00) 00000-0000' }
  ]
});

// Botão para abrir o modal com resumo
document.getElementById("btn-add").onclick = () => {
  if (cart.length === 0) {
    alert("Você ainda não adicionou nenhum produto!");
    return;
  }

  const pedido = {
    total: total.toFixed(2),
    produtos: cart.map(item => ({
      nome: item.title,
      quantidade: item.quantity,
      preco_unitario: item.price.toFixed(2),
      subtotal: item.subtotal.toFixed(2)
    }))
  };

  console.log("🧾 Pedido gerado:");
  console.log(JSON.stringify(pedido, null, 2));

  // Preenche resumo
  const container = document.getElementById("resumo-conteudo");
  container.innerHTML = "";
  pedido.produtos.forEach(p => {
    container.innerHTML += `
      <p><strong>${p.nome}</strong><br>
      Quantidade: ${p.quantidade}<br>
      Unitário: R$ ${p.preco_unitario}<br>
      Subtotal: R$ ${p.subtotal}</p><hr>`;
  });
  container.innerHTML += `<p><strong>Total: R$ ${pedido.total}</strong></p>`;

  document.getElementById("modal-resumo").style.display = "flex";

  // Cancelar
  document.getElementById("resumo-cancelar").onclick = () => {
    document.getElementById("modal-resumo").style.display = "none";
  };

  // Enviar
  document.getElementById("resumo-enviar").onclick = () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const documento = document.getElementById("documento").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (!nome || !email || !documento || !telefone) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const pedidoFinal = {
      cliente: { nome, email, documento, telefone },
      pedido
    };

    console.log("📦 Pedido enviado com dados:");
    console.log(JSON.stringify(pedidoFinal, null, 2));

    alert("Pedido enviado com sucesso!");
    document.getElementById("modal-resumo").style.display = "none";
  };
};

document.querySelectorAll(".item-slider").forEach(button => {
  button.addEventListener("click", () => {
    button.classList.add("jump");
    setTimeout(() => button.classList.remove("jump"), 400);

    currentFilter = button.dataset.filter;
    renderProducts(currentFilter); // <-- já cuida da .active
  });
});