// Image and Icon Preload

function preload(image) {
    let index = preloadedImages.length
    preloadedImages[index] = new Image();
    preloadedImages[index].src = image;
}

// Interactive Name

let name = document.querySelector('.name')
let descriptionVisible = false

if (name) {
    name.onclick = function() {
        if (!descriptionVisible) name.textContent = "(In Igbo, \"God's Will\")"
            else name.textContent = "I'm Izuchukwu—"
        descriptionVisible = !descriptionVisible
    }
}

// Phone Or Tablet Media Querying

let phoneAndTabletQuery = window.matchMedia("(max-width: 768px)")
function phoneAndTabletQueryListener(mediaQuery) { window.isPhoneOrTablet = mediaQuery.matches }
phoneAndTabletQuery.addListener(phoneAndTabletQueryListener)
phoneAndTabletQueryListener(phoneAndTabletQuery)

// Dark Mode

let actions = document.querySelector('.container-actions')

let moon = document.querySelector('.action-moon')
let moonIcon = document.querySelector('.action-moon-icon')

let click = document.querySelector('.action-click')
let clickIcon = document.querySelector('.action-click-icon')

let twitterIcon = document.querySelector('.footer-twitter-icon')
let instagramIcon = document.querySelector('.footer-instagram-icon')

let schemeIsDark = false

moon.onclick = function(mouse) {
    if (schemeIsDark){
        // To Light
        schemeIsDark = false;
        document.body.removeAttribute('scheme')
        localStorage.setItem('scheme', 'light')
    } else {
        // To Dark
        schemeIsDark = true;
        document.body.setAttribute('scheme', 'dark')
        localStorage.setItem('scheme', 'dark')
    }

    if (mouse) {
        click.style.top = `${mouse.clientY + 20}px`
        click.style.left = `${mouse.clientX - 20}px`
        click.style.opacity = 1.0

        actions.removeChild(click)
        actions.appendChild(click)

        click.style.animation = '0.75s ease 0s 1 forwards click'
    }
}

window.preloadedImages = []

if (localStorage.getItem('scheme') === 'dark') {
    moon.onclick()
} else {
    // Icon Action Preload
    preload("assets/moon-dark.svg")
    preload("assets/click-dark.svg")
    preload("assets/twitter-dark.svg")
    preload("assets/instagram-dark.svg")
}

// Title Hover States & Preview on Hover

let content = document.querySelector(".container-content")
let pages = document.querySelectorAll(".content-page")
let preview = document.querySelector(".content-preview")

pages.forEach(function(page) {
    page.onmousemove = function(mouse) {
        let x = mouse.clientX - preview.offsetLeft
        let y = mouse.clientY - preview.offsetTop

        let transform = ''
        if (window.innerHeight - page.getBoundingClientRect().top < 250) {
            transform += 'translateY(-100%) translateY(-10px) translateX(5px)'
        } else {
            transform += 'translate(15px, 25px)'
        }

        preview.style.transform = `${transform} translate(${x}px, ${y}px)`
    }

    page.onmouseover = function() {
        pages.forEach(function(siblingPage) {
            if (page !== siblingPage) {
                siblingPage.classList.add('content-page-unfocused')
            }
        })
        preview.style.visibility = 'visible'
        preview.style.backgroundImage = `url(./assets/${page.getAttribute('preview')})`
    }

    page.onmouseout = function() {
        pages.forEach(function(siblingPage) {
            if (page !== siblingPage) {
                siblingPage.classList.remove('content-page-unfocused')
            }
        })
        preview.style.backgroundImage = ''
        preview.style.visibility = 'hidden'
    }
})

// Title & Footer Scroll Animation

let title = document.querySelector(".container-title")
let footer = document.querySelector(".container-footer")

let opacity = function(scrollDistanceToEdge) {
    return 1 - ((scrollDistanceToEdge - (0.05 * window.innerHeight)) / (0.08 * window.innerHeight))
}

let setContainerEnabledForOpacity = function(container, opacity) {
    if (opacity > 0.0) container.classList.remove('container-disabled')
        else container.classList.add('container-disabled')
}

window.onscroll = function() {
    let scrollTop = document.documentElement.scrollTop
    let headerOpacity = limit(opacity(scrollTop), 0.0, 1.0)
    let scrollBottom = document.documentElement.scrollHeight - scrollTop - window.innerHeight
    let footerOpacity = limit(opacity(scrollBottom), 0.0, 1.0)

    title.style.opacity = headerOpacity
    setContainerEnabledForOpacity(title, headerOpacity)

    actions.style.opacity = window.isPhoneOrTablet ? headerOpacity : 1.0;
    setContainerEnabledForOpacity(actions, headerOpacity)

    footer.style.opacity = footerOpacity
    setContainerEnabledForOpacity(footer, footerOpacity)
}

function limit(value, min, max) { return Math.min(Math.max(value, min), max) }
