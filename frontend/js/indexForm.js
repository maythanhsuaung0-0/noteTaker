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
            
    form.addEventListener('submit', function(e) {
        e.preventDefault();
                
        const formData = new FormData(form);
        const noteData = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category'),
           
        };
                
        console.log('Note saved:', noteData);
                
        alert('Note saved successfully!');
                
        form.reset();
        });

    
    });
