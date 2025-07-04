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

document.addEventListener("DOMContentLoaded", async function () {
  const openFolderBtn = document.getElementById("openFolderBtn");
  const folderModal = document.getElementById("folderModal");
  const form = document.getElementById("folder-form");
  const closeFolderBtn = document.getElementById("closeModal2");
  // Open/close note modal
  // add the tasks here !!!!! good luck my fri
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
    await createData('/category/create',categoryData,'/category','category')
  });
});
async function fetchData(localStorageKey, apiLink) {
  let data = []
  let now = Date.now()
  let cache = JSON.parse(localStorage.getItem(localStorageKey))

  const expiration = now + (1000 * 60 * 60)
  if (cache?.data.length > 0 && cache?.expiration > now) {
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
async function createData(apiLinkToCreate,dataToUpload,apiLinkToFetch,localStorageKey){
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
