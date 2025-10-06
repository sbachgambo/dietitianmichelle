// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Show form success message
function showFormSuccess() {
    // Create success message if it doesn't exist
    let successMessage = document.querySelector('.form-success');
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <h3>🎉 Thank You!</h3>
            <p>Your booking request has been received. I'll contact you within 24 hours to schedule your appointment.</p>
            <p>In the meantime, feel free to call or WhatsApp me at <strong>07089873497</strong> if you have urgent questions.</p>
        `;
        const formSubmit = document.querySelector('.form-submit');
        if (formSubmit) {
            formSubmit.appendChild(successMessage);
        }
    }
    
    // Show success message
    successMessage.classList.add('active');
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide success message after 10 seconds
    setTimeout(() => {
        successMessage.classList.remove('active');
    }, 10000);
}

// Blog filter functionality
function initializeBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterBtns.length > 0 && blogCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                blogCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Load more articles functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more articles
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // In a real implementation, this would fetch more articles from a server
                alert('More articles would be loaded here. This is a demo implementation.');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1000);
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const blogCards = document.querySelectorAll('.blog-card');
            
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Table of Contents functionality
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    const sections = document.querySelectorAll('.content-section');
    
    if (tocLinks.length > 0 && sections.length > 0) {
        // Add IDs to sections for linking
        sections.forEach((section, index) => {
            if (!section.id) {
                section.id = `section-${index + 1}`;
            }
        });
        
        // Smooth scrolling for TOC links
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Share buttons functionality
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    if (shareButtons.length > 0) {
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.classList[1]; // facebook, twitter, etc.
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                const text = encodeURIComponent("Check out this article from Dietitian Michelle!");
                
                let shareUrl;
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
                        break;
                    default:
                        return;
                }
                
                window.open(shareUrl, '_blank', 'width=600,height=400');
            });
        });
    }
}

// Set active navigation link based on current page
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

// Form submission handling
function initializeForms() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            const formObject = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            showFormSuccess();
            
            // Reset form
            bookingForm.reset();
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with: ${email}\nYou'll receive nutrition tips and updates soon!`);
            this.reset();
        });
    }
}

// Main initialization function - SINGLE DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeForms();
    
    // Initialize blog features if on blog page
    initializeBlogFilters();
    initializeLoadMore();
    initializeSearch();
    
    // Initialize blog post features if on blog post page
    initializeTableOfContents();
    initializeShareButtons();
    
    console.log('Dietitian Michelle website initialized successfully!');
});