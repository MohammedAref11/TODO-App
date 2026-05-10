const switchThemeBtn = document.getElementById("switchThemeBtn"); 
let themePreference = localStorage.getItem("theme");



const setThemeDark = () => { 
    document.body.classList.remove("light")
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
}

const setThemeLight = () => {
    document.body.classList.add("light") 
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light")
}

if (themePreference === "dark") { 
    setThemeDark()
}

switchThemeBtn.addEventListener('click', () => { 
    themePreference = localStorage.getItem("theme")
    if (themePreference !== "dark") { 
        setThemeDark()
    } else if (themePreference !== "light") { 
        setThemeLight()
    }
})
