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
