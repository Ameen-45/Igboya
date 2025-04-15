document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Video Handling
    function initVideos() {
        const videoCards = document.querySelectorAll('.video-card');
        const isMobile = window.innerWidth <= 768;

        videoCards.forEach((card) => {
            const iframe = card.querySelector('iframe');
            
            if (!iframe) {
                console.warn("No iframe found in video card");
                return;
            }

            // Extract and clean the video ID
            let videoId;
            const url = iframe.src.trim();
            
            // Handle different YouTube URL formats
            if (url.includes('watch?v=')) {
                videoId = url.split('watch?v=')[1].split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1].split('?')[0];
            } else if (url.includes('embed/')) {
                videoId = url.split('embed/')[1].split('?')[0];
            }
            
            // Clean any special characters from video ID
            if (videoId) {
                videoId = videoId.replace(/[^a-zA-Z0-9_-]/g, '');
            }

            if (!videoId || videoId.length !== 11) {
                console.warn("Invalid YouTube video ID from URL:", url);
                return;
            }

            // Update iframe with proper embed URL
            iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`;
            
            // Create thumbnail container if it doesn't exist
            let thumbnail = card.querySelector('.video-thumbnail');
            if (!thumbnail) {
                thumbnail = document.createElement('div');
                thumbnail.className = 'video-thumbnail';
                thumbnail.innerHTML = `
                    <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" 
                         alt="Video thumbnail" 
                         loading="lazy">
                    <div class="play-button"><i class="fas fa-play"></i></div>
                `;
                card.insertBefore(thumbnail, iframe);
            }

            // Set up click handler for mobile
            thumbnail.addEventListener('click', function() {
                window.open(`https://youtube.com/watch?v=${videoId}`, '_blank');
            });

            // Update display based on device
            updateVideoDisplay(card, isMobile);
        });
    }

    function updateVideoDisplay(card, isMobile) {
        const iframe = card.querySelector('iframe');
        const thumbnail = card.querySelector('.video-thumbnail');
        
        if (!iframe || !thumbnail) return;

        if (isMobile) {
            iframe.style.display = 'none';
            thumbnail.style.display = 'block';
        } else {
            iframe.style.display = 'block';
            thumbnail.style.display = 'none';
        }
    }

    // Initialize videos on load
    initVideos();

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const isMobile = window.innerWidth <= 768;
            document.querySelectorAll('.video-card').forEach(card => {
                updateVideoDisplay(card, isMobile);
            });
        }, 200);
    });

    // Quiz Functionality
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let score = 0;
            const totalQuestions = 20;
            
            const answerKey = {
                q1: "A", q2: "B", q3: "B", q4: "C", q5: "A",
                q6: "B", q7: "C", q8: "C", q9: "B", q10: "A",
                q11: "A", q12: "B", q13: "C", q14: "A", q15: "B",
                q16: "A", q17: "A", q18: "B", q19: "A", q20: "A"
            };
            
            for (let i = 1; i <= totalQuestions; i++) {
                const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === answerKey[`q${i}`]) {
                    score++;
                }
            }
            
            const resultElement = document.getElementById('quiz-result');
            const percentage = Math.round((score / totalQuestions) * 100);
            
            let message = `You scored ${score} out of ${totalQuestions} (${percentage}%) - `;
            if (percentage >= 80) message += "Excellent!";
            else if (percentage >= 60) message += "Good job!";
            else if (percentage >= 40) message += "Not bad!";
            else message += "Keep practicing!";
            
            resultElement.innerHTML = `<div class="quiz-result-box">${message}</div>`;
            resultElement.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Forum Functionality
    function loadPosts() {
        const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
        const forumPostsDiv = document.getElementById('forumPosts');
        
        forumPostsDiv.innerHTML = '';
        
        if (forumPosts.length === 0) {
            forumPostsDiv.innerHTML = '<p class="no-posts">No discussions yet. Be the first to post!</p>';
            return;
        }
        
        forumPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'forum-post';
            postDiv.innerHTML = `
                <div class="post-header">
                    <h4>${post.userName}</h4>
                    <small>${new Date(post.timestamp).toLocaleString()}</small>
                </div>
                <p>${post.userPost}</p>
            `;
            forumPostsDiv.appendChild(postDiv);
        });
    }

    const forumForm = document.getElementById('forumForm');
    if (forumForm) {
        loadPosts();
        
        forumForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const userName = document.getElementById('userName').value.trim();
            const userPost = document.getElementById('userPost').value.trim();
            
            
            const forumPosts = JSON.parse(localStorage.getItem('forumPosts')) || [];
            const newPost = { 
                userName, 
                userPost,
                timestamp: new Date().toISOString()
            };
            
            forumPosts.unshift(newPost);
            localStorage.setItem('forumPosts', JSON.stringify(forumPosts));
            
            loadPosts();
            forumForm.reset();
            document.getElementById('forumPosts').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Back Button Effect
    const backButton = document.querySelector('.btn-red');
    if (backButton) {
        backButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        });
        
        backButton.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    }
});