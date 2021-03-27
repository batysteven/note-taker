const fs = require('fs');
const { findById, createNewNote, validateNote } = require('../lib/notes');
const { notes } = require('../db/db.json');
jest.mock('fs');

test('creates new note object', () => {
    const note = createNewNote({ id: '45646', title: 'New Title', text: 'New text test.'}, notes);

    expect(note.id).toBe('45646');
    expect(note.title).toBe('New Title');
    expect(note.text).toBe('New text test.');
});

test('finds by id', () => {
    const startingNotes = [
        {
            id: '80',
            title: 'Cool Beans',
            text: 'Cool beans text right here.'
        },
        {
            id: '81',
            title: 'Another Cool Beans Title',
            text: 'Another cool beans text right here.'
        }
    ];

    const result = findById('80', startingNotes);
    expect(result.title).toBe('Cool Beans');
    expect(result.text).toBe('Cool beans text right here.');
});

test('validate title', () => {
    const note = {
        id: '80',
        title: 'Cool Beans',
        text: 'Cool beans text right here.'
    };

    const invalidNote = {
        id: '80',
        text: 'Cool beans text right here.'
    };

    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});

