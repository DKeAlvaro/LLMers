// Add typing effect to hero text
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero h2');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Show carousel after typing is complete with a 1 second delay
            setTimeout(showCarousel, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Add typing effect to lesson title and progressive appearance
function addLessonTypingEffect() {
    const lessonTitle = document.querySelector('.demo h3');
    const lessonSubtitle = document.querySelector('.lesson-subtitle');
    const startBtn = document.querySelector('.start-lesson-btn');
    
    if (!lessonTitle) return;
    
    const text = lessonTitle.textContent;
    lessonTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            lessonTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Show subtitle after title typing is complete
            setTimeout(() => {
                lessonSubtitle.style.transition = 'opacity 0.5s ease';
                lessonSubtitle.style.opacity = '1';
                
                // Show start button after subtitle appears
                setTimeout(() => {
                    startBtn.style.transition = 'opacity 0.5s ease';
                    startBtn.style.opacity = '1';
                }, 1000);
            }, 500);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Function to start the lesson demo
function startLessonDemo() {
    const lessonIntro = document.querySelector('.lesson-intro');
    const lessonDemo = document.querySelector('.lesson-demo');
    
    // Hide the intro section
    lessonIntro.style.transition = 'opacity 0.5s ease';
    lessonIntro.style.opacity = '0';
    
    setTimeout(() => {
        lessonIntro.style.display = 'none';
        lessonDemo.style.display = 'block';
        lessonDemo.style.opacity = '0';
        
        // Show the lesson demo
        setTimeout(() => {
            lessonDemo.style.transition = 'opacity 0.5s ease';
            lessonDemo.style.opacity = '1';
        }, 100);
    }, 500);
}

// Function to go to home page
function goToHome() {
    window.location.href = 'index.html';
}

// Function to start the lesson
function startLesson() {
    window.location.href = 'lesson.html';
}

// Show arrow button with delay after page load
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero text if on main page
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
        addTypingEffect();
    }
    
    const arrowBtn = document.querySelector('.arrow-btn');
    const heroParagraph = document.querySelector('.hero p');
    
    if (arrowBtn) {
        arrowBtn.style.opacity = '0';
        arrowBtn.style.transform = 'translateY(-2px)';
    }
    
    if (heroParagraph) {
        heroParagraph.style.opacity = '0';
        heroParagraph.style.transform = 'translateY(10px)';
    }
    
    // Show arrow and paragraph at the same time after typing is complete (estimated 3 seconds)
    setTimeout(() => {
        if (arrowBtn) {
            arrowBtn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            arrowBtn.style.opacity = '1';
            arrowBtn.style.transform = 'translateY(0)';
        }
        
        if (heroParagraph) {
            heroParagraph.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            heroParagraph.style.opacity = '1';
            heroParagraph.style.transform = 'translateY(0)';
        }
    }, 3000);
});

// Lesson demo functionality
class LessonDemo {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.conversationStarted = false;
        this.messageCount = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateNavigation();
    }

    bindEvents() {
        // Navigation buttons
        document.getElementById('next-btn').addEventListener('click', () => this.nextStep());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevStep());
        
        // Conversation input
        document.getElementById('send-btn').addEventListener('click', () => this.sendMessage());
        document.getElementById('user-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            // Hide current step
            document.getElementById(`step-${this.currentStep}`).classList.remove('active');
            
            this.currentStep++;
            
            // Show next step
            document.getElementById(`step-${this.currentStep}`).classList.add('active');
            
            // Special handling for different steps
            this.handleStepTransition();
            
            this.updateNavigation();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            // Hide current step
            document.getElementById(`step-${this.currentStep}`).classList.remove('active');
            
            this.currentStep--;
            
            // Show previous step
            document.getElementById(`step-${this.currentStep}`).classList.add('active');
            
            this.updateNavigation();
        }
    }

    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            // Hide current step
            document.getElementById(`step-${this.currentStep}`).classList.remove('active');
            
            this.currentStep = stepNumber;
            
            // Show target step
            document.getElementById(`step-${this.currentStep}`).classList.add('active');
            
            // Special handling for different steps
            this.handleStepTransition();
            
            this.updateNavigation();
        }
    }

    handleStepTransition() {
        switch(this.currentStep) {
            case 3:
                // Enable conversation input when reaching step 3
                setTimeout(() => {
                    document.getElementById('user-input').disabled = false;
                    document.getElementById('send-btn').disabled = false;
                    document.getElementById('user-input').focus();
                }, 500);
                break;
            case 4:
                // Animate progress bar when reaching step 4
                setTimeout(() => {
                    this.animateProgress();
                }, 500);
                break;
        }
    }

    sendMessage() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        const chatContainer = document.getElementById('chat-container');
        
        if (message) {
            // Determine the correct message based on conversation step
            let correctMessage;
            if (this.messageCount === 0) {
                correctMessage = "Un café, por favor";
            } else if (this.messageCount === 1) {
                correctMessage = "¿Cuánto cuesta?";
            } else if (this.messageCount === 2) {
                correctMessage = "Gracias";
            } else {
                correctMessage = message; // Use original message for any additional messages
            }
            
            // Create and add user message with correct text
            const userMessage = this.createMessage(correctMessage, 'user');
            chatContainer.appendChild(userMessage);
            
            // Clear input
            input.value = '';
            
            // Scroll to bottom
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Generate AI response after a delay
            setTimeout(() => {
                const aiResponse = this.generateAIResponse(correctMessage);
                const aiMessage = this.createMessage(aiResponse, 'ai');
                chatContainer.appendChild(aiMessage);
                
                // Scroll to bottom
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
                // Keep input focused for next message
                input.focus();
            }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
        }
    }

    createMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${text}</p>
                </div>
                <div class="avatar">You</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="avatar">
                    <img src="image.png" alt="AI" class="avatar-image">
                </div>
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        }
        
        return messageDiv;
    }

    generateAIResponse(userMessage) {
        this.messageCount++;
        
        // Coffee ordering conversation responses
        if (this.messageCount === 1) {
            return "¡Perfecto! Here's your coffee. <em>Now ask how much it costs!</em>";
        } else if (this.messageCount === 2) {
             return "Son dos euros. <em>Now say thank you!</em>";
        } else if (this.messageCount === 3) {
             // After "De nada", automatically go to progress step
             setTimeout(() => {
                 this.goToStep(4);
             }, 2000);
             return "¡De nada! You did great!";
         } else {
             return "¡Fantástico!";
         }
    }

    animateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        
        let progress = 0;
        const targetProgress = 100;
        const duration = 2000; // 2 seconds
        const increment = targetProgress / (duration / 50);
        
        const timer = setInterval(() => {
            progress += increment;
            if (progress >= targetProgress) {
                progress = targetProgress;
                clearInterval(timer);
            }
            
            progressFill.style.width = `${progress}%`;
            progressPercent.textContent = `${Math.round(progress)}%`;
        }, 50);
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // Update previous button
        prevBtn.disabled = this.currentStep === 1;
        
        // Update next button
        if (this.currentStep === this.totalSteps) {
            nextBtn.textContent = 'Start Learning!';
            nextBtn.onclick = () => this.startLearning();
        } else {
            nextBtn.textContent = 'Next';
            nextBtn.disabled = false;
        }
    }

    startLearning() {
        // Redirect to countdown page
        window.location.href = 'countdown.html';
    }
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lesson demo only if on lesson page
    const lessonDemo = document.querySelector('.lesson-demo');
    if (lessonDemo) {
        const demo = new LessonDemo();
        
        // Add lesson typing effect for lesson page
        addLessonTypingEffect();
    }
    
    // Initialize countdown timer if on countdown page
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
        initCountdown();
        initEmailSignup();
    }
    
    // Add Enter key support for chat input
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !userInput.disabled) {
                lessonDemo.sendMessage();
            }
        });
    }
});

// Carousel functionality
let currentSlideIndex = 1;
let carouselInterval;

function showCarousel() {
    const carousel = document.getElementById('screenshots-carousel');
    if (carousel) {
        carousel.classList.add('show');
        
        // Initialize slide positions immediately
        showSlide(currentSlideIndex);
        
        // Add click event listeners to slides
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                currentSlide(index + 1);
            });
        });
        
        // Add touch/swipe support for mobile
        addTouchSupport();
        
        startCarouselAutoplay();
    }
}

function addTouchSupport() {
    const carousel = document.querySelector('.carousel-track');
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                previousSlide();
            }
        }
    });
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
    pauseAndResumeAutoplay();
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { currentSlideIndex = 1; }
    if (n < 1) { currentSlideIndex = slides.length; }
    
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Position slides dynamically based on current active slide
    slides.forEach((slide, index) => {
        const slideNumber = index + 1;
        let position = slideNumber - currentSlideIndex;
        
        // Handle circular positioning
        if (position > 1) position -= slides.length;
        if (position < -1) position += slides.length;
        
        // Calculate responsive spacing based on screen size
        const slideWidth = slide.offsetWidth;
        const spacing = slideWidth + 40; // Add 40px gap between slides
        
        // Apply transforms based on position
        if (position === 0) {
            // Center slide (active)
            slide.style.transform = 'translate(-50%, -50%) translateX(0) scale(1)';
            slide.style.opacity = '1';
            slide.style.zIndex = '3';
        } else if (position === -1) {
            // Left slide
            slide.style.transform = `translate(-50%, -50%) translateX(-${spacing}px) scale(0.8)`;
            slide.style.opacity = '0.6';
            slide.style.zIndex = '1';
        } else if (position === 1) {
            // Right slide
            slide.style.transform = `translate(-50%, -50%) translateX(${spacing}px) scale(0.8)`;
            slide.style.opacity = '0.6';
            slide.style.zIndex = '1';
        } else {
            // Hidden slides
            slide.style.transform = `translate(-50%, -50%) translateX(${position * spacing}px) scale(0.6)`;
            slide.style.opacity = '0.3';
            slide.style.zIndex = '0';
        }
    });
    
    // Add active class to current slide and dot
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}



function nextSlide() {
    showSlide(currentSlideIndex += 1);
    pauseAndResumeAutoplay();
}

function previousSlide() {
    showSlide(currentSlideIndex -= 1);
    pauseAndResumeAutoplay();
}

function pauseAndResumeAutoplay() {
    // Pause autoplay when user manually navigates
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    // Resume autoplay after 6 seconds of inactivity
    setTimeout(() => {
        startCarouselAutoplay();
    }, 2000);
}

function startCarouselAutoplay() {
    // Clear any existing interval first
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    
    carouselInterval = setInterval(() => {
        // Only advance if carousel is visible and not in transition
        const carousel = document.querySelector('.carousel-container');
        if (carousel && carousel.classList.contains('show')) {
            nextSlide();
        }
    }, 2000); // Change slide every 6 seconds for slower sliding
}

// Countdown Timer Functionality
function initCountdown() {
    // Set the launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 29);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate.getTime() - now;
        
        if (distance < 0) {
            // If countdown is over
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Email Signup Functionality
function initEmailSignup() {
    const form = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            // Simple email validation
            if (email && email.includes('@')) {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // In a real application, you would send this to your backend
                console.log('Email signup:', email);
            }
        });
    }
}