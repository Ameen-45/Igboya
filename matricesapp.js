document.addEventListener('DOMContentLoaded', function() {
    // 1. VIDEO HANDLING - Works with your YouTube iframes
    function initializeVideos() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(card => {
            const iframe = card.querySelector('iframe');
            if (!iframe) return;

            // Extract video ID from different YouTube URL formats
            let videoId;
            const url = iframe.src.trim();
            
            if (url.includes('watch?v=')) {
                videoId = url.split('watch?v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('embed/')) {
                videoId = url.split('embed/')[1].split('?')[0];
            }

            // Clean the video ID
            if (videoId) {
                videoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '');
            }

            if (!videoId || videoId.length !== 11) {
                console.warn('Invalid YouTube video ID:', iframe.src);
                return;
            }

            // Ensure we're using the embed URL (fixes your HTML iframes)
            if (!iframe.src.includes('embed')) {
                iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;
            }

            // Create mobile thumbnail if it doesn't exist
            let thumbnail = card.querySelector('.video-thumbnail');
            if (!thumbnail) {
                thumbnail = document.createElement('div');
                thumbnail.className = 'video-thumbnail';
                thumbnail.innerHTML = `
                    <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" 
                         alt="Video thumbnail" 
                         loading="lazy">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                `;
                card.insertBefore(thumbnail, iframe);
            }

            // Mobile click handler
            thumbnail.addEventListener('click', () => {
                window.open(`https://youtube.com/watch?v=${videoId}`, '_blank');
            });

            // Set initial display
            updateVideoDisplay(card);
        });
    }

    function updateVideoDisplay(card) {
        const iframe = card.querySelector('iframe');
        const thumbnail = card.querySelector('.video-thumbnail');
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            iframe.style.display = 'none';
            thumbnail.style.display = 'block';
        } else {
            iframe.style.display = 'block';
            thumbnail.style.display = 'none';
        }
    }

    // 2. QUIZ FUNCTIONALITY - Works with your 20 questions
    function initializeQuiz() {
        const quizForm = document.getElementById('quiz-form');
        if (!quizForm) return;

        const answerKey = {
            q1: "A", q2: "B", q3: "B", q4: "C", q5: "A",
            q6: "B", q7: "C", q8: "C", q9: "B", q10: "A",
            q11: "A", q12: "B", q13: "C", q14: "A", q15: "B",
            q16: "A", q17: "A", q18: "B", q19: "A", q20: "A"
        };

        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let score = 0;
            const totalQuestions = 20;

            // Check answers and highlight
            for (let i = 1; i <= totalQuestions; i++) {
                const questionName = `q${i}`;
                const selectedAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
                const questionDiv = document.querySelector(`input[name="${questionName}"]`).closest('.quiz-question');
                
                questionDiv.classList.remove('correct', 'incorrect');
                
                if (selectedAnswer) {
                    if (selectedAnswer.value === answerKey[questionName]) {
                        score++;
                        questionDiv.classList.add('correct');
                    } else {
                        questionDiv.classList.add('incorrect');
                    }
                }
            }

            // Show results
            const percentage = Math.round((score / totalQuestions) * 100);
            const resultElement = document.getElementById('quiz-result');
            
            resultElement.innerHTML = `
                <div class="quiz-result">
                    <h3>Score: ${score}/20 (${percentage}%)</h3>
                    <p>${getQuizMessage(percentage)}</p>
                    <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
                </div>
            `;
            
            resultElement.scrollIntoView({ behavior: 'smooth' });
        });

        function getQuizMessage(percentage) {
            if (percentage >= 80) return "🎉 Excellent work! You've mastered matrices!";
            if (percentage >= 60) return "👍 Good job! You understand matrices well!";
            if (percentage >= 40) return "👌 Not bad! Keep practicing!";
            return "📚 Review the material and try again!";
        }
    }

    // 3. FORUM FUNCTIONALITY - Works with your discussion section
    function initializeForum() {
        const forumForm = document.getElementById('forumForm');
        if (!forumForm) return;

        function loadPosts() {
            const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
            const forumDiv = document.getElementById('forumPosts');
            
            forumDiv.innerHTML = posts.length === 0
                ? '<p class="no-posts">No discussions yet. Be the first to post!</p>'
                : posts.map(post => `
                    <div class="forum-post">
                        <div class="post-header">
                            <h4>${post.userName}</h4>
                            <small>${new Date(post.timestamp).toLocaleString()}</small>
                        </div>
                        <p>${post.userPost}</p>
                    </div>
                `).join('');
        }

        forumForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('userName').value.trim();
            const post = document.getElementById('userPost').value.trim();
            
        
            
            const posts = JSON.parse(localStorage.getItem('forumPosts')) || [];
            posts.unshift({
                userName: name,
                userPost: post,
                timestamp: new Date().toISOString()
            });
            
            localStorage.setItem('forumPosts', JSON.stringify(posts));
            loadPosts();
            forumForm.reset();
            document.getElementById('forumPosts').scrollIntoView({ behavior: 'smooth' });
        });

        loadPosts();
    }

    // 4. BACK BUTTON EFFECT
    function initializeBackButton() {
        const backButton = document.querySelector('.btn-red');
        if (!backButton) return;
        
        backButton.addEventListener('mouseenter', () => {
            backButton.style.transform = 'translateY(-2px)';
            backButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        backButton.addEventListener('mouseleave', () => {
            backButton.style.transform = '';
            backButton.style.boxShadow = '';
        });
    }

    // 5. RESIZE HANDLER - For responsive video display
    function initializeResizeHandler() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.querySelectorAll('.video-card').forEach(updateVideoDisplay);
            }, 200);
        });
    }

    // Initialize all components
    initializeVideos();
    initializeQuiz();
    initializeForum();
    initializeBackButton();
    initializeResizeHandler();
});