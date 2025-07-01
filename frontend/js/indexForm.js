document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('note-form');
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
        tagsContainer.innerHTML = '';
    });
            
    form.addEventListener('submit', function(e) {
        e.preventDefault();
                
        const formData = new FormData(form);
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