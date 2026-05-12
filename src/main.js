const switchThemeBtn = document.getElementById("switchThemeBtn"); 
let themePreference = localStorage.getItem("theme");
let savedTaskscheck = localStorage.getItem("tasks")
const userInput = document.getElementById("userInput");
const tasksCount = document.getElementById("tasksCounter"); 
const tasksCon = document.getElementById("tasksCon"); 

function addTask() {
    const userInputVal = userInput.value;
    userInput.value = "";
        tasksCon.innerHTML += `
            <li class="flex justify-between px-5 py-4 border-b border-b-gray-500 cursor-grab active:cursor-grabbing">
                  <div class="flex gap-2 items-center relative">
                    <input type="checkbox" checked name="task" id="task" class="appearance-none cursor-pointer border border-gray-400 w-6 h-6 rounded-full checked:bg-gradient-to-br checked:from-[#57ddff] checked:to-[#c058f3] after:absolute after:w-5 after:h-5 after:bg-[url('/images/icon-check.svg')] after:bg-no-repeat after:top-[7px] after:left-[6px] after:invisible checked:after:visible">
                    <label for="task" class="text-[var(--task-text)] select-none">${userInputVal}</label>
                </div>
                <button class="hover:cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                </button>
            </li>`;
}

userInput.addEventListener('keypress', (e) => { 
    if (e.key === "Enter") { 
        e.value = ""
        addTask();
    }
})

const setThemeDark = () => { 
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    switchThemeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`; 
}

const setThemeLight = () => {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    switchThemeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`; 
}

if (themePreference === "dark") { 
    setThemeDark()
} else { 
    setThemeLight()
}

switchThemeBtn.addEventListener('click', () => { 
    themePreference = localStorage.getItem("theme"); 
    const checkDark = themePreference === "dark" ? true : false; 
    if (checkDark) { 
        setThemeLight()
    } else if(!checkDark) { 
        setThemeDark()
    }
})