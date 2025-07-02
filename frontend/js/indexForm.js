document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('note-form');
    const clearBtn = document.getElementById('clear-btn');

    const noteModal = document.getElementById('noteModal');
    const openNoteBtn = document.getElementById('openNoteBtn');
    const closeNoteBtn = document.getElementById('closeModal');



    // Open/close note modal
    openNoteBtn.addEventListener('click', () => {
        noteModal.style.display = 'block';
    });

    closeNoteBtn.addEventListener('click', () => {
        noteModal.style.display = 'none';
    });




    // Click outside to close modals
    window.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            noteModal.style.display = 'none';
        }

    });

    // Clear note form
    clearBtn.addEventListener('click', function () {
        noteForm.reset();
    });

    // Handle note form submit
    noteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(noteForm);
        const noteData = {
            title: formData.get('title'),
            content: formData.get('content'),
            category: formData.get('category')
        };

        console.log('Note saved:', noteData);
        alert('Note saved successfully!');

        noteForm.reset();
        noteModal.style.display = 'none';
    });
});
