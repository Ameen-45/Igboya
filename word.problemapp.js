document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("wordProblemForm");
    const output = document.getElementById("output");
    const guideBtn = document.getElementById("guideBtn");

    // Form submit handler
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from submitting normally
        const problem = document.getElementById("problem").value; // Get the user input problem
        solveProblem(problem); // Call solveProblem function to solve the issue
    });

    // Quick guide button functionality
    guideBtn.addEventListener("click", () => {
        alert(
            "🧠 Quick Guide:\n\n1. Read the problem carefully.\n2. Identify what is being asked.\n3. Pick out key numbers and operations.\n4. Use this tool to break it down step-by-step!"
        );
    });

    // Function to solve the problem
    function solveProblem(text) {
        let response = "";

        const lower = text.toLowerCase(); // Convert the input to lowercase to simplify matching
        const numbers = text.match(/\d+/g)?.map(Number) || []; // Extract numbers from the problem text

        if (numbers.length === 2) { // Ensure there are two numbers
            // Check for operations in the problem statement
            if (lower.includes("total") || lower.includes("altogether") || lower.includes("sum") || lower.includes("in all")) {
                response = `${numbers[0]} + ${numbers[1]} = ${numbers[0] + numbers[1]}`;
            } else if (lower.includes("difference") || lower.includes("left") || lower.includes("remain")) {
                response = `${numbers[0]} - ${numbers[1]} = ${numbers[0] - numbers[1]}`;
            } else if ((lower.includes("each") && lower.includes("total")) || lower.includes("product")) {
                response = `${numbers[0]} × ${numbers[1]} = ${numbers[0] * numbers[1]}`;
            } else if (lower.includes("share") || lower.includes("each person gets") || lower.includes("divide")) {
                response = `${numbers[0]} ÷ ${numbers[1]} = ${(numbers[0] / numbers[1]).toFixed(2)}`;
            } else {
                response = "🤔 I found numbers but couldn't figure out the operation. Try rephrasing.";
            }
        } else {
            response = "Please provide a problem with at least two numbers.";
        }

        // Display the solution
        output.innerHTML = `<p><strong>Solution:</strong> ${response}</p>`;
    }
});
