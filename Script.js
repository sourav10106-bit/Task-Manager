const CreateBtn = document.querySelector(".Create-btnfinal");
const formCreate = document.querySelector(".task-form");
const cross = document.querySelector(".top-cross");
const form = document.querySelector("form");
const selectValue = document.querySelector("select");
const taskUi = document.querySelector(".task-list");
const btnGroup = document.querySelector(".btn-group");
const taskArr = [];

// Show Form
CreateBtn.addEventListener("click", () => {
    formCreate.style.display = "flex";
});

// Hide Form
if (cross) {
    cross.addEventListener("click", () => {
        formCreate.style.display = "none";
    });
}

// Render Tasks
function ui() {

    taskUi.innerHTML = "";

    taskArr.forEach((elem) => {

        taskUi.innerHTML += `
        <div class="task-complete">

            <div class="text-card">
                <h1>${elem.taskName}</h1>
                <p>${elem.description}</p>
                <h2>Category : ${elem.category}</h2>
            </div>

            <div class="task-card">
                <div class="btn-group">
                    <button class="Create-btn btn1" >Edit</button>
                    <button class="Create-btn btn2">Complete</button>
                    <button class="Create-btn btn3">Delete</button>
                </div>
            </div>

        </div>
        `;
    });
}

// Form Submit
form.addEventListener("submit", (event) => {

    event.preventDefault();

    let taskName = event.target[0].value;
    let description = event.target[1].value;
    let category = selectValue.value;

    let obj = {
        taskName,
        description,
        category
    };

    taskArr.push(obj);

    ui();

    console.log(taskArr);

    form.reset();

    formCreate.style.display = "none";
});

taskUi.addEventListener("click", (event) => {

    if(event.target.classList.contains("btn1")){
        formCreate.style.display = "flex";
        
    }

    if(event.target.classList.contains("btn2")){
        console.log("complete");
    }

    if(event.target.classList.contains("btn3")){
        console.log("delete");
    }

});
