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
  let data = await fetchData('category','/category')
  if (data?.length !== 0) {
    console.log(data)
    for(let i = 0; i<data.length;i++){
      let currentData = data[i]
       let folderCard = document.createElement("div")
      folderCard.style.backgroundColor = lightPalette[i]
      //create more require elements by looking at the index.html
      // div class folder-card(i alrdy created),
      // and class icons(div),note-icon(img),icon(img),one more div,
      // h4,span elements
      // after creating, use varname.classList.add() to add classes
      // and append child into each parent
      // for eg, in <div class='folder-card'><div class="icons">
      // so we need folderCard.append(icons)
      // then to add data, use .textContext = currentData.category
      // for img, after creating element
      // use element.setAttribute("src", the url to img/note.svg"
  }}
