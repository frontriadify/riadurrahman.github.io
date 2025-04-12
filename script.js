// Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    try {
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.getElementById('formSuccess').style.display = 'none';

        // Validate inputs
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || name.length < 2) {
            document.getElementById('nameError').textContent = 'Please enter a valid name (min 2 characters)';
            isValid = false;
        }

        if (email === '') {
            document.getElementById('emailError').textContent = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }

        if (message === '' || message.length < 10) {
            document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (isValid) {
            // Simulate form submission
            const successMessage = document.getElementById('formSuccess');
            successMessage.textContent = 'Your message has been sent successfully!';
            successMessage.style.display = 'block';
            this.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    } catch (error) {
        console.error('Form submission error:', error);
    }
});

// Carousel Initialization
$(document).ready(function(){
    $(".testimonials-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: true,
        dots: true,
        responsive:{
            768:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    $(".projects-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 4000,
        nav: true,
        dots: true,
        responsive:{
            600:{
                items:2
            },
            900:{
                items:3
            }
        }
    });
});

// JavaScript for animations and Web3
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-text, .skills, .project-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Animate skill bars when they are in view
    const animateSkills = function() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            if (barPosition < screenPosition) {
                bar.style.width = bar.parentElement.parentElement.querySelector('.skill-percent').textContent;
            }
        });
    };


    // Initial checks
    animateOnScroll();
    animateSkills();


    // Check on scroll
    window.addEventListener('scroll', () => {
        animateOnScroll();
        animateSkills();
    });

    // Pulse animation for CTA button
    const ctaButton = document.querySelector('.cta-button');
    setInterval(() => {
        ctaButton.style.animation = 'pulse 2s infinite';
    }, 5000);

    // Web3 Wallet Connection
    const connectWallet = document.getElementById('connectWallet');
    const walletInfo = document.getElementById('walletInfo');
    const walletAddress = document.getElementById('walletAddress');

    connectWallet.addEventListener('click', async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();

                // Display truncated wallet address
                walletAddress.textContent = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
                walletInfo.style.display = 'block';
                connectWallet.textContent = 'Wallet Connected';
                connectWallet.style.backgroundColor = '#4CAF50';

            } catch (error) {
                console.error('Wallet connection error:', error); // Log the error
                const errorDisplay = document.getElementById('walletInfo');
                if (errorDisplay) {
                  errorDisplay.style.display = 'block';
                  const addressSpan = document.getElementById('walletAddress');
                  if (addressSpan) {
                    addressSpan.textContent = 'Connection failed';
                  }
                }

                const connectButton = document.getElementById('connectWallet');
                 if (connectButton) {
                     connectButton.textContent = 'Try Again';
                     connectButton.style.backgroundColor = '#ff6b6b';
                 }
            }
        } else {
            alert('Please install MetaMask or another Web3 provider!');
        }
    });
});