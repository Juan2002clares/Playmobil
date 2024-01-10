import AuthenticationService from '../services/AuthenticationService.js';

document.addEventListener("DOMContentLoaded", _ => {
    const service = new AuthenticationService;
    showInformationUser(service);
});

function showInformationUser(service) {
    document.querySelector("#tSubmitBtn").addEventListener('click', retrieveUser(service));
}

async function retrieveUser(service) {
    const username = document.querySelector("#tTxtUsuario").value;
    const password = document.querySelector("#tPasPassword").value;

    if (!username && password) {
        alert("Campos vacios");
        return;
    } else {
        const token = await service.getToken(username, password);
        window.localStorage.setItem('token', token);
        const tokenDecodificado = service.decodeToken(token);
        alert(`Bienvenido ${tokenDecodificado.firstname}${tokenDecodificado.lastname}`);
    }
}

