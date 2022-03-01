var modalForm = document.getElementById('modal-form');
const close1 = document.getElementById('close-modal1');
const close2 = document.getElementById('close-modal2');

const formLink = document.getElementById('form-link');

formLink.onclick = function () {
    modalForm.style.display = 'block';
}

close1.onclick = function () {
    modalForm.style.display = 'none';
    document.getElementById('contact-form').reset();
}
/*close2.onclick = function () {
    modalForm.style.display = 'none';
    document.getElementById('contact-form').reset();
}*/

window.onclick = function(e) {
    if (e.target == modalForm) {
        modalForm.style.display = 'none';
        document.getElementById('contact-form').reset();
    }
}
