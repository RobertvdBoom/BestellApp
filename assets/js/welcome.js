// insert info dialog with option to not show again on reload. Base this on bool -> add button to not show again on reload (saved to local storage  )

let introDialog = true;

function toggleSRBox() {
  document.getElementById('basket-status').classList.toggle('sr-announcement');
}

function openIntroDialog() {
  if (introDialog === true) {
    document.getElementById('intro-dialog').showModal();
  }
}

function closeIntroDialog() {
  document.getElementById('intro-dialog').close();
}

function dontShowIntroAgain() {
  introDialog = false;
  saveIntroInfoInLS();
  closeIntroDialog();
}

function showIntroAgain() {
  introDialog = true;
  saveIntroInfoInLS();
  openIntroDialog();
}

function saveIntroInfoInLS() {
    localStorage.setItem('introDialogOption', JSON.stringify(introDialog));
}

function fetchIntroInfoFromLS() {
    introDialog = JSON.parse(localStorage.getItem("introDialogOption"));
}