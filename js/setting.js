const form = document.getElementById("settingsForm")
const userName = document.getElementById("name")
let savedName = localStorage.getItem("userName")
if (savedName) {
    userName.value = savedName
}
form.addEventListener("submit", function (e) {
    e.preventDefault()
    localStorage.setItem("userName", userName.value)
    window.location.href = "index.html"
})

// ===================== THEME =====================

const darkMode = document.getElementById("darkMode")
const themeOptions = document.querySelectorAll(".option")
const savedTheme = localStorage.getItem("theme") || "light"
document.body.className = savedTheme

if (savedTheme === "dark") {
    darkMode.checked = true
} else {
    darkMode.checked = false
}
themeOptions.forEach(option => {
    option.classList.toggle(
        "active",
        option.dataset.theme === savedTheme
    )
})

darkMode.addEventListener("change", () => {
    if (darkMode.checked) {
        document.body.className = "dark"
        localStorage.setItem("theme", "dark")
    } else {
        document.body.className = "light"
        localStorage.setItem("theme", "light")
    }
})

themeOptions.forEach(option => {
    option.addEventListener("click", () => {
        themeOptions.forEach(item =>
            item.classList.remove("active")
        )
        option.classList.add("active")
        const theme = option.dataset.theme
        document.body.className = theme
        localStorage.setItem("theme", theme)
        if (theme === "dark") {
            darkMode.checked = true
        } else {
            darkMode.checked = false
        }
    })
})

// ===================== FONT SIZE =====================
const fontSize = document.getElementById("fontSize")
let savedFontSize = localStorage.getItem("fontSize")
if (savedFontSize) {
    fontSize.value = savedFontSize
    document.documentElement.style.fontSize = savedFontSize + "px"
}
fontSize.addEventListener("input", () => {
    document.documentElement.style.fontSize = fontSize.value + "px"
    localStorage.setItem("fontSize", fontSize.value)
})

// ===================== ANIMATION =====================
const animationSpeed = document.getElementById("animationSpeed")
// ===================== LANGUAGE =====================
const languageCards = document.querySelectorAll(".card")
const savedLanguage = localStorage.getItem("language") || "en"
changeLanguage(savedLanguage)
languageCards.forEach(card => {
    card.classList.toggle(
        "active",
        card.dataset.lang === savedLanguage
    )
})
languageCards.forEach(card => {
    card.addEventListener("click", () => {
        languageCards.forEach(item =>
            item.classList.remove("active")
        )
        card.classList.add("active")
        localStorage.setItem("language", card.dataset.lang)
        changeLanguage(card.dataset.lang)
    })
})