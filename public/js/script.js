// tour-images
const tourImages = document.querySelector(".tour-images");
if(tourImages) {
  const swiper = new Swiper(".tour-images", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
// End tour-images

// alert-add-cart-susscess
const alertAddCartSusscess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-susscess]");
  if(elementAlert) {
    elementAlert.classList.remove("alert-hidden");
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
  }
}
// End alert-add-cart-susscess

// Hiển thị số lượng sản phẩm vào mini cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
}
showMiniCart();
// Hết Hiển thị số lượng sản phẩm vào mini cart

// Giỏ hàng
const cart = localStorage.getItem("cart");
if(!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}
const formAddToCart = document.querySelector("[form-add-to-cart]");
if(formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    const quantity = parseInt(formAddToCart.quantity.value);
    if(tourId && quantity > 0) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const existTour = cart.find(item => item.tourId == tourId);
      if(existTour) {
        existTour.quantity = existTour.quantity + quantity;
      } else {
        cart.push({
          tourId: tourId,
          quantity: quantity
        });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddCartSusscess();
      showMiniCart();
    }
  })
}
// Hết Giỏ hàng

// Xóa sản phẩm trong giỏ hàng
const deleteItemInCart = () => {
  const listButtonDelete = document.querySelectorAll("[btn-delete]");
  if(listButtonDelete.length > 0) {
    listButtonDelete.forEach(button => {
      button.addEventListener("click", () => {
        const tourId = button.getAttribute("btn-delete");
        const cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = cart.filter(item => item.tourId != tourId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload();
      })
    })
  }
}
// Hết Xóa sản phẩm trong giỏ hàng

// Cập nhật số lượng sản phẩm trong giỏ hàng
const updateQuantityItemInCart = () => {
  const listInputQuantity = document.querySelectorAll("input[name='quantity']");
  if(listInputQuantity.length > 0) {
    listInputQuantity.forEach(input => {
      input.addEventListener("change", () => {
        const tourId = parseInt(input.getAttribute("item-id"));
        const quantity = parseInt(input.value);
        if(tourId && quantity > 0) {
          const cart = JSON.parse(localStorage.getItem("cart"));
          const itemUpdate = cart.find(item => item.tourId == tourId);
          if(itemUpdate) {
            itemUpdate.quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.reload();
          }
        }
      })
    })
  }
}
// Hết Cập nhật số lượng sản phẩm trong giỏ hàng

// Vẽ tour vào giỏ hàng
const tableCart = document.querySelector("[table-cart]");
if(tableCart) {
  fetch("/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart")
  })
    .then(res => res.json())
    .then(data => {
      const htmlArray = data.tours.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>
            <img src="${item.image}" alt="${item.title}" width="80px" />
          </td>
          <td>
            <a href="/tours/detail/${item.slug}">${item.title}</a>
          </td>
          <td>
            ${item.price.toLocaleString()}đ
          </td>
          <td>
            <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px;" />
          </td>
          <td>
            ${item.total.toLocaleString()}đ
          </td>
          <td>
            <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
          </td>
        </tr>
      `);
      const tbody = tableCart.querySelector("tbody");
      tbody.innerHTML = htmlArray.join("");
      const totalPrice = document.querySelector("[total-price]");
      totalPrice.innerHTML = data.total.toLocaleString();
      deleteItemInCart();
      updateQuantityItemInCart();
    })
}
// Hết Vẽ tour vào giỏ hàng

// Đặt tour
const formOrder = document.querySelector("[form-order]");
if(formOrder) {
  formOrder.addEventListener("submit", (event) => {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart"));
    const dataFinal = {
      info: {
        fullName: formOrder.fullName.value,
        phone: formOrder.phone.value,
        note: formOrder.note.value,
      },
      cart: cart
    };
    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataFinal)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          localStorage.setItem("cart", JSON.stringify([]));
          window.location.href = `/order/success/${data.orderCode}`;
        }
      })
  })
}
// Hết Đặt tour

// show-alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = showAlert.getAttribute("show-alert") || 3000;
  time = parseInt(time);

  setTimeout(() => {
    showAlert.classList.add("hidden");
  }, time);
}
// end show-alert

// Đăng ký người dùng
const formRegister = document.querySelector("[form-register]") ;
if(formRegister) {
  formRegister.addEventListener("submit" , (event) => {
    event.preventDefault();

    const dataUser = {
      username: formRegister.username.value,
      email : formRegister.email.value ,
      passwordHash : formRegister.passwordHash.value 
    } 
    try {
      fetch("/users/register" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:"include",
        body: JSON.stringify(dataUser)},
        
      )
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          window.location.href = `/tours/tour`;
        }
        console.log(data.newUser) ;
      })
    } catch (error) {
      console.log(error);
    }
    
  })
}

// đăng nhập 
const formLogin = document.querySelector("[form-login]");
if (formLogin) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const dataUser = {
      email: formLogin.email.value,
      passwordHash: formLogin.passwordHash.value,
    };

    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUser),
      });

      const data = await response.json();

      if (data.code === 200) {
        window.location.href = `/tours/tour`;
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
    }
  });
}
