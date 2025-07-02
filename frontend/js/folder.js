document.addEventListener("DOMContentLoaded", function () {
  const openFolderBtn = document.getElementById("openFolderBtn");
  const folderModal = document.getElementById("folderModal");

  const closeFolderBtn = document.getElementById("closeModal2");

  // Open/close note modal
  openFolderBtn.addEventListener("click", () => {
    folderModal.style.display = "block";
  });

  closeFolderBtn.addEventListener("click", () => {
    folderModal.style.display = "none";
  });

  // Click outside to close modals
  window.addEventListener("click", (e) => {
    if (e.target === folderModal) {
      folderModal.style.display = "none";
    }
  });
});
