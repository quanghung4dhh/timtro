//Change menu if login successfull and restore if logout
const username = localStorage.getItem("username");
const user = document.querySelector(".right .login");
const logOut = document.querySelector(".right .signup");
if (username) {
  user.innerHTML = `<a href="#">${username}</a>`;
  logOut.innerHTML = `<a href="#">Đăng xuất</a>`;
  logOut.addEventListener("click", () => {
    localStorage.removeItem("username");
    window.location.reload();
  });
} else {
  user.innerHTML = `<a href="Login.html">Đăng nhập</a>`;
  logOut.innerHTML = `<a href="SignUp.html">Đăng ký</a>`;
}

//Change sort option when clicking
const chosen = document.querySelector(".dropdown .sort-opt");
const options = document.querySelectorAll(".dropdown-sort .dropdown-items");
for (const item of options) {
  item.addEventListener("click", () => {
    chosen.innerText = item.innerText;
  });
}

//Get all posts
window.onload = async () => {
  const posts = await getPosts();
  const container = document.querySelector(".list");
  for (const post of posts) {
    const createdAtDate = new Date(post.createdAt);
    const now = new Date();

    const diffTime = now - createdAtDate; // milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    post.created = diffDays;
    const card = createCard(post);
    container.appendChild(card);
  }
};
async function getPosts() {
  try {
    const response = await fetch("http://localhost:3000/api/posts");
    const data = await response.json();

    if (!response.ok) {
      return { error: data.message };
    }

    return data;
  } catch (err) {
    return err;
  }
}

//Create Node
function createCard(info) {
  const card = document.createElement("div");
  card.className = "card";

  if (info.isNegotiable == "false") {
    card.innerHTML = `<div class="pic">
              <img
                src="http://localhost:3000/uploads/${info.images[0]}"
                alt="Ảnh phòng"
              />
            </div>
            <div class="context">
              <div class="intro">
                ${info.title}
              </div>
              <div class="price-area">
                <span class="price">${info.price} triệu/tháng</span>·
                <span class="area">${info.area} m²</span>·
                <span class="bathroom"
                  >${info.bathrooms}
                  <img
                    src="./assets/bath.png"
                    alt="bathroom"
                    width="18"
                    height="18" /></span
                >·
                <span class="bedroom"
                  >${info.bedrooms}
                  <img
                    src="./assets/bed.png"
                    alt="bedroom"
                    width="24"
                    height="24"
                /></span>
              </div>
              <div class="location">
                <img
                  src="./assets/location.png"
                  alt="location"
                  width="17"
                  height="17"
                />${info.location}
              </div>
              <div class="description">
                ${info.description}
              </div>
              <div class="time">${info.created} ngày trước</div>
              <div class="like"></div>
            </div>`;
  } else {
    card.innerHTML = `<div class="pic">
              <img
                src="http://localhost:3000/uploads/${info.images[0]}"
                alt="Ảnh phòng"
              />
            </div>
            <div class="context">
              <div class="intro">
                ${info.title}
              </div>
              <div class="price-area">
                <span class="price">Giá cả thương lượng</span>·
                <span class="area">${info.area} m²</span>·
                <span class="bathroom"
                  >${info.bathrooms}
                  <img
                    src="./assets/bath.png"
                    alt="bathroom"
                    width="18"
                    height="18" /></span
                >·
                <span class="bedroom"
                  >${info.bedrooms}
                  <img
                    src="./assets/bed.png"
                    alt="bedroom"
                    width="24"
                    height="24"
                /></span>
              </div>
              <div class="location">
                <img
                  src="./assets/location.png"
                  alt="location"
                  width="17"
                  height="17"
                />${info.location}
              </div>
              <div class="description">
                ${info.description}
              </div>
              <div class="time">${info.created} ngày trước</div>
              <div class="like"></div>
            </div>`;
  }
  return card;
}
