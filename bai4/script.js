const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");
const productList = document.querySelector(".product-list");
const errorMsg = document.getElementById("errorMsg");

// Xử lý sự kiện tìm kiếm sản phẩm
searchBtn.addEventListener("click", () => {
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
  addProductForm.classList.toggle("hidden");
  errorMsg.style.display = "none"; // Ẩn thông báo lỗi khi mở form
});

// Xử lý sự kiện nút "Hủy"
cancelBtn.addEventListener("click", () => {
  addProductForm.reset(); // Reset form
  addProductForm.classList.add("hidden"); // Ẩn form
  errorMsg.style.display = "none"; // Ẩn thông báo lỗi
});

// Xử lý sự kiện submit form thêm sản phẩm
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Lấy giá trị từ các input
  const name = document.getElementById("newName").value.trim();
  const desc = document.getElementById("newDesc").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const image = document.getElementById("newImage").value.trim();

  // Validation
  let error = "";
  if (!name) {
    error = "Vui lòng nhập tên sản phẩm!";
  } else if (!desc || desc.length < 10) {
    error = "Mô tả phải có ít nhất 10 ký tự!";
  } else if (!price || isNaN(price) || Number(price) <= 0) {
    error = "Giá phải là số dương!";
  } else if (!image) {
    error = "Vui lòng nhập URL ảnh!";
  }

  if (error) {
    errorMsg.textContent = error;
    errorMsg.style.display = "block";
    return;
  }

  // Tạo sản phẩm mới
  const newProduct = document.createElement("article");
  newProduct.classList.add("product");
  newProduct.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>${desc}</p>
        <p class="price">Giá: ${Number(price).toLocaleString("vi-VN")}₫</p>
    `;

  // Thêm sản phẩm vào đầu danh sách
  productList.prepend(newProduct);

  // Reset form và ẩn đi
  addProductForm.reset();
  addProductForm.classList.add("hidden");
  errorMsg.style.display = "none";
});
