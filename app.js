fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    let menu = document.getElementById("users");
    let opciones = "";
    for (i = 0; i < json.length; i++) {
      opciones += `<option value="${json[i].id}">${json[i].username}</option>`;
    }
    menu.innerHTML = opciones;
  });

const btnMenu = document.getElementById("users");
btnMenu.addEventListener("change", () => {
  //console.log(btnMenu.value);
  let info = document.getElementById("infoUsers");
  fetch("https://jsonplaceholder.typicode.com/users/" + btnMenu.value)
    .then((response) => response.json())
    .then((json) => {
      let divInfo = document.getElementById("info");
      info = `<h2>INFORMACIÓN</h2>`;
      info += `
      <b>Nombre: </b>${json.name}<br>
      <b>Correo: </b>${json.email}<br>
      <b>Nombre de usuario: </b>${json.username} <br>
      <b>Telefono: </b>${json.phone}<br>
      <b>Sitio Web: </b>${json.website}<br>
      `;
      divInfo.innerHTML = info;
      console.log(json);
    });
});

const btnPost = document.getElementById("btnPost");
btnPost.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts?userId=" + btnMenu.value)
    .then((response) => response.json())
    .then((json) => {
      let divPost = document.getElementById("posts");
      info = `<h2>POSTS</h2>`;
      json.forEach((pos) => {
        info += `
        <div id="pos${pos.id}">
        <h3>
        ${pos.title}
        </h3>
        <p>
        ${pos.body}
        </p>
        <button id="btnCom" type='button' onclick="aparCom(${pos.id})">
        Comentarios
        </button>
        <button id="btnCeCom" type='button' onclick="cerrarCom(${pos.id})">
        Cerrar comentarios
        </button>
        <div id="pcom${pos.id}"></div>
        </div>`;
      });
      divPost.innerHTML = info;
    });
});

function aparCom(numero) {
  fetch("https://jsonplaceholder.typicode.com/comments?postId=" + numero)
    .then((response) => response.json())
    .then((json) => {
      let divCom = document.getElementById("pcom" + numero);
      let info = `<h2>COMENTARIOS</h2>`;
      json.forEach((com) => {
        info += `
    <h3>${com.name}</h3>
    <p>${com.email}</p>
    <p>${com.body}</p>
    `;
      });
      divCom.innerHTML = info;
    });
}

function cerrarCom(numero){
let divCom=document.getElementById("pcom" + numero);
divCom.innerHTML="";
}
