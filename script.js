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

  //Load all posts
  for (const post of posts) {
    const createdAtDate = new Date(post.createdAt);
    const now = new Date();

    const diffTime = now - createdAtDate; // milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    post.created = diffDays;
    const card = createCard(post);
    container.appendChild(card);
  }
  document.querySelector("h2.heading").innerText = `Thuê trọ`;
  document.querySelector(
    "div.result"
  ).innerText = `Hiện có ${posts.length} chỗ thuê trọ`;

  //Add event to filter button
  document
    .querySelector("div.p")
    .addEventListener("click", () => filterPrice(posts, "neg", 0));
  document
    .querySelector("div.p1")
    .addEventListener("click", () => filterPrice(posts, 0, 1));
  document
    .querySelector("div.p1-3")
    .addEventListener("click", () => filterPrice(posts, 1, 3));
  document
    .querySelector("div.p3-5")
    .addEventListener("click", () => filterPrice(posts, 3, 5));
  document
    .querySelector("div.p5-10")
    .addEventListener("click", () => filterPrice(posts, 5, 10));
  document
    .querySelector("div.p10-40")
    .addEventListener("click", () => filterPrice(posts, 10, 40));
  document
    .querySelector("div.p40-70")
    .addEventListener("click", () => filterPrice(posts, 40, 70));
  document
    .querySelector("div.p70-100")
    .addEventListener("click", () => filterPrice(posts, 70, 100));
  document
    .querySelector("div.p100")
    .addEventListener("click", () => filterPrice(posts, 100, 1000));

  document
    .querySelector("div.a30")
    .addEventListener("click", () => filterArea(posts, 0, 30));
  document
    .querySelector("div.a30-50")
    .addEventListener("click", () => filterArea(posts, 30, 50));
  document
    .querySelector("div.a50-80")
    .addEventListener("click", () => filterArea(posts, 50, 80));
  document
    .querySelector("div.a80-100")
    .addEventListener("click", () => filterArea(posts, 80, 100));
  document
    .querySelector("div.a100-150")
    .addEventListener("click", () => filterArea(posts, 100, 150));
  document
    .querySelector("div.a150-200")
    .addEventListener("click", () => filterArea(posts, 150, 200));
  document
    .querySelector("div.a200-300")
    .addEventListener("click", () => filterArea(posts, 200, 300));
  document
    .querySelector("div.a300-500")
    .addEventListener("click", () => filterArea(posts, 300, 500));
  document
    .querySelector("div.a500")
    .addEventListener("click", () => filterArea(posts, 500, 500000));
};
async function getPosts() {
  try {
    const response = await fetch(
      "https://timtro-backend.onrender.com/api/posts"
    );
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

  if (!info.isNegotiable) {
    card.innerHTML = `<div class="pic">
              <img
                src="${info.images[0]}"
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
                src="${info.images[0]}"
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

//Filter Price
function filterPrice(posts, from, to) {
  let satisfied;
  if (from == "neg") {
    satisfied = posts.filter((item) => item.isNegotiable == "True");
  } else {
    satisfied = posts.filter(
      (item) => parseFloat(item.price) >= from && parseFloat(item.price) <= to
    );
  }
  const container = document.querySelector(".list");
  container.innerHTML = "";
  for (const post of satisfied) {
    const createdAtDate = new Date(post.createdAt);
    const now = new Date();

    const diffTime = now - createdAtDate; // milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    post.created = diffDays;
    const card = createCard(post);
    container.appendChild(card);
  }
  if (from == "neg") {
    document.querySelector("h2.heading").innerText = `Thuê trọ giá thỏa thuận`;
  } else {
    document.querySelector("h2.heading").innerText =
      from < 100
        ? `Thuê trọ từ ${from} đến ${to} triệu đồng`
        : `Thuê trọ trên 100 triệu đồng`;
  }
  document.querySelector(
    "div.result"
  ).innerText = `Hiện có ${satisfied.length} chỗ thuê trọ`;
}

//Filter Area
function filterArea(posts, from, to) {
  const satisfied = posts.filter(
    (item) => parseFloat(item.area) >= from && parseFloat(item.area) <= to
  );

  const container = document.querySelector(".list");
  container.innerHTML = "";
  for (const post of satisfied) {
    const createdAtDate = new Date(post.createdAt);
    const now = new Date();

    const diffTime = now - createdAtDate; // milliseconds
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    post.created = diffDays;
    const card = createCard(post);
    container.appendChild(card);
  }
  document.querySelector("h2.heading").innerText =
    from < 500 ? `Thuê trọ từ ${from} đến ${to} m²` : `Thuê trọ trên 500 m²`;
  document.querySelector(
    "div.result"
  ).innerText = `Hiện có ${satisfied.length} chỗ thuê trọ`;
}
