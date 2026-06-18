const CreateBtn = document.querySelector(".Create-btnfinal");
const formCreate = document.querySelector(".task-form");
const cross = document.querySelector(".top-cross");
const form = document.querySelector("form");
const selectValue = document.querySelector("select");
const taskUi = document.querySelector(".task-list");

const totalTaskEl = document.querySelector(".total-task");
const completedTaskEl = document.querySelector(".completed-task");

const taskArr = [];
let editIndex = null;

// Show Form
CreateBtn.addEventListener("click", () => {
    formCreate.style.display = "flex";
});

// Hide Form
cross.addEventListener("click", () => {
    formCreate.style.display = "none";
    form.reset();
    editIndex = null;
});

// Update Counters
function updateCount() {
    totalTaskEl.textContent = taskArr.length;

    const completedCount = taskArr.filter(
        task => task.completed
    ).length;

    completedTaskEl.textContent = completedCount;
}

// Render UI
function ui() {

    taskUi.innerHTML = "";

    taskArr.forEach((elem, index) => {

        taskUi.innerHTML += `
        <div class="task-complete" data-index="${index}">

            <div class="text-card">
                <h1>${elem.taskName}</h1>
                <p>${elem.description}</p>
                <h2>Category : ${elem.category}</h2>
            </div>

            <div class="task-card">
                <div class="btn-group">

                    <button class="Create-btn btn1">
                        Edit
                    </button>

                    <button class="Create-btn btn2">
                        ${elem.completed ? "Completed" : "Complete"}
                    </button>

                    <button class="Create-btn btn3">
                        Delete
                    </button>

                </div>
            </div>

        </div>
        `;
    });

    updateCount();
}

// Submit Form
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const taskName = event.target[0].value;
    const description = event.target[1].value;
    const category = selectValue.value;

    const obj = {
        taskName,
        description,
        category,
        completed: false
    };

    // Edit Task
    if (editIndex !== null) {

        obj.completed = taskArr[editIndex].completed;

        taskArr[editIndex] = obj;

        editIndex = null;

    } else {

        taskArr.push(obj);
    }

    ui();

    form.reset();

    formCreate.style.display = "none";
});

// Event Delegation
taskUi.addEventListener("click", (event) => {

    const taskCard = event.target.closest(".task-complete");

    if (!taskCard) return;

    const index = taskCard.dataset.index;

    // EDIT
    if (event.target.classList.contains("btn1")) {

        const task = taskArr[index];

        form[0].value = task.taskName;
        form[1].value = task.description;
        selectValue.value = task.category;

        editIndex = index;

        formCreate.style.display = "flex";
    }

    // COMPLETE
    if (event.target.classList.contains("btn2")) {

        taskArr[index].completed = true;
        

        ui();
    }

    // DELETE
    if (event.target.classList.contains("btn3")) {

        taskArr.splice(index, 1);

        ui();
    }

});