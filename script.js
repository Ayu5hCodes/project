const results = JSON.parse(localStorage.getItem('results')) || [];

document.getElementById('resultForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const score = parseFloat(document.getElementById('score').value);

    results.push({ name: studentName, score: score });
    localStorage.setItem('results', JSON.stringify(results));

    alert("Result added successfully!");
    this.reset();
});

if (document.getElementById('summaryResults')) {
    displaySummaryResults();
}

function displaySummaryResults() {
    const summaryDiv = document.getElementById('summaryResults');
    summaryDiv.innerHTML = '<h2>Results</h2>';

    if (results.length === 0) {
        summaryDiv.innerHTML += '<p>No results available.</p>';
        return;
    }

    let totalScore = 0;
    results.forEach(result => {
        summaryDiv.innerHTML += `<p>${result.name}: ${result.score}</p>`;
        totalScore += result.score;
    });

    const average = totalScore / results.length;
    const grade = calculateGrade(average);

    summaryDiv.innerHTML += `<p>Average Score: ${average.toFixed(2)}</p>`;
    summaryDiv.innerHTML += `<p>Grade: ${grade}</p>`;
}

function calculateGrade(average) {
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}
