document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('note-form');
    const clearBtn = document.getElementById('clear-btn');
    const tagsInput = document.getElementById('note-tags');
    const tagsContainer = document.getElementById('tags-container');
    const modal = document.getElementById('noteModal');
    const openBtn = document.getElementById('openNoteBtn');
    const closeBtn = document.getElementById('closeModal');

    openBtn.addEventListener('click', () => {
        console.log("jkjjk")
        modal.style.display = 'block';
    });

    closeFolderBtn.addEventListener('click', () => {
        folderModal.style.display = 'none';
    });

    // Click outside to close modals
    window.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            noteModal.style.display = 'none';
        }
    });

            
    clearBtn.addEventListener('click', function() {
        form.reset();
        tagsContainer.innerHTML = '';
    });

    // Handle note form submit
    noteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(noteForm);
        const noteData = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
            tags: Array.from(tagsContainer.querySelectorAll('.tag')).map(tag => 
                tag.textContent.replace('×', '').trim()
            )
        };

        console.log('Note saved:', noteData);
        alert('Note saved successfully!');
                
        form.reset();
        tagsContainer.innerHTML = '';
        });

        tagsInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                    
                const tagText = tagsInput.value.trim();
                if (tagText) {
                    addTag(tagText);
                    tagsInput.value = '';
                }
            }
        });
            
        function addTag(text) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `${text} <span class="tag-remove">×</span>`;
                
            tag.querySelector('.tag-remove').addEventListener('click', function() {
                tag.remove();
            });
                
            tagsContainer.appendChild(tag);
        }
    });
