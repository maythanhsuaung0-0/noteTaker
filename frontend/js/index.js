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
  "#F0F8FF"  // alice blue
];
let notes = document.querySelector("#note-container")
function newElement(ele) {
  return document.createElement(ele)
}
function newDiv() {
  return newElement("div")
}

var data = [];
window.addEventListener('load', async function() {
  let now = Date.now()
  const expiration = now + (1000 * 60 * 60)
  let cache = JSON.parse(localStorage.getItem("notes"))
  console.log(cache)
  if (cache?.data.length > 0 && cache?.expiration > now) {
    console.log("not expired yet")
    data = cache.data;
  }
  else {
    const response = await fetch('/notes')
    let finalData = await response.json()
    data = finalData.data
    let cacheData = { data: data, ...{ expiration: expiration } }
    localStorage.setItem("notes", JSON.stringify(cacheData))
  }
  if (data) {
    notes.classList.add("notes")
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
      let deleteIcon = newElement("img")
      let e = data[i]
      let card_container = newDiv()
      let card_title = newDiv()
      let div = newDiv()
      let date = newElement("span")
      let h4 = newElement("h4")
      let iconDiv = newDiv()
      let img = newElement("img")
      let detail = newElement("p")
      let clock = newDiv()
      let time_flex = newDiv()
      let clockIcon = newElement("img")
      let timeContainer = newDiv()
      let span = newElement("span")
      let time = newElement("span")
      card_container.classList.add("my-note-card")
      card_container.style.backgroundColor = lightPalette[i]
      card_title.classList.add("card-title")
      date.classList.add("date")
      time_flex.classList.add("time")
      clock.classList.add("icon-lg")
      img.classList.add("icon-lg")
      clockIcon.classList.add("unactive-icon")
      clockIcon.classList.add("self-center")
      timeContainer.classList.add("self-center")
      deleteIcon.classList.add("self-center")
      h4.classList.add("self-center")
      deleteIcon.classList.add("icon-xl")
      div.append(h4, img)
      timeContainer.append(span, time)
      deleteIcon.style.marginLeft = "auto"
      time_flex.append(clockIcon, timeContainer, deleteIcon)
      card_title.append(date, div)
      card_container.append(card_title, detail, time_flex)
      // add data
      let date_component = e.createdBy ? new Date(e.createdBy) : null
      date.textContent = date_component?.toLocaleDateString()
      let formattedTimeLocale = date_component?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      span.textContent = "Created At "
      time.textContent = formattedTimeLocale
      img.setAttribute("src", './../img/edit.svg')
      clockIcon.setAttribute("src", "./../img/clock.svg")
      deleteIcon.setAttribute("src", "./../img/trash.svg")
      detail.textContent = e.content.length < 150 ? e.content : e.content.slice(0, 150) + " ..."
      h4.textContent = e.title
      notes.append(card_container)
      deleteIcon.addEventListener('click', async function() {
        console.log(e.id)
        data.splice(i, 1)
        console.log('data without deleted guy',i, data)
        let updatedContent = { data: data, ...{ expiration: expiration } }
        localStorage.setItem("notes", JSON.stringify(updatedContent))
        const res = await fetch(`/notes/delete/${e.id}`, {
          method: 'DELETE'
        })
        let response = await res.json()
        alert(response.message)
        window.location.reload()
      })
    }
  }
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
