import React, { useState } from 'react';

const StudentList = ({ students, deleteStudent, setEditStudent }) => {
    const [filters, setFilters] = useState({ name: '' });

    const filteredStudents = students.filter((student) => {
        return student.name.toLowerCase().includes(filters.name.toLowerCase());
    });

    const handleDelete = (id) => {
        deleteStudent(id);
    };

    const handleEdit = (student) => {
        setEditStudent(student);
    };

    return (
        <div>
            <div>
                <label htmlFor="name">
                    Filter by Name:
                    <input
                        id="name"
                        type="text"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                </label>
            </div>
            <ul>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <li key={student.id}>
                            <strong>Name:</strong> {student.name}
                            <br />
                            <strong>Grade:</strong> {student.grade}
                            <br />
                            {/* Add other student details here */}
                            <button onClick={() => handleEdit(student)}>Edit</button>
                            <button onClick={() => handleDelete(student.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No students found</li>
                )}
            </ul>
        </div>
    );
};

export default StudentList;
