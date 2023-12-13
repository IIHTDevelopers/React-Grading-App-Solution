import React, { useState, useEffect } from 'react';

const StudentForm = ({ addStudent, editStudent, updateStudent }) => {
    const [student, setStudent] = useState({
        name: '',
        grade: '',
        // Add more fields as needed
    });

    useEffect(() => {
        if (editStudent) {
            setStudent({ ...editStudent });
        } else {
            setStudent({
                name: '',
                grade: '',
                // Initialize other fields here
            });
        }
    }, [editStudent]);

    const isEditForm = !!editStudent;

    const isFormIncomplete = !student.name || !student.grade;
    // Add additional validation logic for other fields as needed

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditForm) {
            updateStudent(student);
        } else {
            addStudent(student);
        }
        setStudent({
            name: '',
            grade: '',
            // Reset other fields here
        });
    };

    return (
        <div>
            <h2>{isEditForm ? 'Edit Student' : 'Add a Student'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name:
                    <input
                        id="name"
                        type="text"
                        value={student.name}
                        onChange={(e) => setStudent({ ...student, name: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="grade">
                    Grade:
                    <input
                        id="grade"
                        type="text"
                        value={student.grade}
                        onChange={(e) => setStudent({ ...student, grade: e.target.value })}
                        required
                    />
                </label>
                {/* Add other fields here */}
                <button type="submit" disabled={isFormIncomplete}>
                    {isEditForm ? 'Update Student' : 'Add Student'}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
