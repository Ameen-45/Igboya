// Answer Key for the Geometry Quiz (20 questions)
const geometryAnswerKey = {
    q1: "B", q2: "B", q3: "A", q4: "B", q5: "B",
    q6: "C", q7: "B", q8: "C", q9: "A", q10: "B",
    q11: "A", q12: "B", q13: "A", q14: "B", q15: "A",
    q16: "A", q17: "A", q18: "A", q19: "A", q20: "A"
};

// Escape HTML to prevent XSS
function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (match) {
        const escapeChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return escapeChars[match];
    });
}

// Forum functionality
document.addEventListener('DOMContentLoaded', function () {
    const forumKey = 'forumPosts';
    const favoritePostsKey = 'favoritePosts';

    // Load Forum Posts
    function loadForumPosts() {
        const forumPosts = JSON.parse(localStorage.getItem(forumKey)) || [];
        const forumPostsDiv = document.getElementById('forum-posts');
        forumPostsDiv.innerHTML = '';

        // Show latest posts first
        const reversedPosts = [...forumPosts].reverse();

        reversedPosts.forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('forum-post');

            postDiv.innerHTML = `
                <div class="post-header">
                    <h4>${escapeHTML(post.userName)}</h4>
                    <span class="post-time">${new Date(post.timestamp).toLocaleString()}</span>
                </div>
                <div class="post-content">${escapeHTML(post.userPost)}</div>
                ${index === 0 ? '<div class="new-post-indicator">New</div>' : ''}
                <button class="favorite-btn" data-index="${index}">Mark as Favorite</button>
            `;

            forumPostsDiv.appendChild(postDiv);
        });

        // Add favorite button functionality
        document.querySelectorAll('.favorite-btn').forEach((btn) => {
            btn.addEventListener('click', function () {
                const postIndex = btn.getAttribute('data-index');
                const forumPosts = JSON.parse(localStorage.getItem(forumKey)) || [];
                const favoritePosts = JSON.parse(localStorage.getItem(favoritePostsKey)) || [];

                const post = forumPosts[postIndex];
                if (!favoritePosts.includes(post)) {
                    favoritePosts.push(post);
                    localStorage.setItem(favoritePostsKey, JSON.stringify(favoritePosts));
                    alert('Post marked as favorite!');
                }
            });
        });
    }

    // Handle Forum Form Submission
    document.getElementById('forum-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const userNameInput = document.getElementById('userName');
        const userPostInput = document.getElementById('userPost');

        const userName = userNameInput.value.trim();
        const userPost = userPostInput.value.trim();

        if (!userName || !userPost) {
            alert('Please fill in all fields');
            return;
        }

        const forumPosts = JSON.parse(localStorage.getItem(forumKey)) || [];

        const newPost = {
            userName,
            userPost,
            timestamp: new Date().toISOString()
        };

        forumPosts.push(newPost);
        localStorage.setItem(forumKey, JSON.stringify(forumPosts));

        // Clear form fields
        userNameInput.value = '';
        userPostInput.value = '';

        // Reload posts
        loadForumPosts();

        // Smooth scroll to posts section
        document.getElementById('forum-posts').scrollIntoView({ behavior: 'smooth' });
    });

    // Geometry Calculator functionality
    const calcForm = document.getElementById('geometry-calculator-form');
    const resultDiv = document.getElementById('calc-result');

    calcForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const shape = document.getElementById('shape').value;
        const dimension1 = parseFloat(document.getElementById('dimension1').value);
        const dimension2 = parseFloat(document.getElementById('dimension2').value);

        let result = '';

        if (shape === 'circle') {
            if (isNaN(dimension1)) {
                result = 'Please enter a valid radius';
            } else {
                const area = Math.PI * Math.pow(dimension1, 2);
                const perimeter = 2 * Math.PI * dimension1;
                result = `Area: ${area.toFixed(2)} square units, Perimeter: ${perimeter.toFixed(2)} units`;
            }
        } else if (shape === 'square') {
            if (isNaN(dimension1)) {
                result = 'Please enter a valid side length';
            } else {
                const area = Math.pow(dimension1, 2);
                const perimeter = 4 * dimension1;
                result = `Area: ${area.toFixed(2)} square units, Perimeter: ${perimeter.toFixed(2)} units`;
            }
        } else if (shape === 'rectangle') {
            if (isNaN(dimension1) || isNaN(dimension2)) {
                result = 'Please enter valid length and width';
            } else {
                const area = dimension1 * dimension2;
                const perimeter = 2 * (dimension1 + dimension2);
                result = `Area: ${area.toFixed(2)} square units, Perimeter: ${perimeter.toFixed(2)} units`;
            }
        } else if (shape === 'triangle') {
            if (isNaN(dimension1) || isNaN(dimension2)) {
                result = 'Please enter valid base and height';
            } else {
                const area = 0.5 * dimension1 * dimension2;
                result = `Area: ${area.toFixed(2)} square units`;
            }
        }

        resultDiv.innerHTML = result;
    });

    // Initial load
    loadForumPosts();
});
