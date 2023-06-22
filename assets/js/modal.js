
window.addEventListener('DOMContentLoaded', function () {
  const modals = document.querySelectorAll('.modal');
  const instances = M.Modal.init(modals);

  let currentModal = null;

  function openModal(index) {
    if (currentModal) {
      currentModal.close();
    }

    currentModal = instances[index];
    currentModal.open();
  }

  modals.forEach((modal, index) => {
    const prevButton = modal.querySelector('.prev');
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        openModal(index - 1);
      });
    }

    const nextButton = modal.querySelector('.next');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        openModal(index + 1);
      });
    }
  });

  manualbtn = document.getElementById("manualbtn");
  manualbtn.onclick = function () {
    openModal(0);
  }
});