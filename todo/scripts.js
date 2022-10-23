//list of tasks IDs
var items = [];

//load tasks from localstorage
function loadTasks(){
  document.getElementById("addName").value = "";
  document.getElementById("addDate").value = "";
  document.getElementById("searchName").value = "";

  var keys = Object.keys(localStorage);
  var keysLength = keys.length;

  if(keysLength > 0){
    for(i=0; i<keysLength; i++){
      if(keys[i].includes("Name")){
        //console.log(keys[i]);
        var item = keys[i].substr(4, keys[i].length - 8)
        items.push(parseInt(item))
      }
    }
    items.sort(function(a, b){return a-b});
    //console.log(items);

    for(i=0; i<items.length; i++){
      var name = localStorage.getItem("task" + items[i] + "Name");
      var date = localStorage.getItem("task" + items[i] + "Date");
      createItem(items[i], name, date);
    }
  }
}

//create html element
function createItem(itemNumber, name, date){
  var row = document.createElement("div");
	row.classList.add("row");
	row.setAttribute("id", "item" + itemNumber);
	document.getElementById("list").appendChild(row);

  var rightBorder = document.createElement("div");
	rightBorder.classList.add("rightBorder");
	rightBorder.setAttribute("id", "item" + itemNumber + "a");
	document.getElementById("item" + itemNumber).appendChild(rightBorder);

  var rowName = document.createElement("div");
  rowName.classList.add("rowName");
  rowName.classList.add("rightBorder");
  rowName.setAttribute("id", "item" + itemNumber + "Name");
  rowName.setAttribute("onclick", "editTask(" +  itemNumber  + ")");
  document.getElementById("item" + itemNumber + "a").appendChild(rowName);
  document.getElementById("item" + itemNumber + "Name").innerHTML = name;
  //document.getElementById("item" + itemNumber + "Name").style.display = "none";

  var rowNameEditHolder = document.createElement("div");
  rowNameEditHolder.classList.add("rowNameEditHolder");
	rowNameEditHolder.classList.add("rightBorder");
	rowNameEditHolder.setAttribute("id", "item" + itemNumber + "b");
	document.getElementById("item" + itemNumber + "a").appendChild(rowNameEditHolder);
  document.getElementById("item" + itemNumber + "b").style.display = "none";

  var rowNameEdit = document.createElement("input");
  rowNameEdit.classList.add("rowNameEdit");
  rowNameEdit.setAttribute("id", "item" + itemNumber + "NameEdit");
	rowNameEdit.setAttribute("type", "text");
  rowNameEdit.setAttribute("onfocusout", "saveTask(" +  itemNumber  + ")");
	document.getElementById("item" + itemNumber + "b").appendChild(rowNameEdit);
  document.getElementById("item" + itemNumber + "NameEdit").value = name;

  var rowDate = document.createElement("div");
  rowDate.classList.add("rowDate");
  rowDate.setAttribute("id", "item" + itemNumber + "Date");
	document.getElementById("item" + itemNumber + "a").appendChild(rowDate);
  document.getElementById("item" + itemNumber + "Date").innerHTML = date;

  var rowButtonHolder = document.createElement("div");
  rowButtonHolder.classList.add("rowButtonHolder");
  rowButtonHolder.setAttribute("id", "item" + itemNumber + "ButtonHolder");
	document.getElementById("item" + itemNumber).appendChild(rowButtonHolder);

  var rowButton = document.createElement("a");
  rowButton.classList.add("rowButton");
  rowButton.setAttribute("id", "item" + itemNumber + "Button");
  rowButton.setAttribute("onclick", "deleteTask(" +  itemNumber  + ")");
	document.getElementById("item" + itemNumber + "ButtonHolder").appendChild(rowButton);
  document.getElementById("item" + itemNumber + "Button").innerHTML = "DELETE";
}

//add task
function addTask(){
  var name = document.getElementById("addName").value;
  var date = document.getElementById("addDate").value;

  //check name
  name = name.trim();
  var nameLength = name.length;
  if(nameLength < 3){
    alert("Your task is too short!");
    return;
  }else if(nameLength > 255){
    alert("Your task is too long!");
    return;
  }

  //check date
  if(date != ""){
    var dateDay = date.substring(date.length - 2);
    var dateMonth = date.substring(date.length - 5, date.length - 3);
    var dateYear = date.substring(0, date.length - 6);

    var dateNow = new Date();
    var dateNowDay = String(dateNow.getDate()).padStart(2, '0');
    var dateNowMonth = String(dateNow.getMonth() + 1).padStart(2, '0');
    var dateNowYear = dateNow.getFullYear();

    if(dateYear < dateNowYear){
      alert("Your date is incorrect!");
      return;
    }else if(dateYear == dateNowYear){
      if(dateMonth < dateNowMonth){
        alert("Your date is incorrect!");
        return;
      }else if(dateMonth == dateNowMonth){
        if(dateDay <= dateNowDay){
          alert("Your date is incorrect!");
          return;
        }
      }
    }
    date = dateDay + " . " + dateMonth + " . " + dateYear;
  }

  //console.log(name, date);

  //create item
  if(items.length > 0){
    //console.log(items[items.length - 1] + 1);
    itemNumber = items[items.length - 1] + 1;
  }else{
    //console.log(1)
    itemNumber = 1;
  }

  //create html elements
  createItem(itemNumber, name, date);

  window.localStorage.setItem("task" + itemNumber + "Name", name);
  window.localStorage.setItem("task" + itemNumber + "Date", date);
  items.push(itemNumber);

  searchTasks();
}

// edit task
function editTask(task){
  document.getElementById("item" + task + "Name").style.display = "none";
  document.getElementById("item" + task + "b").style.display = "block";
  setTimeout(function(){
    document.getElementById("item" + task + "NameEdit").focus();
    document.getElementById("item" + task + "NameEdit").selectionStart = document.getElementById("item" + task + "NameEdit").selectionEnd = 10000;
  }, 0)
}

//save edited task
function saveTask(task){
  var name = document.getElementById("item" + task + "NameEdit").value;

  //check name
  name = name.trim();
  var nameLength = name.length;
  if(nameLength < 3){
    setTimeout(function(){
      document.getElementById("item" + task + "NameEdit").focus();
      document.getElementById("item" + task + "NameEdit").selectionStart = document.getElementById("item" + task + "NameEdit").selectionEnd = 10000;
    }, 0)
    alert("Your task is too short!");
    return;
  }else if(nameLength > 255){
    setTimeout(function(){
      document.getElementById("item" + task + "NameEdit").focus();
      document.getElementById("item" + task + "NameEdit").selectionStart = document.getElementById("item" + task + "NameEdit").selectionEnd = 10000;
    }, 0)
    alert("Your task is too long!");
    return;
  }

  document.getElementById("item" + task + "Name").style.display = "block";
  document.getElementById("item" + task + "b").style.display = "none";
  document.getElementById("item" + task + "Name").innerHTML = name;

  window.localStorage.setItem("task" + task + "Name", name);

  searchTasks();
}

//delete task
function deleteTask(task){
  //console.log(task)
  document.getElementById("item" + task).remove();

  window.localStorage.removeItem("task" + task + "Name");
  window.localStorage.removeItem("task" + task + "Date");
  var index = items.indexOf(task);
  items.splice(index, 1);
}

//search tasks
function searchTasks(){
  var search = document.getElementById("searchName").value;
  for(i=0; i<items.length; i++){
    task = document.getElementById("item" + items[i] + "NameEdit").value;
    if(search.length >= 3){
      if(task.toLowerCase().includes(search.toLowerCase())){
        document.getElementById("item" + items[i]).style.display = "block";
        var index = task.toLowerCase().indexOf(search.toLowerCase());
        if (index !== -1) {
          var endIndex = index + search.length;
          //console.log(index, endIndex);
          document.getElementById("item" + items[i] + "Name").innerHTML = task.substr(0, index) + "<span class='green'>" + task.substr(index, endIndex - index) + "</span>" + task.substr(endIndex, task.length - endIndex);
          //console.log(task.substr(0, index), task.substr(index, endIndex - index), task.substr(endIndex, task.length - endIndex));
        }else{
          document.getElementById("item" + items[i] + "Name").innerHTML = task;
        }
      }else{
        document.getElementById("item" + items[i]).style.display = "none";
      }
    }else{
      document.getElementById("item" + items[i] + "Name").innerHTML = task;
      document.getElementById("item" + items[i]).style.display = "block";
    }
  }
}

//clear search results
function clearSearch(){
  document.getElementById("searchName").value = "";

  searchTasks();
}
