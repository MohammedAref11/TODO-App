import Sortable from 'sortablejs'
const switchThemeBtn = document.getElementById("switchThemeBtn"); 
let themePreference = localStorage.getItem("theme");
const checkSavedTasks = localStorage.getItem("tasks");
const userInput = document.getElementById("userInput");
const tasksCount = document.getElementById("tasksCounter"); 
const tasksCon = document.getElementById("tasksCon");
const activeBtn = document.getElementById("activeBtn"); 
const allBtn = document.getElementById("allBtn");
const compBtn = document.getElementById("comBtn"); 
const clearCompBtn = document.getElementById("clearCompBtn"); 
const btnsCon = document.getElementById("btnsCon"); 

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

function addTask() {
    const userInputVal = userInput.value;
        userInput.value = "";
        saveToLocalStorage(userInputVal) 
        const newDataToDis = JSON.parse(localStorage.getItem("tasks"))
        displayTasks(newDataToDis)
}

function saveToLocalStorage(userTask) { 
    const localData = localStorage.getItem("tasks");
    if (!localData) { 
        localStorage.setItem("tasks", JSON.stringify([{task: userTask, checked: false}])); 
    } else { 
        const dataParsed = JSON.parse(localData); 
        dataParsed.push({task: userTask, checked: false});
        const dataStringed = JSON.stringify(dataParsed);
        localStorage.setItem("tasks", dataStringed);
    }
}

if (checkSavedTasks) { 
    displayTasks(JSON.parse(checkSavedTasks))
    tasksCounter()
    allBtn.classList.add("text-blue-500")
}

function displayTasks(data) {
    if (data) { 
        tasksCon.innerHTML = "";
        data.forEach((e, index) => { 
            tasksCon.innerHTML += `
                <li class="bg-[var(--tasks-bg)] flex justify-between px-5 py-4 border-b border-b-gray-500 cursor-grab active:cursor-grabbing transition-colors duration-200" draggable=true>
                      <div class="flex gap-2 items-center relative">
                        <input type="checkbox" name="task" id="${index}" class="appearance-none cursor-pointer border border-gray-400 w-6 h-6 rounded-full checked:bg-gradient-to-br checked:from-[#57ddff] checked:to-[#c058f3] 
                        after:absolute after:w-5 after:h-5 after:bg-[url('/images/icon-check.svg')] after:bg-no-repeat after:top-[7px] after:left-[6px] after:invisible checked:after:visible" ${e.checked ? "checked" : ""}>
                        <label for="${index}" class="text-[var(--task-text)] select-none cursor-pointer">${e.task}</label>
                    </div>
                    <button class="hover:cursor-pointer" id="${index}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                    </button>
                </li>`;
        })
    }
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && e.target.value.length > 0) { 
        addTask()
        tasksCounter()
    }
})

tasksCon.addEventListener("click", (e) => { 
    const storageData = JSON.parse(localStorage.getItem("tasks"))
    const button = e.target.closest("button"); 
    if (button) { 
        const newData = storageData.toSpliced(button.id, 1); 
        const stringy = JSON.stringify(newData)
        localStorage.setItem("tasks", stringy)
        const newDataToDis = JSON.parse(localStorage.getItem("tasks"))
        displayTasks(newDataToDis)
        tasksCounter()
    }
    const checkinput = e.target.closest("input"); 
    if (checkinput) {
        checkForCompleted()
    }
})

function tasksCounter() { 
    const dataFromLocal = JSON.parse(localStorage.getItem("tasks"))
    if (dataFromLocal) { 
        tasksCount.textContent = `Items Left ${dataFromLocal.length}`
    }
}

function checkForCompleted() { 
    const tasksContainer = document.querySelectorAll("li")
    let newData = [];
        tasksContainer.forEach((e) => {
        newData.push({task: e.querySelector("label").textContent, 
        checked: e.querySelector("input").checked})
    })
    localStorage.setItem("tasks", JSON.stringify(newData))
}

function displayCompleted() { 
    const getFromLocal = localStorage.getItem("tasks");
    const dataParsed = JSON.parse(getFromLocal); 
    if (dataParsed) { 
        const filterChecked = dataParsed.filter((e) => e.checked)
        tasksCount.textContent = `Items Left ${filterChecked.length}`
        displayTasks(filterChecked)
    }
}

function displayActive() { 
    const getFromLocal = localStorage.getItem("tasks");
    const dataParsed = JSON.parse(getFromLocal); 
    if (dataParsed) { 
        const filterNotChecked = dataParsed.filter((e) => !e.checked); 
        tasksCount.textContent = `Items Left ${filterNotChecked.length}`
        displayTasks(filterNotChecked)
    }
}

function clearCompleted() { 
    const getFromLocal = localStorage.getItem("tasks");
    const dataParsed = JSON.parse(getFromLocal);
    if (dataParsed) { 
        const filterChecked = dataParsed.filter((e) => !e.checked); 
        localStorage.setItem("tasks", JSON.stringify(filterChecked))
        tasksCount.textContent = `Items Left ${filterChecked.length}`
        displayTasks(filterChecked)
    }
}

compBtn.addEventListener("click", () => { 
    displayCompleted()
})

allBtn.addEventListener("click", () => { 
    const allData = localStorage.getItem("tasks"); 
    const parsed = JSON.parse(allData)
    displayTasks(parsed)
    tasksCounter()
})

activeBtn.addEventListener("click", () => { 
    displayActive()
})

clearCompBtn.addEventListener("click", () => { 
    clearCompleted()
})

btnsCon.addEventListener("click", (e) => { 
    const btn = e.target.closest("button"); 
    const buttons = btnsCon.querySelectorAll("button"); 
    if (btn) { 
        buttons.forEach((e) => { 
            if (e.classList.contains("text-blue-500")) { 
                e.classList.remove("text-blue-500")
            }
        })
        btn.classList.add("text-blue-500")
    }
})

function saveAfterSort() { 
    const items = [...document.querySelectorAll("li")]
    const newData = []; 
    items.forEach((e) => { 
        newData.push({"task": e.querySelector("label").textContent, 
            "checked": e.querySelector("input").checked})
    })
    localStorage.setItem("tasks", JSON.stringify(newData))
}

new Sortable(tasksCon, { 
    animation: 180, 
    delay: 100,
    delayOnTouchOnly: true, 
    touchStartThreshold: 5, 
    onStart: function (evt) { 
        evt.item.classList.add("opacity-50"); 
    }, 
    onEnd: function (evt) { 
        evt.item.classList.remove("opacity-50")
        saveAfterSort()
    }, 

})