document.addEventListener("DOMContentLoaded", function () {
  const openFolderBtn = document.getElementById("openFolderBtn");
  const folderModal = document.getElementById("folderModal");
  const form = document.getElementById("folder-form");
  const closeFolderBtn = document.getElementById("closeModal2");

  // Open/close note modal
  openFolderBtn.addEventListener("click", () => {
    folderModal.style.display = "block";
    console.log('Hello')
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
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const categoryData = {
      category: formData.get('category'),
    };
    try {
      const response = await fetch('/category/create',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(categoryData)
        })
      let res = await response.json()
      alert(res.message)
      if (res.status = 200) {
        let now = Date.now()
        const expiration = now + (1000 * 60 * 60)
        const response = await fetch('/category')
        let finalData = await response.json()
        data = finalData.data
        let cacheData = { data: data, ...{ expiration: expiration } }
        localStorage.setItem("category", JSON.stringify(cacheData))

      }
    }
    catch(err) {
      console.log('Can not be added to category!', err)
    }
  });
});
