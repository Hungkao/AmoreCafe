// Lấy các phần tử DOM cần thiết
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const productList = document.querySelector(".product-list");

// Xử lý sự kiện tìm kiếm sản phẩm
searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase().trim(); // Lấy từ khóa tìm kiếm và chuẩn hóa
  const products = document.querySelectorAll(".product"); // Lấy tất cả các sản phẩm

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase(); // Lấy tên sản phẩm
    // Kiểm tra nếu tên sản phẩm chứa từ khóa
    if (productName.includes(keyword)) {
      product.style.display = ""; // Hiển thị sản phẩm
    } else {
      product.style.display = "none"; // Ẩn sản phẩm
    }
  });
});

// Xử lý sự kiện nhập liệu thời gian thực (keyup) cho ô tìm kiếm
searchInput.addEventListener("keyup", () => {
  const keyword = searchInput.value.toLowerCase().trim();
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(keyword)) {
      product.style.display = "";
    } else {
      product.style.display = "none";
    }
  });
});

// Xử lý sự kiện nút "Thêm sản phẩm" để toggle form
addProductBtn.addEventListener("click", () => {
  addProductForm.classList.toggle("hidden"); // Toggle class hidden để ẩn/hiện form
});

// Xử lý sự kiện submit form thêm sản phẩm
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn chặn hành vi mặc định của form

  // Lấy giá trị từ các input trong form
  const productName = document.getElementById("productName").value;
  const productDesc = document.getElementById("productDesc").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage = document.getElementById("productImage").value;

  // Tạo một phần tử sản phẩm mới
  const newProduct = document.createElement("article");
  newProduct.classList.add("product");
  newProduct.innerHTML = `
        <img src="${productImage}" alt="${productName}">
        <h3>${productName}</h3>
        <p>${productDesc}</p>
        <p class="price">Giá: ${Number(productPrice).toLocaleString(
          "vi-VN"
        )}₫</p>
    `;

  // Thêm sản phẩm mới vào danh sách
  productList.appendChild(newProduct);

  // Reset form và ẩn đi sau khi thêm
  addProductForm.reset();
  addProductForm.classList.add("hidden");
});
