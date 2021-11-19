showTodo();
const toDoInput = document.getElementById("toDoInput");
const addToDoBtn = document.getElementById("addToDoBtn");

addToDoBtn.addEventListener('click', () => {
  toDoInputVal = toDoInput.value;
  ToDoLocalStore = localStorage.getItem("ToDoLocalStore");
  if (ToDoLocalStore == null) {
    
    todoObj = [];
  } else {
    todoObj = JSON.parse(ToDoLocalStore);
  }
  // add the inputvalue in localStorage
  if (toDoInput.value === "") {
    alert("Please Fill the Input Field");

  } else {
    todoObj.push(toDoInputVal);
    localStorage.setItem("ToDoLocalStore", JSON.stringify(todoObj));
    toDoInput.value = "";
  }

  showTodo();

});



function showTodo() {
  ToDoLocalStore = localStorage.getItem("ToDoLocalStore");
  if (ToDoLocalStore == null) {
    todoObj = [];
  } else {
    todoObj = JSON.parse(ToDoLocalStore);
  }
  //  show todolist in browser 
  let html = '';
  let todoTable = document.getElementById("todoTable");
  todoObj.map((item, index) => {
    html += `
  <tbody>
     <tr>
       <th scope="row">${index + 1}</th>
       <td>${item}</td>
       <td><button onClick="toDoEdit(${index})"><i class="far fa-edit"></i></button></td>
       <td><button onClick="toDoDelete(${index})"><i class="far fa-trash-alt"></i></button></td>
     </tr>   
     </tbody> 
     `
  });
  
  todoTable.innerHTML = html;
}

// editTodo functionalty 
function toDoEdit(index) {
  const saveIndex = document.getElementById("saveIndex");
  const addToDoBtn = document.getElementById("addToDoBtn");
  const saveToDoBtn = document.getElementById("saveToDoBtn");
  const ToDoLocalStore = localStorage.getItem("ToDoLocalStore");
  saveIndex.value = index;
  toDoInput.value = todoObj[index];
  // hide add button and show showbtn 
  addToDoBtn.style.display = "none";
  saveToDoBtn.style.display = "block";
}

//  save the edit todo 
const saveToDoBtn = document.getElementById("saveToDoBtn");

saveToDoBtn.addEventListener('click', () => {
  const ToDoLocalStore = localStorage.getItem("ToDoLocalStore");
  const todoObj = JSON.parse(ToDoLocalStore);
  const saveIndex = document.getElementById("saveIndex").value;
  todoObj[saveIndex] = toDoInput.value;
  localStorage.setItem("ToDoLocalStore", JSON.stringify(todoObj));
  saveToDoBtn.style.display = "none";
  addToDoBtn.style.display = "block";
  showTodo();
});

// delete btn functionalty 
function toDoDelete(index) {
  const ToDoLocalStore = localStorage.getItem("ToDoLocalStore");
  const todoObj = JSON.parse(ToDoLocalStore);
  todoObj.splice(index, 1);
  localStorage.setItem("ToDoLocalStore", JSON.stringify(todoObj));
  showTodo();
}

// delete button 
const deleteAllDoBtn = document.getElementById("deleteAllDoBtn");
deleteAllDoBtn.addEventListener('click', () => {
  saveToDoBtn.style.display = "none";
  addToDoBtn.style.display = "block";

  localStorage.clear();
  showTodo();
})


