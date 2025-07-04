
const lightPalette = [
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
  "#F0F8FF", // alice blue
];
let notes = document.querySelector("#note-container");
=======
const notes = document.querySelector("#note-container")
>>>>>>> 4bd9aa38c4175441f24f73c9674c43edc6874743
function newElement(ele) {
  return document.createElement(ele);
}
function newDiv() {
  return newElement("div");
}
const editForm = document.getElementById('edit-note-form');
const undo = document.getElementById('undo-btn');
const modal = document.getElementById('editnoteModal');
const openBtn = document.getElementById('openEditNoteBtn');
const closeBtn = document.getElementById('closeEditModal');

<<<<<<< HEAD
var data = [];
window.addEventListener("load", async function () {
  let now = Date.now();
  const expiration = now + 1000 * 60 * 60;
  let cache = JSON.parse(localStorage.getItem("notes"));
  console.log(cache);
  if (cache?.data.length > 0 && cache?.expiration > now) {
    console.log("not expired yet");
    data = cache.data;
  } else {
    const response = await fetch("/notes");
    let finalData = await response.json();
    data = finalData.data;
    let cacheData = { data: data, ...{ expiration: expiration } };
    localStorage.setItem("notes", JSON.stringify(cacheData));
  }
  if (data) {
    notes.classList.add("notes");
    console.log(data.length);
=======

let data = [];
window.addEventListener('load', async function() {
  data = await fetchData('notes', '/notes')
  if (data?.length !== 0) {
    notes.classList.add("notes")
    console.log('length', data.length)
>>>>>>> 4bd9aa38c4175441f24f73c9674c43edc6874743
    for (let i = 0; i < data.length; i++) {
      let deleteIcon = newElement("img");
      deleteIcon.classList.add("self-center");
      deleteIcon.classList.add("icon-xl");
      deleteIcon.setAttribute("src", "./../img/trash.svg");
      let archiveIcon = newElement("img");
      archiveIcon.classList.add("self-center");
      archiveIcon.classList.add("icon-xl");
      archiveIcon.setAttribute(
        "src",
        "./../img/archive-minimalistic-svgrepo-com.svg"
      );

      let e = data[i];
      let card_container = newDiv();
      let card_title = newDiv();
      let div = newDiv();
      let date = newElement("span");
      let h4 = newElement("h4");
      let iconDiv = newDiv();
      let img = newElement("img");
      let detail = newElement("p");
      let clock = newDiv();
      let time_flex = newDiv();
      let clockIcon = newElement("img");
      let timeContainer = newDiv();
      let span = newElement("span");
      let time = newElement("span");
      card_container.classList.add("my-note-card");
      card_container.style.backgroundColor = lightPalette[i];
      card_title.classList.add("card-title");
      date.classList.add("date");
      time_flex.classList.add("time");
      clock.classList.add("icon-lg");
      img.classList.add("icon-lg");
      clockIcon.classList.add("unactive-icon");
      clockIcon.classList.add("self-center");
      timeContainer.classList.add("self-center");

      h4.classList.add("self-center");

      div.append(h4, img);
      timeContainer.append(span, time);
      deleteIcon.style.marginLeft = "auto";
      // add archive icon
      time_flex.append(clockIcon, timeContainer, deleteIcon,archiveIcon);
      card_title.append(date, div);
      card_container.append(card_title, detail, time_flex);
      // add data
      let date_component = e.createdBy ? new Date(e.createdBy) : null;
      date.textContent = date_component?.toLocaleDateString();
      let formattedTimeLocale = date_component?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
<<<<<<< HEAD
      span.textContent = "Created At ";
      time.textContent = formattedTimeLocale;
      img.setAttribute("src", "./../img/edit.svg");
      clockIcon.setAttribute("src", "./../img/clock.svg");

      detail.textContent =
        e.content.length < 150 ? e.content : e.content.slice(0, 150) + " ...";
      h4.textContent = e.title;
      notes.append(card_container);

      deleteIcon.addEventListener("click", async function () {
        console.log(e.id);
        data.splice(i, 1);
        console.log("data without deleted guy", i, data);
        let updatedContent = { data: data, ...{ expiration: expiration } };
        localStorage.setItem("notes", JSON.stringify(updatedContent));
        const res = await fetch(`/notes/delete/${e.id}`, {
          method: "DELETE",
        });
        let response = await res.json();
        alert(response.message);
        window.location.reload();
      });

      archiveIcon.addEventListener("click", async function () {
        console.log(e.id);
        
        console.log("archive guy", i, e);
        let updatedContent = { data: e, ...{ expiration: expiration } };
        localStorage.setItem("archive", JSON.stringify(updatedContent));
        const res = await fetch(`/archive/create`, {
          method: "POST",   headers: {
            'Content-type': 'application/json'
          },body: JSON.stringify(e)
        });
        let response = await res.json();
        alert(response.message);
        window.location.reload();
      });
=======
      span.textContent = "Created At "
      time.textContent = formattedTimeLocale
      img.setAttribute("src", './../img/edit.svg')
      clockIcon.setAttribute("src", "./../img/clock.svg")
      deleteIcon.setAttribute("src", "./../img/trash.svg")
      detail.textContent = e.content?.length < 150 ? e.content : e.content?.slice(0, 150) + " ..."
      h4.textContent = e?.title
      notes.append(card_container)
      //when click update icon
      img.addEventListener('click', () => {
        console.log(' i was clicked', e, editForm)
        modal.style.display = 'block';
        editForm.title.defaultValue = e.title
        editForm.content.defaultValue = e.content
        editForm.category.value = e.category

        editForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const editFormData = new FormData(editForm);
          let editedData = {
            title: editFormData.get('title'),
            content: editFormData.get('content'),
            category: editFormData.get('category'),
          };
          let updated_data = { ...{ id: e.id }, ...editedData, ...{ createdBy: e.createdBy } }
          await updateData(`/notes/update/${e.id}`, updated_data, '/notes', 'notes')
          modal.style.display = 'none';
          window.location.reload()
          resetting(editForm)

        });

      })
      deleteIcon.addEventListener('click', async function() {
        await deleteData(i,`/notes/delete/${e.id}`,data,'notes')
      })
>>>>>>> 4bd9aa38c4175441f24f73c9674c43edc6874743
    }
  } else {
    let h3 = newElement("h3");
    let writeImage = newElement("img");
    let div = newDiv();
    writeImage.setAttribute("src", "./../img/write.svg");
    writeImage.classList.add("write");
    div.classList.add("flex");
    writeImage.classList.add("self-center");
    div.append(writeImage, h3);
    h3.textContent = "No Notes here yet! Start writing one!";
    h3.classList.add("no-notes");
    notes.classList.remove("notes");
    notes.append(div);
  }
<<<<<<< HEAD
});
=======
  else {
    let h3 = newElement("h3")
    let writeImage = newElement("img")
    let div = newDiv()
    writeImage.setAttribute("src", "./../img/write.svg")
    writeImage.classList.add("write")
    div.classList.add("flex")
    writeImage.classList.add("self-center")
    div.append(writeImage, h3)
    h3.textContent = "No Notes here yet! Start writing one!"
    h3.classList.add("no-notes")
    notes.classList.remove("notes")
    notes.append(div)
  }
}
)
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  resetting(editForm)
});
undo.addEventListener('click', function() {
  resetting(editForm)
});



function resetting(f) {
  f.title.defaultValue = ""
  f.content.defaultValue = ""
  f.category.value = ""
  f.reset()

}
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
    console.log(finalData.data)

    localStorage.setItem("notes", JSON.stringify(cacheData))
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
async function deleteData(index,apiLinkToDelete,data,localStorageKey){
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
>>>>>>> 4bd9aa38c4175441f24f73c9674c43edc6874743
