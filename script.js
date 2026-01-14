// script.js - Client website only (no admin features)

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Set minimum date for appointment booking to tomorrow
function initDatePicker() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    
    // Set for all date inputs
    document.querySelectorAll('input[type="date"]').forEach(dateInput => {
        dateInput.min = minDate;
        
        // Set default date to tomorrow if not already set
        if (!dateInput.value) {
            dateInput.value = minDate;
        }
    });
}

// Form submission handlers
function initBookingForms() {
    // Main booking form handler (booking page)
    const mainBookingForm = document.getElementById('mainBookingForm');
    if (mainBookingForm) {
        mainBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('mainName').value;
            const email = document.getElementById('mainEmail').value;
            const phone = document.getElementById('mainPhone').value;
            const service = document.getElementById('mainService').options[document.getElementById('mainService').selectedIndex].text;
            const date = document.getElementById('mainDate').value;
            const time = document.getElementById('mainTime').value;
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Prepare WhatsApp message
            const whatsappMessage = `Hello! I'd like to book a dental appointment at Nivali Dental Clinic.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0ADate: ${formattedDate}%0ATime: ${time}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/254117702463?text=${whatsappMessage}`, '_blank');
            
            // Show confirmation message
            showAlert('Redirecting to WhatsApp to confirm your appointment...', 'success');
            
            // Reset form
            mainBookingForm.reset();
            initDatePicker(); // Reset date to tomorrow
        });
    }
    
    // Homepage booking form handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Prepare WhatsApp message
            const whatsappMessage = `Hello! I'd like to book a dental appointment at Nivali Dental Clinic.%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ADate: ${formattedDate}%0ATime: ${time}`;
            
            // Open WhatsApp with pre-filled message
            window.open(`https://wa.me/254117702463?text=${whatsappMessage}`, '_blank');
            
            // Show confirmation message
            showAlert('Redirecting to WhatsApp to confirm your appointment...', 'success');
            
            // Reset form
            bookingForm.reset();
            initDatePicker(); // Reset date to tomorrow
        });
    }
}

// Alert message function
function showAlert(message, type) {
    // Create alert div if it doesn't exist
    let alertDiv = document.getElementById('alertMessage');
    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.id = 'alertMessage';
        alertDiv.className = `alert alert-${type}`;
        
        // Insert at the beginning of the form
        const form = document.querySelector('form');
        if (form) {
            form.insertBefore(alertDiv, form.firstChild);
        }
    }
    
    alertDiv.textContent = message;
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.display = 'block';
    
    setTimeout(() => {
        alertDiv.style.display = 'none';
    }, 5000);
}

// Load staff from localStorage for dentists page
function loadStaffForPublic() {
    const dentistsGrid = document.getElementById('dentistsGrid');
    if (!dentistsGrid) return;
    
    // Try to load staff from localStorage (set by admin)
    const savedStaff = localStorage.getItem('nivaliStaff');
    const staff = savedStaff ? JSON.parse(savedStaff) : [];
    
    if (staff.length > 0) {
        dentistsGrid.innerHTML = '';
        staff.forEach(member => {
            const dentistCard = createDentistCard(member);
            dentistsGrid.appendChild(dentistCard);
        });
    } else {
        // Show default message
        dentistsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-users" style="font-size: 60px; color: var(--gray); margin-bottom: 20px;"></i>
                <h3>Our Dental Team</h3>
                <p>Our team of experienced dental professionals is dedicated to providing exceptional care.</p>
                <p style="margin-top: 10px; color: var(--gray);">Check back soon to meet our team!</p>
            </div>
        `;
    }
}

function createDentistCard(member) {
    const dentistCard = document.createElement('div');
    dentistCard.className = 'dentist-card';
    
    const colors = [
        { light: '#e8f0fe', dark: '#1a73e8' },
        { light: '#e8f5e9', dark: '#0a9d7d' },
        { light: '#fff3e0', dark: '#ff9800' },
        { light: '#f3e5f5', dark: '#9c27b0' },
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    dentistCard.innerHTML = `
        <div class="dentist-img" style="background-color: ${randomColor.light};">
            <i class="fas fa-user-md" style="color: ${randomColor.dark};"></i>
        </div>
        <div class="dentist-info">
            <h3>${member.name}</h3>
            <p style="color: var(--primary); font-weight: 600;">${member.position}</p>
            <p style="margin: 10px 0; font-size: 14px;">${member.bio}</p>
            <div style="margin-top: 15px;">
                ${member.specialties.map(specialty => 
                    `<span style="background-color: var(--primary-light); color: var(--primary); padding: 5px 10px; border-radius: 20px; font-size: 12px; display: inline-block; margin: 2px;">${specialty}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return dentistCard;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDatePicker();
    initBookingForms();
    
    // Set active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Also for mobile menu
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Update year to 2026 in copyright
    document.querySelectorAll('.current-year').forEach(element => {
        element.textContent = '2026';
    });
    
    // Load staff for dentists page
    if (document.getElementById('dentistsGrid')) {
        loadStaffForPublic();
    }
});