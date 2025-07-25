const Palette = [
  "#FCEFEF", // soft rose
  "#FFF6E5", // light peach
  "#EAF6F6", // mint frost
  "#F3F1FF", // lavender mist
  "#FFF0F5", // blush pink
  "#F5F5DC", // beige
  "#F0FFF0", // honeydew
  "#E0FFFF", // light cyan
  "#FAFAD2", // light goldenrod
  "#F8F8FF", // ghost white
  "#FDF5E6", // old lace
  "#E6E6FA", // lavender
  "#F5FFFA", // mint cream
  "#FFFACD", // lemon chiffon
  "#F0F8FF"  // alice blue
];

document.addEventListener("DOMContentLoaded", async function() {
  const openFolderBtn = document.getElementById("openFolderBtn");
  const folderModal = document.getElementById("folderModal");
  const form = document.getElementById("folder-form");
  const closeFolderBtn = document.getElementById("closeModal2");
  let carousel = document.querySelector(".carousel")
  // Open/close note modal
  let folderData = []
  folderData = await fetchData('/category', 'category')
  console.log('folder',folderData)
  if (folderData?.length > 0) {
    folderData.map((e) => {
      let folderCard = newDiv()
      folderCard.classList.add("folder-card")
      let folderDiv = newDiv()

      let dataDiv = newDiv()
      let folderIcon = newElement('img')
      folderIcon.setAttribute('src', '../img/note.svg')
      folderIcon.classList.add('icon-xl')
      folderDiv.classList.add("icons")
      folderDiv.append(folderIcon)
      let folderName = newElement("h4")
      folderName.textContent = e.category
      dataDiv.append(folderName)
      folderCard.append(folderDiv, dataDiv)
      carousel.append(folderCard)
    }
    )
  }
  console.log(data)
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
    await createData('/category/create', categoryData, '/category', 'category')
  });
});
async function fetchData(localStorageKey, apiLink) {
  let data = []
  let now = Date.now()
  let cache = JSON.parse(localStorage.getItem(localStorageKey))

  const expiration = now + (1000 * 60 * 60)
  if (cache?.data?.length > 0 && cache?.expiration > now) {
    console.log("not expired yet")
    data = cache.data;
  }
  else {
    const response = await fetch(apiLink)
    let finalData = await response.json()
    data = finalData.data
    let cacheData = { data: data, ...{ expiration: expiration } }

    localStorage.setItem("notes", JSON.stringify(cacheData))
  }
  return data
}
async function createData(apiLinkToCreate, dataToUpload, apiLinkToFetch, localStorageKey) {
  try {
    const response = await fetch(apiLinkToCreate,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(dataToUpload)
      })
    let res = await response.json()
    alert(res.message)
    if (res.status = 200) {
      let now = Date.now()
      const expiration = now + (1000 * 60 * 60)
      const response = await fetch(apiLinkToFetch)
      let finalData = await response.json()
      data = finalData.data
      let cacheData = { data: data, ...{ expiration: expiration } }
      localStorage.setItem(localStorageKey, JSON.stringify(cacheData))

    }
  }
  catch (err) {
    console.log('cannot create note', err)
  }


}
async function fetchData(localStorageKey, apiLink) {
  let data = []
  let now = Date.now()
  let cache = JSON.parse(localStorage.getItem(localStorageKey))

  const expiration = now + (1000 * 60 * 60)
  if (cache?.data?.length > 0 && cache?.expiration > now) {
    console.log("not expired yet")
    data = cache.data;
  }
  else {
    const response = await fetch(apiLink)
    let finalData = await response.json()
    data = finalData.data
    let cacheData = { data: data, ...{ expiration: expiration } }
    console.log(finalData.data)

    localStorage.setItem(localStorageKey, JSON.stringify(cacheData))
  }
  return data
}
async function updateData(apiLinkToUpdate, updated_data, apiLinkToFetch, localStorageKey) {
  try {
    const edit_res = await fetch(apiLinkToUpdate,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updated_data)
      })
    let res = await edit_res.json()
    alert(res.message)
    if (res.status = 200) {
      let now = Date.now()
      const expiration = now + (1000 * 60 * 60)
      const response = await fetch(apiLinkToFetch)
      let afterEditData = await response.json()
      data = afterEditData.data
      let cacheData = { data: data, ...{ expiration: expiration } }
      localStorage.setItem(localStorageKey, JSON.stringify(cacheData))

    }
  }
  catch (err) {
    console.log('cannot create note', err)
  }

}
async function deleteData(index, apiLinkToDelete, data, localStorageKey) {
  let now = Date.now()
  const expiration = now + (1000 * 60 * 60)

  data.splice(index, 1)
  let updatedContent = { data: data, ...{ expiration: expiration } }
  localStorage.setItem(localStorageKey, JSON.stringify(updatedContent))
  const res = await fetch(apiLinkToDelete, {
    method: 'DELETE'
  })
  let response = await res.json()
  alert(response.message)
  window.location.reload()

}
