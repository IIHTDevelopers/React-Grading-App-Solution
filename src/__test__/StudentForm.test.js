import React from 'react';
import { render, screen } from '@testing-library/react';
import StudentForm from '../components/StudentForm';

const addStudentMock = jest.fn();
const updateStudentMock = jest.fn();

describe('boundary', () => {
    test('StudentFormComponent boundary it is rendered', () => {
        render(<StudentForm addStudent={addStudentMock} />);
        expect(screen.getByRole('heading')).toBeTruthy();
    });

    test('StudentFormComponent boundary it has "Add a Student" h2', () => {
        render(<StudentForm addStudent={addStudentMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Add a Student');
    });

    test('StudentFormComponent boundary it has "Edit Student" h2 when in edit mode', () => {
        render(<StudentForm editStudent={{ name: 'Edit Student' }} updateStudent={updateStudentMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Edit Student');
    });

    test('StudentFormComponent boundary it has name input field', () => {
        render(<StudentForm addStudent={addStudentMock} />);
        const nameInput = screen.getByLabelText('Name:');
        expect(nameInput).toBeTruthy();
    });

    test('StudentFormComponent boundary it has grade input field', () => {
        render(<StudentForm addStudent={addStudentMock} />);
        const gradeInput = screen.getByLabelText('Grade:');
        expect(gradeInput).toBeTruthy();
    });

    test('StudentFormComponent boundary it has an "Add Student" button', () => {
        render(<StudentForm addStudent={addStudentMock} />);
        const addButton = screen.getByRole('button', { name: 'Add Student' });
        expect(addButton).toBeTruthy();
    });

    test('StudentFormComponent boundary it has an "Update Student" button when in edit mode', () => {
        render(<StudentForm editStudent={{ name: 'Edit Student' }} updateStudent={updateStudentMock} />);
        const updateButton = screen.getByRole('button', { name: 'Update Student' });
        expect(updateButton).toBeTruthy();
    });
});
