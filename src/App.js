import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    try {
      const addedStudent = await axios.post('http://localhost:4000/students', student);
      setStudents([...students, addedStudent.data]);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:4000/students/${studentId}`);
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const updateStudent = async (student) => {
    try {
      await axios.put(`http://localhost:4000/students/${student.id}`, student);
      setStudents(
        students.map((s) => (s.id === student.id ? { ...s, ...student } : s))
      );
      setEditStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h2>Welcome to Your Grading Application</h2>
      <h2>Add Student</h2>
      <StudentForm addStudent={addStudent} editStudent={editStudent} updateStudent={updateStudent} />
      <h2>Students List</h2>
      <StudentList
        students={students}
        deleteStudent={deleteStudent}
        setEditStudent={setEditStudent}
      />
    </div>
  );
}

export default App;
