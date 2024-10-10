const params = new URLSearchParams(window.location.search);
const studentName = decodeURIComponent(params.get('name'));

const students = JSON.parse(localStorage.getItem('students')) || {};
const scores = students[studentName] || [];

document.getElementById('studentName').textContent = studentName;

function renderCharts() {
    if (scores.length === 0) {
        alert("No scores available for this student.");
        return;
    }

    const ctxBar = document.getElementById('scoreChart').getContext('2d');
    const ctxPie = document.getElementById('flowChart').getContext('2d');

    // Bar Chart
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: scores.map((_, index) => `Test ${index + 1}`),
            datasets: [{
                label: 'Scores',
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

    // Pie Chart
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: scores.map((_, index) => `Test ${index + 1}`),
            datasets: [{
                label: 'Scores',
                data: scores,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)'
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
            }]
        }
    });
}

// Run the render function when the page loads
document.addEventListener('DOMContentLoaded', renderCharts);
