document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('note-form');
  const clearBtn = document.getElementById('clear-btn');
  const modal = document.getElementById('noteModal');
  const openBtn = document.getElementById('openNoteBtn');
  const closeBtn = document.getElementById('closeModal');

  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });


  clearBtn.addEventListener('click', function() {
    form.reset();
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const noteData = {
      title: formData.get('title'),
      content: formData.get('content'),
      category: formData.get('category'),
    };
   await createData('/notes/create',noteData,'/notes','notes')
    window.location.reload()

    form.reset();
  });

});
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
