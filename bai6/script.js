const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const cancelBtn = document.getElementById("cancelBtn");
const productList = document.querySelector(".product-list");
const errorMsg = document.getElementById("errorMsg");

// Dữ liệu sản phẩm mẫu (dùng khi localStorage rỗng)
const defaultProducts = [
  {
    name: "Cà phê rang xay truyền thống",
    desc: "Hương vị đậm đà, thơm nồng đặc trưng của hạt cà phê Việt Nam.",
    price: 120000,
    image:
      "https://arockacoffee.com/upload/news/mua-ca-phe-rang-xay-o-tphcm-8217.jpg",
  },
  {
    name: "Cà phê sữa đá",
    desc: "Thức uống quen thuộc, vị ngọt dịu và thơm béo hoàn hảo cho mọi ngày.",
    price: 45000,
    image:
      "https://banhmibahuynh.vn/wp-content/uploads/2025/06/unnamed-768x768.jpg",
  },
  {
    name: "Cà phê Cold Brew",
    desc: "Chiết xuất lạnh giúp lưu giữ hương vị nguyên bản, ít đắng và thanh mát.",
    price: 65000,
    image:
      "https://lifesimplified.gorenje.com/wp-content/uploads/2024/06/gorenje-blog-refreshing_cold_brew_coffee.jpg",
  },
];

// Hàm hiển thị danh sách sản phẩm từ mảng
function renderProducts(products) {
  productList.innerHTML = ""; // Xóa danh sách hiện tại
  products.forEach((product) => {
    const newProduct = document.createElement("article");
    newProduct.classList.add("product");
    newProduct.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <p class="price">Giá: ${Number(product.price).toLocaleString(
              "vi-VN"
            )}₫</p>
        `;
    productList.prepend(newProduct); // Thêm vào đầu danh sách
  });
}

// Tải sản phẩm từ localStorage khi trang load
document.addEventListener("DOMContentLoaded", () => {
  let products = JSON.parse(localStorage.getItem("products"));
  if (!products || products.length === 0) {
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
  }
  renderProducts(products);
});

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
  if (addProductForm.classList.contains("hidden")) {
    addProductForm.classList.remove("hidden");
    addProductForm.style.maxHeight = addProductForm.scrollHeight + "px";
    errorMsg.style.display = "none"; // Ẩn thông báo lỗi khi mở form
  } else {
    addProductForm.classList.add("hidden");
    addProductForm.style.maxHeight = "0";
  }
});

// Xử lý sự kiện nút "Hủy"
cancelBtn.addEventListener("click", () => {
  addProductForm.reset(); // Reset form
  addProductForm.classList.add("hidden");
  addProductForm.style.maxHeight = "0";
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
  const newProduct = {
    name,
    desc,
    price: Number(price),
    image,
  };

  // Lấy danh sách sản phẩm từ localStorage
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Thêm sản phẩm mới vào đầu mảng
  products.unshift(newProduct);

  // Lưu lại vào localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Cập nhật giao diện
  renderProducts(products);

  // Reset form và ẩn đi
  addProductForm.reset();
  addProductForm.classList.add("hidden");
  addProductForm.style.maxHeight = "0";
  errorMsg.style.display = "none";
});
