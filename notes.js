// Get DOM elements
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const addNoteBtn = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to save notes to localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to render notes
function renderNotes() {
    notesList.innerHTML = '';
    
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        
        noteElement.innerHTML = `
            <h3>${note.title || 'Untitled'}</h3>
            <p>${note.content}</p>
            <div class="date">Created: ${new Date(note.date).toLocaleString()}</div>
            <div class="actions">
                <button class="edit-btn" onclick="editNote(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
            </div>
        `;
        
        notesList.appendChild(noteElement);
    });
}

// Function to add a new note
function addNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    
    if (content === '') {
        alert('Please write something in your note!');
        return;
    }
    
    const newNote = {
        title: title,
        content: content,
        date: new Date().toISOString()
    };
    
    notes.push(newNote);
    saveNotes();
    renderNotes();
    
    // Clear form
    noteTitle.value = '';
    noteContent.value = '';
}

// Function to edit a note
function editNote(index) {
    const note = notes[index];
    noteTitle.value = note.title;
    noteContent.value = note.content;
    
    // Change button to update mode
    addNoteBtn.textContent = 'Update Note';
    addNoteBtn.onclick = () => updateNote(index);
}

// Function to update a note
function updateNote(index) {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    
    if (content === '') {
        alert('Please write something in your note!');
        return;
    }
    
    notes[index] = {
        title: title,
        content: content,
        date: notes[index].date // Keep original date
    };
    
    saveNotes();
    renderNotes();
    
    // Reset form
    noteTitle.value = '';
    noteContent.value = '';
    addNoteBtn.textContent = 'Add Note';
    addNoteBtn.onclick = addNote;
}

// Function to delete a note
function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
    }
}

// Event listeners
addNoteBtn.addEventListener('click', addNote);

// Allow Enter key to add note when in title field
noteTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addNote();
    }
});

// Initial render
renderNotes();