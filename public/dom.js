const input = document.getElementById('secret')
const token = document.getElementById('result')
const popup = document.getElementById('popup')
const countdown = document.getElementById('countdown')
const progressCircle = document.querySelector('.progress-circle')

let timer

function startCountdown(initialTimeLeft) {
    clearInterval(timer)
    timeLeft = initialTimeLeft
    updateCircle()
    countdown.textContent = `${timeLeft}s`
    timer = setInterval(updateCountdown, 1000)
}

function updateCountdown() {
    if (timeLeft <= 0) {
        generateNewToken()
        return
    }

    timeLeft--
    countdown.textContent = `${timeLeft}s`
    updateCircle()
}

function updateCircle() {
    progressCircle.style.strokeDashoffset = 339.12
    const dashOffset = (timeLeft / 30) * 339.12
    progressCircle.style.strokeDashoffset = dashOffset
}

function generateTOTP(secret) {
    fetch(`/generate-totp?secret=${secret}`)
        .then(response => response.json())
        .then(data => {
            token.innerText = data.token
            startCountdown(data.timeLeft)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

function generateNewToken() {
    const secret = input.value
    if (secret.trim() !== '') {
        generateTOTP(secret)
    }
}

// Listen for changes on user input
input.addEventListener('input', (event) => {
    const secret = event.target.value
    if (secret.trim() !== '') {
        generateTOTP(secret)
    } else {
        token.textContent = ''
        clearInterval(timer)
        countdown.textContent = ''
        progressCircle.style.strokeDashoffset = 339.12 // Reset the circle
    }
})

// Copy token to clipboard and show pop-up
token.addEventListener('click', () => {
    navigator.clipboard.writeText(token.textContent)
    popup.classList.add('show')
    setTimeout(() => {
        popup.classList.remove('show')
    }, 2000)
})
