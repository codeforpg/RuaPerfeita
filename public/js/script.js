$(document).ready(function () {
    var dialog = document.querySelector('#como-usar');
    var showDialogButton = document.querySelector('#show-como-usar');
    var dialogTente = document.querySelector('#tente-tambem');
    var showDialogButtonTente = document.querySelector('#show-tente-tambem');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });

    if (! dialogTente.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    showDialogButtonTente.addEventListener('click', function() {
        dialogTente.showModal();
    });
    dialogTente.querySelector('.close').addEventListener('click', function() {
        dialogTente.close();
    });
})