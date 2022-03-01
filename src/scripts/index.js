import { Persona } from './persona.js';
import service from './service.js';

window.editUser = async function () {
    const name = document.getElementById('name').value;
    const lname = document.getElementById('lname').value;
    const cellphone = document.getElementById('cellphone').value;
    const email = document.getElementById('email').value;

    const user = new Persona(name, lname, cellphone, email, null);

    await service.updateContact(1, user);
    displayUserData()
    document.getElementById('modal-form').style.display = 'none';
    emergentMessage('Se han actualizado tus datos');
}

window.addContact = async function () {
    const name = document.getElementById('name').value;
    const lname = document.getElementById('lname').value;
    const cellphone = document.getElementById('cellphone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const persona = new Persona(name, lname, cellphone, email, address);
    await service.addContact(persona);
    displayContacts(await service.getContacts());
    document.getElementById('modal-form').style.display = 'none';
    emergentMessage('Contacto guardado con éxito');
}

window.editContact = async function (id) {
    const name = document.getElementById('name').value;
    const lname = document.getElementById('lname').value;
    const cellphone = document.getElementById('cellphone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    const persona = new Persona(name, lname, cellphone, email, address);
    await service.updateContact(id, persona);

    displayContacts(await service.getContacts());
    document.getElementById('modal-form').style.display = 'none';
    emergentMessage('Contacto modificado');
}

window.removeContact = async function (id) {
    await service.deleteContact(id);
    displayContacts(await service.getContacts());
    emergentMessage('Contacto eliminado');
}

async function searchContacts() {
    const search = document.getElementById('search-input').value;
    const contacts = await service.searchContacts(search);
    displayContacts(contacts);
}

window.displayModal = async function (action = null, id = null) {
    var modalForm = document.getElementById('modal-form');
    var modalTitle = document.getElementById('modal-title');
    var contact;
    var saveBtn = document.getElementById('save');

    if (action != null) {
        if (action == 1) { // editar info del usuario
            contact = await service.getContact(1);
            document.getElementById('address').setAttribute('disabled', 'true');
            modalTitle.innerText = 'Edite su información';
            saveBtn.setAttribute('onclick', "editUser()");
        }
        else if (action == 2) { // editar info del contacto
            contact = await service.getContact(id);
            modalTitle.innerText = 'Edite su contacto';
            document.getElementById('address').removeAttribute('disabled');
            document.getElementById('address').value = contact.direccion;
            saveBtn.setAttribute('onclick', "editContact(" + id + ")");
        }
        document.getElementById('name').value = contact.nombres;
        document.getElementById('lname').value = contact.apellidos;
        document.getElementById('cellphone').value = contact.telefono;
        document.getElementById('email').value = contact.correo;
        saveBtn.innerText = 'Guardar cambios';
        modalForm.style.display = 'block';
    }
    else { // añadir contacto
        document.getElementById('address').removeAttribute('disabled');
        document.getElementById('contact-form').reset();
        modalTitle.innerText = 'Nuevo contacto';
        saveBtn.innerText = 'Guardar';
        saveBtn.setAttribute('onclick', "addContact()");
        modalForm.style.display = 'block';
    }
}

async function displayUserData() {
    const user = await service.getContact(1);
    document.getElementById('user-name').innerText = user.nombres + ' ' + user.apellidos;
    document.getElementById('user-cp').innerText = user.telefono;
    document.getElementById('user-mail').innerText = user.correo;
}

async function displayContacts(contacts) {
    //const contacts = await service.getContacts();
    var contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    contacts.forEach(contact => {
        var row = document.createElement('tr');
        row.setAttribute('id', "contact-" + contact.id);
        row.innerHTML = `
                <td><input type='checkbox' id='select-contact-${contact.id}' name='select-contact'/></td>
                <td>${contact.nombres + ' ' + contact.apellidos}</td>
                <td>${contact.telefono}</td>
                <td>${contact.correo}</td>
                <td>${contact.direccion}</td>
                <td>
                    <button type="button" id="edit-user" class="btn btn-light" onclick="displayModal(2, ${contact.id})"><img id="edit-image" src="../images/edit.png" alt="edit image"></button>
                </td>
                <td>
                    <button type="button" id="remove-user" class="btn btn-light" onclick="removeContact(${contact.id})"><img id="remove-image" src="../images/remove.png" alt="remove image"></button>
                </td>
            `;
        contactsList.appendChild(row);
    });
}

async function displayAll() {
    displayUserData();
    displayContacts(await service.getContacts());
}

function selectAllToggle(source) {
    const checkboxes = document.getElementsByName('select-contact');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
    });
}

function emergentMessage(message) {
    const popup = document.getElementById('emergent-message');
    document.getElementById('message').innerText = message;
    popup.style.display = 'flex'
    setTimeout(function () {
        popup.style.display = 'none';
    }, 4000);
}

window.onload = function (e) {
    document.getElementById('edit-user').addEventListener('click', function () {
        displayModal(1);
    })
    document.getElementById('form-link').addEventListener('click', function () {
        displayModal();
    });
    document.getElementById('search').addEventListener('click', function (e) {
        e.preventDefault();
        searchContacts();
    })
    document.getElementById('contacts').addEventListener('click', function () {
        displayAll();
    })
    document.getElementById('select-all').addEventListener('click', function () {
        selectAllToggle(this);
    })
    displayAll();
}