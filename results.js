const students = JSON.parse(localStorage.getItem('students')) || {};

function displayResults() {
    const resultsDiv = document.getElementById('resultsDisplay');
    resultsDiv.innerHTML = '';

    if (Object.keys(students).length === 0) {
        resultsDiv.innerHTML = '<p>No results available.</p>';
        return;
    }

    for (const studentName in students) {
        const scores = students[studentName];
        resultsDiv.innerHTML += `
            <h3>
                <a href="studentChart.html?name=${encodeURIComponent(studentName)}">${studentName}</a>
                <button onclick="deleteLastScore('${encodeURIComponent(studentName)}')">Delete Last Score</button>
            </h3>
            <p>Scores: ${scores.join(', ')}</p>
        `;
    }
}

function deleteLastScore(studentName) {
    const decodedName = decodeURIComponent(studentName);
    if (students[decodedName] && students[decodedName].length > 0) {
        students[decodedName].pop(); // Remove the last score

        if (students[decodedName].length === 0) {
            delete students[decodedName]; // Delete student if no scores left
        }

        localStorage.setItem('students', JSON.stringify(students));
        displayResults(); // Refresh the display
    }
}

// Run the display function when the page loads
document.addEventListener('DOMContentLoaded', displayResults);
