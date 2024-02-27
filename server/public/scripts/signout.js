fetch("/api/sessions/", { method: "POST" })
  .then((res) => res.json())
  .then((res) => {
    console.log(res);

    if (res.statusCode === 200) {
      let registerButton = document.querySelector("#registerButton");
      let loginButton = document.querySelector("#loginButton");
      if (registerButton) {
        registerButton.parentElement.removeChild(registerButton);
      }
      if (loginButton) {
        loginButton.parentElement.removeChild(loginButton);
      }

      let signoutButton = document.querySelector("#signout");
      if (signoutButton) {
        signoutButton.addEventListener("click", async () => {
          try {
            const opts = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
            };
            let response = await fetch("/api/sessions/signout", opts);
            response = await response.json();
            if (response.statusCode === 200) {
              alert(response.message);
              location.replace("/");
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
    } else {
      let formButton = document.querySelector("#formButton");
      let ordersButton = document.querySelector("#ordersButton");
      let signoutButton = document.querySelector("#signout");
      if (formButton) {
        formButton.parentElement.removeChild(formButton);
      }
      if (ordersButton) {
        ordersButton.parentElement.removeChild(ordersButton);
      }
      if (signoutButton) {
        signoutButton.parentElement.removeChild(signoutButton);
      }
    }

    if (res.response?.role === 0) {
      let formButton = document.querySelector("#formButton");
      if (formButton) {
        formButton.parentElement.removeChild(formButton);
      }
    } else if (res.response?.role === 1) {
      let ordersButton = document.querySelector("#ordersButton");
      if (ordersButton) {
        ordersButton.parentElement.removeChild(ordersButton);
      }
    }
  });
