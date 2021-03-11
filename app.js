// render localStorage task list
document.addEventListener("DOMContentLoaded", function(){
	renderListData();
	
});

document.addEventListener('click',function(e){
	
    if(e.target && e.target.className == 'removeTask'){
		//console.log(e.target.className);
        let removeTaskBtn = e.target // document.querySelectorAll('a.removeTask');
		//console.log(removeTaskBtn);
		if(removeTaskBtn){
			event.preventDefault();
			let removeIndex = event.target.getAttribute('data-key');
			//console.log(removeIndex);
			let tasksList = JSON.parse(localStorage.getItem('tasks_mgmt'));
			let removeTaskList = tasksList.splice(removeIndex,1);
			//console.log(removeIndex, removeTaskList, tasksList);
			localStorage.setItem('tasks_mgmt', JSON.stringify(tasksList));
			renderListData();
		}
    }
 });


// submit form and store task
document.querySelector('form#taskGenerate').addEventListener('submit', function(event){

	event.preventDefault();
	let taskName = document.querySelector('#taskName');
	let taskTime = document.querySelector('#taskTime');
	let taskDescription = document.querySelector('#taskDescription');
	let taskStatus = document.querySelector('#taskDescription');
	
	letNewTask = { 'taskName' : taskName.value, 'taskTime' : taskTime.value, 'taskDescription' : taskDescription.value };
	//console.log(taskName,taskTime,taskDescription);
	let tasksList;
	
	if(localStorage.getItem('tasks_mgmt') == null){
		tasksList = [];
	} else {
		tasksList = JSON.parse(localStorage.getItem('tasks_mgmt'));
	}
	
	tasksList.push(letNewTask);
	localStorage.setItem('tasks_mgmt', JSON.stringify(tasksList));
	
	taskName.value = '';
	taskTime.value = '';
	taskDescription.value = '';
	renderListData();
	
});

function renderListData(){
	// Handler when the DOM is fully loaded
	const tasks = JSON.parse(localStorage.getItem('tasks_mgmt'));
	//console.log(tasks);
	let taskList = '';
	const taskUlEl = document.querySelector('#taskList');
	taskUlEl.innerHTML = '';
	tasks.forEach(function(task, index){
		taskUlEl.innerHTML += '<li data-key="'+ index +'"><h2>'+task.taskName+'</h2> <p><strong>Time: </strong>'+ task.taskTime +'</p> <p>'+ task.taskDescription +'</p> <a class="removeTask" href="#" data-key="'+ index +'">Remove</a> </li>';
	});
}