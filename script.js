// Super cool particles dancing on page
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/95) * (canvas.width/95)
}

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#e66465';
        ctx.fill();
    }
    // move and draw particle after checking particle and mouse positions
    update() {
        //check if particle is still inside canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        //check if particles have collided
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 5;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 5;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 5;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 5;
            }
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
        }
        // move particle
        this.x += 0.3 * this.directionX;
        this.y += 0.3 * this.directionY;
        // draw particle
        this.draw();
    }
}

function populate() {
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#e66465';

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
    }
    connect();
}

function connect() {
    let opacity = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
            + ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacity = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(145, 152, 229,' + opacity + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//Window resize
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/95) * (canvas.width/95));
        populate();
    }
)

window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

populate();
animate();


// Buttons and stuff!
const viewWork = document.getElementById('viewWork');
viewWork.addEventListener('click', function() {
    document.getElementById('projects').scrollIntoView();
})

const toHome = document.getElementById('homeLink');
toHome.addEventListener('click', function() {
    window.scrollTo(0, 0);
})

const toProjects = document.getElementById('projectsLink');
toProjects.addEventListener('click', function() {
    document.getElementById('projects').scrollIntoView();
})

const toAboutMe = document.getElementById('aboutMeLink');
toAboutMe.addEventListener('click', function() {
    document.getElementById('aboutMe').scrollIntoView();
})

const toContactMe = document.getElementById('contactMeLink');
toContactMe.addEventListener('click', function() {
    document.getElementById('contactMe').scrollIntoView();
})

//Nav bar tracking of current section
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav ul li');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    })

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.classList.contains(current)) {
            li.classList.add('active');
        }
        console.log(li.classList);
    })

})