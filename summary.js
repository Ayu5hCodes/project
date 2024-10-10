const students = JSON.parse(localStorage.getItem('students')) || {};

function displaySummaryResults() {
    const summaryDiv = document.getElementById('summaryResults');
    summaryDiv.innerHTML = '<h2>Results</h2>';

    if (Object.keys(students).length === 0) {
        summaryDiv.innerHTML += '<p>No results available.</p>';
        return;
    }

    for (const studentName in students) {
        const scores = students[studentName];
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const average = totalScore / scores.length;
        const grade = calculateGrade(average);

        summaryDiv.innerHTML += `<p><strong>${studentName}:</strong> Average Score: ${average.toFixed(2)}, Grade: ${grade}</p>`;
    }

    renderCharts();
}

function calculateGrade(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

function renderCharts() {
    const ctx = document.getElementById('scoreChart').getContext('2d');

    const labels = Object.keys(students);
    const scores = labels.map(name => {
        const totalScore = students[name].reduce((sum, score) => sum + score, 0);
        return totalScore / students[name].length;
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Scores',
                data: scores,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Run the display function when the page loads
document.addEventListener('DOMContentLoaded', displaySummaryResults);
