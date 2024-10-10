document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const studentScore = parseInt(document.getElementById('studentScore').value, 10);

    if (!studentName || isNaN(studentScore)) return;

    const students = JSON.parse(localStorage.getItem('students')) || {};

    if (!students[studentName]) {
        students[studentName] = [];
    }

    students[studentName].push(studentScore);
    localStorage.setItem('students', JSON.stringify(students));

    document.getElementById('studentForm').reset();
    alert(`Score added for ${studentName}!`);
});
