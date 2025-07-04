window.addEventListener('load', async function() {
  console.log('hello')
  const archiveContainer = document.querySelector('.archiveContainer')
  const archiveList = document.getElementById('archiveList');
  let card_container = document.querySelector("#note-container")

  let archivedNotes = [];
  archivedNotes = await fetchData('archive', '/archive')
  
  console.log('notes', archivedNotes)
  if (archivedNotes?.length > 0) {
    archivedNotes.forEach(e=> {
      let div= newElement("div")
      let name= newElement("h4")
      let p = newElement("p")
      let span = newElement("span")
      name.textContent = e.title
      p.textContent = e.content
      let date_component = e.createdBy ? new Date(e.createdBy) : null;
      let formattedTimeLocale = date_component?.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      span.textContent = "Created At "+formattedTimeLocale
      div.append(name,p,span)
      div.classList.add("my-note-card")
     archiveContainer.append(div)
    });
  }
  else {
    let h3 = newElement("h3")
    let div = newDiv()
    div.classList.add("flex")
    writeImage.classList.add("self-center")
    div.append(h3)
    h3.textContent = "No Save Notes"
    h3.classList.add("no-notes")
    notes.classList.remove("notes")
    notes.append(div)
  }

})

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

    localStorage.setItem(localStorageKey, JSON.stringify(cacheData))
  }
  return data
}
function newElement(ele) {
  return document.createElement(ele);
}
function newDiv() {
  return newElement("div");
}

