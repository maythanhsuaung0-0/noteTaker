document.addEventListener("DOMContentLoaded", function () {
  const openFolderBtn = document.getElementById("openFolderBtn");
  const folderModal = document.getElementById("folderModal");
  const form = document.getElementById("folder-form");
  const closeFolderBtn = document.getElementById("closeModal2");

  let data = [];
  let now = Date.now();
  const expiration = now + 1000 * 60 * 60;

  
  async function loadCategories() {
    const cache = JSON.parse(localStorage.getItem("category"));

    if (cache?.data?.length > 0 && cache?.expiration > now) {
      console.log("Cache is still valid");
      data = cache.data;
    } else {
      try {
        const response = await fetch("/category");
        const finalData = await response.json();
        data = finalData.data;
        const cacheData = { data, expiration };
        localStorage.setItem("category", JSON.stringify(cacheData));
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    }
  }

  loadCategories();

  // Open modal
  openFolderBtn.addEventListener("click", () => {
    folderModal.style.display = "block";
  });

  // Close modal
  closeFolderBtn.addEventListener("click", () => {
    folderModal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === folderModal) {
      folderModal.style.display = "none";
    }
  });


  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const categoryData = {
      category: formData.get("category"),
    };

    try {
      const response = await fetch("/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const res = await response.json();
      alert(res.message);

      if (res.status === 200) {
        await loadCategories();
        folderModal.style.display = "none";
      }
    } catch (err) {
      console.error("Could not add category", err);
    }
  });

  async function readCategory(id) {
    try {
      const response = await fetch(`/category/read/${id}`);
      const res = await response.json();
      if (res.data) {
        console.log("Category found:", res.data);
      } else {
        alert("Category not found");
      }
    } catch (err) {
      console.error("Error reading category", err);
    }
  }

  async function updateCategory(id, updatedCategoryData) {
    try {
      const response = await fetch(`/category/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategoryData),
      });

      const res = await response.json();
      alert(res.message);

      if (res.status === 200) {
        await loadCategories(); 
      }
    } catch (err) {
      console.error("Error updating category", err);
    }
  }

  window.readCategory = readCategory;
  window.updateCategory = updateCategory;
});
readCategory("your-category-id");
updateCategory("your-category-id", { category: "Updated name" });

