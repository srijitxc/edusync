// EduSync - Student Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Initialize tabs
  var studentTabs = document.getElementById('studentTabs');
  if (studentTabs) {
    var tabNavs = studentTabs.querySelectorAll('button[data-bs-toggle="tab"]');
    tabNavs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // Animate content when switching tabs
        const targetId = this.getAttribute('data-bs-target').substring(1);
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('fade-in');
          setTimeout(() => {
            targetPane.classList.remove('fade-in');
          }, 500);
        }
      });
    });
  }

  // Note filtering
  const notesFilter = document.querySelector('.notes-filter select');
  if (notesFilter) {
    notesFilter.addEventListener('change', function() {
      const selectedValue = this.value;
      const noteItems = document.querySelectorAll('.notes-list .list-group-item');
      
      noteItems.forEach(function(item) {
        if (selectedValue === 'all') {
          item.style.display = 'block';
        } else {
          const courseTag = item.querySelector('small span').textContent.toLowerCase();
          if (selectedValue === 'cs-201' && courseTag.includes('data structures')) {
            item.style.display = 'block';
          } else if (selectedValue === 'mth-301' && courseTag.includes('linear algebra')) {
            item.style.display = 'block';
          } else if (selectedValue === 'eng-202' && courseTag.includes('technical writing')) {
            item.style.display = 'block';
          } else if (selectedValue === 'ee-205' && courseTag.includes('digital electronics')) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  }

  // Attendance filtering
  const attendanceCourseFilter = document.querySelector('.attendance-filter select:first-child');
  const attendanceTimeFilter = document.querySelector('.attendance-filter select:last-child');
  
  if (attendanceCourseFilter && attendanceTimeFilter) {
    const filterAttendance = function() {
      const selectedCourse = attendanceCourseFilter.value;
      const selectedTime = attendanceTimeFilter.value;
      const attendanceRows = document.querySelectorAll('.attendance-table tbody tr');
      
      // Update stats based on filters
      updateAttendanceStats(selectedCourse, selectedTime);
      
      // Show/hide rows based on filters
      attendanceRows.forEach(function(row) {
        const courseCell = row.querySelector('td:nth-child(2) span').textContent.toLowerCase();
        
        let showRow = true;
        
        // Filter by course
        if (selectedCourse !== 'all') {
          if (selectedCourse === 'cs-201' && !courseCell.includes('data structures')) {
            showRow = false;
          } else if (selectedCourse === 'mth-301' && !courseCell.includes('linear algebra')) {
            showRow = false;
          } else if (selectedCourse === 'eng-202' && !courseCell.includes('technical writing')) {
            showRow = false;
          } else if (selectedCourse === 'ee-205' && !courseCell.includes('digital electronics')) {
            showRow = false;
          }
        }
        
        // Apply date filter logic here if needed
        // For now, we're just simulating this
        
        row.style.display = showRow ? '' : 'none';
      });
    };
    
    attendanceCourseFilter.addEventListener('change', filterAttendance);
    attendanceTimeFilter.addEventListener('change', filterAttendance);
  }

  // Function to update attendance stats
  function updateAttendanceStats(course, time) {
    // This would typically fetch data from the server based on filters
    // For demo purposes, we'll just update with some fixed values
    
    let totalClasses, present, absent, percentage;
    
    if (course === 'all') {
      totalClasses = 46;
      present = 42;
      absent = 4;
      percentage = 91;
    } else if (course === 'cs-201') {
      totalClasses = 15;
      present = 14;
      absent = 1;
      percentage = 93;
    } else if (course === 'mth-301') {
      totalClasses = 12;
      present = 11;
      absent = 1;
      percentage = 92;
    } else if (course === 'eng-202') {
      totalClasses = 10;
      present = 9;
      absent = 1;
      percentage = 90;
    } else if (course === 'ee-205') {
      totalClasses = 9;
      present = 8;
      absent = 1;
      percentage = 89;
    }
    
    // Update the DOM
    document.querySelector('.attendance-overview .attendance-stat:nth-child(1) h2').textContent = totalClasses;
    document.querySelector('.attendance-overview .attendance-stat:nth-child(2) h2').textContent = present;
    document.querySelector('.attendance-overview .attendance-stat:nth-child(3) h2').textContent = absent;
    document.querySelector('.attendance-overview .attendance-stat:nth-child(4) h2').textContent = percentage + '%';
  }

  // "Load More" buttons functionality
  const loadMoreButtons = document.querySelectorAll('button.btn-outline-secondary');
  loadMoreButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Simulate loading with a spinner
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...';
      this.disabled = true;
      
      // Simulate delay and then restore button
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
        
        // Show a message that no more items are available
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-primary border-0 position-fixed bottom-0 end-0 m-3';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
              No more items to load.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        `;
        document.body.appendChild(toast);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove toast after it's hidden
        toast.addEventListener('hidden.bs.toast', function () {
          document.body.removeChild(toast);
        });
      }, 1000);
    });
  });

  // Add fade-in animation class
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in {
        animation: fadeIn 0.5s ease forwards;
      }
    </style>
  `);

  // Real-time clock and date for the dashboard (optional)
  function updateClock() {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    
    // If you want to add a clock to your dashboard, uncomment this and add a div with id="dashboard-clock"
    // const clockElement = document.getElementById('dashboard-clock');
    // if (clockElement) {
    //   clockElement.textContent = dateTimeString;
    // }
  }
  
  // Update the clock immediately and then every minute
  updateClock();
  setInterval(updateClock, 60000);

  // Initialize any accordion elements
  var accordionElements = document.querySelectorAll('.accordion');
  accordionElements.forEach(function(accordion) {
    // Set first item as active if none are active
    const activeItems = accordion.querySelectorAll('.accordion-collapse.show');
    if (activeItems.length === 0) {
      const firstButton = accordion.querySelector('.accordion-button');
      const firstCollapse = accordion.querySelector('.accordion-collapse');
      if (firstButton && !firstButton.classList.contains('collapsed')) {
        firstButton.classList.remove('collapsed');
      }
      if (firstCollapse) {
        firstCollapse.classList.add('show');
      }
    }
  });

  // Simulate notifications functionality
  const notificationBell = document.querySelector('a.nav-link i.fa-bell');
  if (notificationBell) {
    const parent = notificationBell.parentElement;
    
    // Create notification badge
    const badge = document.createElement('span');
    badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
    badge.style.fontSize = '0.6rem';
    badge.style.marginTop = '-5px';
    badge.style.marginLeft = '-10px';
    badge.textContent = '3';
    parent.style.position = 'relative';
    parent.appendChild(badge);
    
    // Handle notification click
    parent.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create and show toast notification
      const toast = document.createElement('div');
      toast.className = 'toast align-items-center text-white bg-primary border-0 position-fixed top-0 end-0 m-3';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">
            <strong>Notifications:</strong><br>
            - New assignment posted in Data Structures<br>
            - Grade posted for Linear Algebra Quiz<br>
            - Course schedule updated for next week
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      `;
      document.body.appendChild(toast);
      
      const bsToast = new bootstrap.Toast(toast, { autohide: false });
      bsToast.show();
      
      // Remove badge after viewing notifications
      badge.remove();
      
      // Remove toast when closed
      toast.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toast);
      });
    });
  }

  // Add deadline functionality
  const deadlineList = document.querySelector('.deadline-list');
  if (deadlineList) {
    // Add some sample deadlines (in a real app, these would come from a database)
    const additionalDeadlines = [
      {
        title: "Linear Algebra Problem Set",
        subject: "Linear Algebra",
        subjectClass: "bg-math",
        dueDate: "In 3 days",
        badgeClass: "bg-warning"
      },
      {
        title: "Technical Report Draft",
        subject: "Technical Writing",
        subjectClass: "bg-english",
        dueDate: "In 5 days",
        badgeClass: "bg-info"
      },
      {
        title: "Circuit Design Project",
        subject: "Digital Electronics",
        subjectClass: "bg-physics",
        dueDate: "Next week",
        badgeClass: "bg-secondary"
      }
    ];
    
    // Append the deadlines to the list
    additionalDeadlines.forEach(function(deadline) {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
          <div>
            <h6 class="mb-1">${deadline.title}</h6>
            <small><span class="subject-badge ${deadline.subjectClass}">${deadline.subject}</span></small>
          </div>
          <div class="text-end">
            <span class="badge ${deadline.badgeClass}">${deadline.dueDate}</span>
          </div>
        </div>
      `;
      deadlineList.appendChild(listItem);
    });
  }
});
document.addEventListener('DOMContentLoaded', function () {
    const editProfileBtn = document.getElementById('saveProfileBtn');
    
    editProfileBtn.addEventListener('click', function () {
      const name = document.getElementById('studentName').value;
      const email = document.getElementById('studentEmail').value;
      const phone = document.getElementById('studentPhone').value;
      const advisor = document.getElementById('studentAdvisor').value;
      console.log('Profile Updated:', { name, email, phone, advisor });
      const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
      modal.hide();
    });
  });