// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Handle CTA button click
document.querySelector('.cta-button').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for reaching out! We will contact you soon.');
        this.reset();
    });
}

// Handle newsletter submission
const newsletter = document.querySelector('.newsletter');
if (newsletter) {
    newsletter.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing!');
        this.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .feature, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active class to navbar links on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.style.color = 'var(--accent-color)';
            }
        }
    });
});

const searchDatabase = [
    // ===== SERVICES =====
    {
        id: 1,
        title: 'Interior Design',
        category: 'Service',
        description: 'Stunning interior designs that blend aesthetics with functionality',
        icon: 'fas fa-paint-roller',
        link: '#services'
    },
    {
        id: 2,
        title: 'Construction',
        category: 'Service',
        description: 'Expert construction services with precision engineering',
        icon: 'fas fa-hammer',
        link: '#services'
    },
    {
        id: 3,
        title: 'Kitchen Design',
        category: 'Service',
        description: 'Modern kitchen solutions combining style and practicality',
        icon: 'fas fa-kitchen',
        link: '#services'
    },
    {
        id: 4,
        title: 'Bathroom Renovation',
        category: 'Service',
        description: 'Luxurious bathroom spaces with premium fixtures',
        icon: 'fas fa-bathtub',
        link: '#services'
    },
    {
        id: 5,
        title: 'Space Planning',
        category: 'Service',
        description: 'Efficient space utilization and layout optimization',
        icon: 'fas fa-sofa',
        link: '#services'
    },
    {
        id: 6,
        title: 'Lighting Solutions',
        category: 'Service',
        description: 'Professional lighting design that transforms ambiance',
        icon: 'fas fa-lightbulb',
        link: '#services'
    },

    // ===== BLOG POSTS =====
    {
        id: 7,
        title: '5 Interior Design Trends for 2026',
        category: 'Blog',
        description: 'Discover the hottest interior design trends',
        icon: 'fas fa-newspaper',
        link: '#blog'
    },
    {
        id: 8,
        title: 'Transform Your Kitchen on Any Budget',
        category: 'Blog',
        description: 'A beautiful kitchen doesn\'t have to break the bank',
        icon: 'fas fa-newspaper',
        link: '#blog'
    },
    {
        id: 9,
        title: 'Creating Your Spa-Like Bathroom Oasis',
        category: 'Blog',
        description: 'Turn your bathroom into a luxurious retreat',
        icon: 'fas fa-newspaper',
        link: '#blog'
    },
    {
        id: 10,
        title: 'Maximizing Small Spaces: Smart Solutions',
        category: 'Blog',
        description: 'Make the most of your small apartment',
        icon: 'fas fa-newspaper',
        link: '#blog'
    },
    {
        id: 11,
        title: 'The Art of Perfect Lighting Design',
        category: 'Blog',
        description: 'Proper lighting can transform any space',
        icon: 'fas fa-newspaper',
        link: '#blog'
    },
    {
        id: 12,
        title: 'Eco-Friendly Interior Design Choices',
        category: 'Blog',
        description: 'Build a beautiful home while protecting environment',
        icon: 'fas fa-newspaper',
        link: '#blog'
    },

    // ===== PORTFOLIO PROJECTS =====
    {
        id: 13,
        title: 'Luxury Penthouse',
        category: 'Portfolio',
        description: 'Modern luxury apartment with panoramic views',
        icon: 'fas fa-image',
        link: '#portfolio'
    },
    {
        id: 14,
        title: 'Contemporary Villa',
        category: 'Portfolio',
        description: 'Stunning villa with integrated indoor-outdoor spaces',
        icon: 'fas fa-image',
        link: '#portfolio'
    },
    {
        id: 15,
        title: 'Corporate Office',
        category: 'Portfolio',
        description: 'Modern office space designed for productivity',
        icon: 'fas fa-image',
        link: '#portfolio'
    },
    {
        id: 16,
        title: 'Boutique Hotel',
        category: 'Portfolio',
        description: 'Luxurious hotel interiors with unique design',
        icon: 'fas fa-image',
        link: '#portfolio'
    },
    {
        id: 17,
        title: 'Residential Complex',
        category: 'Portfolio',
        description: 'Multi-unit residential development',
        icon: 'fas fa-image',
        link: '#portfolio'
    },
    {
        id: 18,
        title: 'Retail Store',
        category: 'Portfolio',
        description: 'Elegant retail space designed for customers',
        icon: 'fas fa-image',
        link: '#portfolio'
    }
];

// STEP 2: Get the HTML elements we need
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const filterBtns = document.querySelectorAll('.filter-btn');

// Track which filter is selected
let currentFilter = 'all';

// STEP 3: Function to search
// This function searches through the database

function performSearch(query) {
    // Remove extra spaces and make lowercase
    query = query.trim().toLowerCase();

    // If nothing typed, hide results
    if (query.length === 0) {
        searchResults.classList.remove('active');
        return;
    }

    // Search through the database
    let results = searchDatabase.filter(item => {
        // Check if search term matches title, description, or category
        const matchesQuery = 
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);
        
        // Check if category matches selected filter
        const matchesFilter = 
            currentFilter === 'all' || 
            item.category.toLowerCase() === currentFilter;
        
        // Return true if matches both search AND filter
        return matchesQuery && matchesFilter;
    });

    // Show the results
    displaySearchResults(results, query);
}

// STEP 4: Function to display results

function displaySearchResults(results, query) {
    // Clear old results
    searchResults.innerHTML = '';

    // If no results found
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-results-empty">
                <i class="fas fa-search" style="font-size: 2rem; color: #ddd; margin-bottom: 1rem;"></i>
                <p>No results found for "<strong>${query}</strong>"</p>
                <p style="font-size: 0.9rem; color: #ccc; margin-top: 0.5rem;">Try different keywords</p>
            </div>
        `;
        searchResults.classList.add('active');
        return;
    }

    // Group results by category
    const groupedResults = groupResultsByCategory(results);

    // Show results grouped by category
    let resultsHTML = '';

    for (const [category, items] of Object.entries(groupedResults)) {
        // Category header
        resultsHTML += `
            <div class="search-category-header" style="
                padding: 0.8rem 1rem;
                background: var(--light-bg);
                font-weight: bold;
                color: var(--primary-color);
                border-top: 1px solid #eee;
            ">
                ${category}
            </div>
        `;

        // Each item in this category
        items.forEach(item => {
            resultsHTML += `
                <div class="search-result-item" onclick="handleResultClick('${item.link}')">
                    <div class="search-result-icon">
                        <i class="${item.icon}"></i>
                    </div>
                    <div class="search-result-content">
                        <div class="search-result-title">${highlightQuery(item.title, query)}</div>
                        <div class="search-result-category">${item.category}</div>
                        <div class="search-result-description">${highlightQuery(item.description, query)}</div>
                    </div>
                </div>
            `;
        });
    }

    searchResults.innerHTML = resultsHTML;
    searchResults.classList.add('active');
}

// STEP 5: Group results by category
// This organizes results by Service, Blog, Portfolio

function groupResultsByCategory(results) {
    return results.reduce((groups, item) => {
        if (!groups[item.category]) {
            groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
    }, {});
}

// STEP 6: Highlight matching text

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

// STEP 7: Handle clicking on a result

function handleResultClick(link) {
    // Navigate to section
    window.location.href = link;

    // Clear search
    searchInput.value = '';
    searchResults.classList.remove('active');

    // Scroll to section smoothly
    const target = document.querySelector(link);
    if (target) {
        setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// STEP 8: Add event listeners (make things interactive)

// When you type in the search box
searchInput.addEventListener('input', function(e) {
    performSearch(e.target.value);
});

// When you click the search button
searchBtn.addEventListener('click', function() {
    performSearch(searchInput.value);
});

// When you press Enter key
searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch(e.target.value);
    }
});

// STEP 9: Filter button clicks

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Get which filter was clicked
        currentFilter = this.getAttribute('data-filter');
        
        // Update visual appearance (highlight active button)
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Re-search with new filter
        performSearch(searchInput.value);
    });
});

// STEP 10: Close results when clicking outside

document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-container')) {
        searchResults.classList.remove('active');
    }
});

// STEP 11: Close with Escape key

searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        searchInput.value = '';
        searchResults.classList.remove('active');
    }
});