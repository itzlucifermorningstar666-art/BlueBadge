document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const continueBtn = document.getElementById('continue-btn');
    const metaAuthModal = document.getElementById('meta-auth-modal');
    const metaContinueBtn = document.getElementById('meta-continue-btn');
    const securityModal = document.getElementById('security-modal');
    const verifyBtn = document.getElementById('verify-btn');
    const facebookModal = document.getElementById('facebook-modal');
    const notRobotCheckbox = document.getElementById('not-robot');
    const closeBtns = document.querySelectorAll('.close-btn');
    const facebookForm = document.getElementById('facebook-form');
    
    // Make modal draggable
    makeDraggable(document.querySelector('.draggable .modal-content'), document.querySelector('.draggable .modal-header'));
    
    // Event Listeners
    continueBtn.addEventListener('click', function() {
        showModal(metaAuthModal);
    });
    
    metaContinueBtn.addEventListener('click', function() {
        hideModal(metaAuthModal, () => {
            showModal(securityModal);
        });
    });
    
    notRobotCheckbox.addEventListener('change', function() {
        verifyBtn.disabled = !this.checked;
    });
    
    verifyBtn.addEventListener('click', function() {
        hideModal(securityModal, () => {
            showModal(facebookModal);
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            hideModal(event.target);
        }
    });
    
    facebookForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate login processing
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Logging in...';
        
        setTimeout(() => {
            hideModal(facebookModal, () => {
                alert('Login successful! You would now be redirected to the event.');
                // Reset form
                facebookForm.reset();
                verifyBtn.disabled = false;
                verifyBtn.textContent = 'Continue';
            });
        }, 1500);
    });
    
    // Google reCAPTCHA callback
    window.onRecaptchaSuccess = function() {
        notRobotCheckbox.checked = true;
        verifyBtn.disabled = false;
    };
    
    // Enhanced modal functions with animations
    function showModal(modal) {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    }
    
    function hideModal(modal, callback) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            if (callback) callback();
        }, 300);
    }
    
    // Draggable modal function
    function makeDraggable(element, header) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        if (header) {
            header.onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Calculate new position with boundaries
            const newTop = element.offsetTop - pos2;
            const newLeft = element.offsetLeft - pos1;
            
            // Keep modal within viewport
            const maxTop = window.innerHeight - element.offsetHeight;
            const maxLeft = window.innerWidth - element.offsetWidth;
            
            element.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
            element.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});