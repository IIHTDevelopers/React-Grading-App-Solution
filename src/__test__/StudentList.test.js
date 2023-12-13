import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentList from '../components/StudentList';

const students = [
    { id: 1, name: 'John Doe', grade: 'A' },
    { id: 2, name: 'Jane Smith', grade: 'B' },
];

const deleteStudent = jest.fn();
const setEditStudent = jest.fn();

describe('boundary', () => {
    beforeEach(() => {
        render(
            <StudentList
                students={students}
                deleteStudent={deleteStudent}
                setEditStudent={setEditStudent}
            />
        );
    });

    test('StudentListComponent boundary it has a "Filter by Name" text field', () => {
        const nameInput = screen.getByLabelText('Filter by Name:');
        expect(nameInput).toBeTruthy();
    });

    test('StudentListComponent boundary it displays the Name of a student after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Name:');
        fireEvent.change(filterInput, { target: { value: 'John Doe' } });
        const strongElement = await screen.findByText('Name:');
        expect(strongElement).toBeTruthy();
    });

    test('StudentListComponent boundary it displays the Grade of a student after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Name:');
        fireEvent.change(filterInput, { target: { value: 'John Doe' } });
        const strongElement = await screen.findByText('Grade:');
        expect(strongElement).toBeTruthy();
    });

    test('StudentListComponent boundary it displays the "Edit" button to edit the student', async () => {
        const editButtons = screen.getAllByText('Edit');
        expect(editButtons).toBeTruthy();
    });

    test('StudentListComponent boundary it calls deleteStudent when "Delete" button is clicked', () => {
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(deleteStudent).toHaveBeenCalledWith(students[0].id);
    });

    test('StudentListComponent boundary it removes the student after clicking the "Delete" button', () => {
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);
        expect(screen.queryByText('Name: John Doe')).toBeNull();
        expect(screen.queryByText('Grade: A')).toBeNull();
    });

    test('StudentListComponent boundary it displays "No students found" when there are no students', async () => {
        render(
            <StudentList students={[]} deleteStudent={deleteStudent} setEditStudent={setEditStudent} />
        );
        const noStudentsMessage = await screen.findByText('No students found');
        expect(noStudentsMessage).toBeTruthy();
    });
});
