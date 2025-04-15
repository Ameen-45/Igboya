// Answer Key for the Word Problems Quiz (20 questions)
const wordProblemsAnswerKey = {
    q1: "C", q2: "B", q3: "B", q4: "B", q5: "C",
    q6: "A", q7: "C", q8: "A", q9: "C", q10: "B",
    q11: "A", q12: "B", q13: "C", q14: "A", q15: "B",
    q16: "A", q17: "C", q18: "B", q19: "A", q20: "C"
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('quiz-results');
    
    // Debugging: Check if elements exist
    if (!quizForm) {
        console.error('Quiz form not found! Check the ID "quiz-form"');
        return;
    }
    if (!resultDiv) {
        console.error('Result div not found! Check the ID "quiz-results"');
        return;
    }

    // Add submit event listener
    quizForm.addEventListener('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        console.log('Form submission intercepted'); // Debugging
        
        let score = 0;
        const totalQuestions = Object.keys(wordProblemsAnswerKey).length;
        const unanswered = [];
        
        // Check each answer
        for (let i = 1; i <= totalQuestions; i++) {
            const questionName = `q${i}`;
            const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedAnswer) {
                unanswered.push(i);
                continue;
            }
            
            if (selectedAnswer.value === wordProblemsAnswerKey[questionName]) {
                score++;
            }
        }
        
        // Calculate percentage
        const percentage = (score / totalQuestions * 100).toFixed(1);
        
        // Create feedback message
        let feedbackMessage;
        if (unanswered.length > 0) {
            feedbackMessage = `<p><i class="fas fa-exclamation-circle"></i> You didn't answer questions: ${unanswered.join(', ')}</p>`;
        } else if (percentage >= 80) {
            feedbackMessage = '<p><i class="fas fa-check-circle"></i> Excellent! You have mastered word problems.</p>';
        } else if (percentage >= 50) {
            feedbackMessage = '<p><i class="fas fa-thumbs-up"></i> Good job! Review your missed questions.</p>';
        } else {
            feedbackMessage = '<p><i class="fas fa-book"></i> Keep practicing! Word problems take time to master.</p>';
        }
        
        // Display results
        resultDiv.innerHTML = `
            <div class="quiz-result-box">
                <h3>Your Score: ${score}/${totalQuestions} (${percentage}%)</h3>
                <div class="feedback">${feedbackMessage}</div>
                <button class="retry-btn">Try Again</button>
            </div>
        `;
        
        // Add retry button functionality
        resultDiv.querySelector('.retry-btn').addEventListener('click', function() {
            quizForm.reset();
            resultDiv.innerHTML = '';
        });
        
        // Scroll to results
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    });
});
