// 3D Avatar tilt
const avatar = document.getElementById('avatar');
document.querySelector('.avatar-container').addEventListener('mousemove', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    avatar.style.transform = `rotateY(${x*0.1}deg) rotateX(${-y*0.1}deg)`;
});
document.querySelector('.avatar-container').addEventListener('mouseleave', () => {
    avatar.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// Lazy fade-in sections & avatar
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

const avatarContainer = document.getElementById('avatarContainer');
const avatarObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) avatarContainer.classList.add('visible');
    });
}, { threshold: 0.3 });
avatarObserver.observe(avatarContainer);

/* ===== LINEAR SKILL COUNTING ===== */
const linearBars = document.querySelectorAll('.fill');

const linearObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const target = +bar.dataset.percent;
      const text = bar.querySelector('.percent-text');

      let count = 0;
      bar.style.width = target + "%";

      const interval = setInterval(() => {
        if (count >= target) {
          clearInterval(interval);
          text.textContent = target + "%";
        } else {
          count++;
          text.textContent = count + "%";
        }
      }, 20);

      linearObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

linearBars.forEach(bar => linearObserver.observe(bar));

/* ===== RADIAL SKILL COUNTING ===== */
const radialBars = document.querySelectorAll('.radial-bar');

const radialObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const percent = +bar.dataset.percent;
      const circle = bar.querySelector('.path');
      const text = bar.querySelector('.percentage');

      const circumference = 502;
      const offset = circumference - (circumference * percent) / 100;
      circle.style.strokeDashoffset = offset;

      let count = 0;
      const interval = setInterval(() => {
        if (count >= percent) {
          clearInterval(interval);
          text.textContent = percent + "%";
        } else {
          count++;
          text.textContent = count + "%";
        }
      }, 40);

      radialObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

radialBars.forEach(bar => radialObserver.observe(bar));


// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      projectObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
projectCards.forEach(card => projectObserver.observe(card));

// Hero typing roles
const roles = ["Web Developer", "UIUX Designer", "Data Analyst"];
let roleIndex = 0, charIndex = 0;
const typedRoles = document.getElementById('typedRoles');
function typeRole() {
    if (charIndex < roles[roleIndex].length) {
        typedRoles.textContent += roles[roleIndex][charIndex];
        charIndex++;
        setTimeout(typeRole, 100);
    } else setTimeout(eraseRole, 1500);
}
function eraseRole() {
    if (charIndex > 0) {
        typedRoles.textContent = roles[roleIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(eraseRole, 50);
    } else { roleIndex = (roleIndex+1)%roles.length; setTimeout(typeRole, 500); }
}
typeRole();

// ========================
// Light/Dark Theme Toggle
// ========================
const themeToggleNav = document.getElementById('themeToggleNav');

// Remember theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggleNav.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

themeToggleNav.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    const icon = themeToggleNav.querySelector('i');
    const isDark = document.body.classList.contains('dark');

    // Swap icon
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// ========================
// Mobile Hamburger Toggle
// ========================
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('open'); // optional: animate hamburger to X
});


// ========================
// Close navbar on nav link click (mobile)
// ========================
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        hamburger.classList.remove('open');
    });
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});
        if(window.innerWidth <= 768) navbar.classList.remove('active');
    });
});

// code fragment
// the form id is myForm
$('#myForm').on('submit', function(event) {
    event.preventDefault(); // prevent reloading the page
    
    var data = {
    service_id: 'service_x315brt',
    template_id: 'template_0td9waq',
    user_id: 'pS_G9TIXuQ92waxm_',
    template_params: {
        'from_name': $('#from_name').val(),
        'from_email': $('#from_email').val(),
        'message': $('#message').val(),
        'subject': $('#subject').val(),
    }
    };
 
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    }).done(function() {
  // Show popup
  const popup = document.getElementById("popup-overlay");
  popup.classList.add("active");

  // Reset form
  $('#myForm').get(0).reset();

  // Hide popup after 4 seconds
  setTimeout(() => {
    popup.classList.remove("active");
  }, 4000);
})


})



document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_x315brt", "template_0td9waq", this)
  .then(() => {

    emailjs.send("service_x315brt", "template_e755gfw", {
      reply_to: this.from_email.value,
      to_name: this.from_name.value,
    })
    .then(() => console.log("Auto reply sent"))
    .catch(err => console.log("Auto reply failed", err));

  })
  .catch((error) => {
    console.log("FAILED...", error);
  });

});
