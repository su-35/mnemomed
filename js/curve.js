//constructor of tasks
function Task(title, type, timing){
    this.title = title;
    this.type = type; //position 1 - 24h to review, position 2 - 72 h to review, position 3 - 1 week, position 4 - 1 month
    this.timing = timing; //time of adding task
}

//selectors
const curveA = document.querySelector("#curveAdd"); //button
const curveT = document.querySelector("#curveTask"); //input
const curveL = document.querySelector("#curveList"); //task ul


//getting tasks from localStorage
document.addEventListener('DOMContentLoaded',getTasks);

function getTasks(){
    let tasks =[];
    if(localStorage.getItem("tasks")===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        //creating UI for task
        let x = document.createElement("li");
        x.textContent = task.title;
        x.style.color = "#b0ffff";
        x.style.marginBottom = "15px";
        //creating UI of delete button
        let del = document.createElement("a");
        del.style.paddingLeft = "20px";
        del.style.color = "red";
        del.textContent = "x";
        x.classList.add("aaac");
        x.appendChild(del);
        x.addEventListener("click", counting(x));
        //appending task to list of tasks
        curveL.appendChild(x);
        del.addEventListener("click", removeTask);
    })
}

//Adding new tasks
curveA.addEventListener("click", function(){
    
    if(curveT.value===""){
        alert("wprowadź dane");
    }
    else{
        //creating new Task
        const task = new Task(`${curveT.value}`,1,Date.now());
        addToLocalStorage(task);
        //creating UI of new task
        let x = document.createElement("li");
        x.textContent = task.title;
        x.style.color = "#b0ffff";
        x.style.marginBottom = "15px";
        //creating UI of delete button
        let del = document.createElement("a");
        del.style.paddingLeft = "20px";
        del.style.color = "red";
        del.textContent = "x";
        x.classList.add("aaac");
        x.appendChild(del);
        x.addEventListener("click", counting(x));
        del.addEventListener("click", removeTask);       
        curveL.appendChild(x);
        curveT.value ="";
    }
});


function addToLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('aaac')){
        e.target.parentElement.remove();
    }  

    //remove from Local Storage
    removeFromLocalStorage(e.target.parentElement);
}

function removeFromLocalStorage(x){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        // if(x.textContent===(task.title+"x")){
        //     tasks.splice(index, 1);
        // }
        console.log(task.title.length);
        if(x.textContent.substr(0,task.title.length)===task.title){
            tasks.splice(index, 1);
        }
        //console.log(x.textContent.substr(0,x.textContent.length-1));
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function counting(x){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        if(x.textContent.substr(0,task.title.length)===task.title){
            //task.timing
            let taskTime = task.timing;
            console.log(task.type);
            
            //let nowTime = new Date();
            //console.log(nowTime);
            diff = Date.now() - taskTime;
            console.log(msToTime(diff));
            //console.log(diff);
            //console.log(24*60*60*1000);
            const h=3600;
            if(task.type===1 && diff<24*h*1000){   
                x.style.background = "grey";
                let info = document.createElement("p");
                info.textContent = `-> Do powtorki pozostało ${msToTime(24*h*1000-diff)}`;
                info.style.background = "grey";
                info.style.fontSize = "15px";
                info.style.paddingTop = "-5px";
                x.appendChild(info);
            }
            else if(task.type===1 && diff<48*h*1000 && diff>24*h*1000){
                x.style.background = "orange";
                let info = document.createElement("p");
                info.textContent = "-> Musisz dzisiaj to powtorzyc!";
                info.style.background = "red";
                info.style.fontSize = "15px";
                //info.style.paddingTop = "-5px";
                x.appendChild(info);
                let review = document.createElement("button");
                review.innerHTML = "Powtarzam!";
                review.classList.add("btn");
                x.appendChild(review);
                review.addEventListener("click", function(){
                    x.style.background = "grey";
                    info.style.background = "grey";
                    info.textContent = `-> Do powtorki pozostało ${msToTime(24*h*1000-diff)}`;
                    review.disabled = "true";
                    //changing type from 1 to 2;
                    if(localStorage.getItem('tasks')===null){
                        tasks=[];
                    }
                    else{
                        tasks=JSON.parse(localStorage.getItem('tasks'));
                    }
                    tasks.forEach(function(task, index){
                        if(x.textContent.substr(0,task.title.length)===task.title){
                            task.type = 2;
                            task.timing = Date.now();
                        }
                        
                    });
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    //console.log(task.type);

                });
            }
            else if(task.type===1 && diff>48*h*1000){
                x.style.background = "orange";
                let info = document.createElement("p");
                info.textContent = "-> Musisz dzisiaj to powtorzyc!";
                info.style.background = "red";
                info.style.fontSize = "15px";
                //info.style.paddingTop = "-5px";
                x.appendChild(info);
                let review = document.createElement("button");
                review.innerHTML = "Powtarzam!";
                review.classList.add("btn");
                x.appendChild(review);
                review.addEventListener("click", function(){
                    x.style.background = "grey";
                    info.style.background = "grey";
                    info.textContent = `-> Do powtorki pozostało ${msToTime(24*h*1000-diff)}`;
                    review.disabled = "true";
                    //changing type from 1 to 2;
                    if(localStorage.getItem('tasks')===null){
                        tasks=[];
                    }
                    else{
                        tasks=JSON.parse(localStorage.getItem('tasks'));
                    }
                    tasks.forEach(function(task, index){
                        if(x.textContent.substr(0,task.title.length)===task.title){
                            task.type = 1;
                            task.timing = Date.now();
                            
                        }
                        
                    });
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    //console.log(task.type);

                });
            }
            
            else if(task.type===2 && diff < 3*24*h*1000){
                x.style.background = "grey";
                let info = document.createElement("p");                
                info.style.fontSize = "15px";
                info.style.background = "grey";
                info.textContent = `-> Do powtorki pozostało ${msToTime(3*24*h*1000-diff)}`;
                x.appendChild(info);
                let review = document.createElement("button");
                review.innerHTML = "Powtarzam!";
                review.classList.add("btn");
                x.appendChild(review);
                review.disabled = "true";
            }

            else if(task.type===2 && diff>3*24*h*1000 && diff<4*24*h*1000){
                x.style.background = "orange";
                let info = document.createElement("p");
                info.textContent = "-> Musisz dzisiaj to powtorzyc!";
                info.style.background = "red";
                info.style.fontSize = "15px";
                //info.style.paddingTop = "-5px";
                x.appendChild(info);
                let review = document.createElement("button");
                review.innerHTML = "Powtarzam!";
                review.classList.add("btn");
                x.appendChild(review);
                review.addEventListener("click", function(){
                    x.style.background = "grey";
                    info.style.background = "grey";
                    info.textContent = `-> Do powtorki pozostało ${msToTime(24*h*1000-diff)}`;
                    review.disabled = "true";
                    //changing type from 1 to 2;
                    if(localStorage.getItem('tasks')===null){
                        tasks=[];
                    }
                    else{
                        tasks=JSON.parse(localStorage.getItem('tasks'));
                    }
                    tasks.forEach(function(task, index){
                        if(x.textContent.substr(0,task.title.length)===task.title){
                            task.type = 3;
                            task.timing = Date.now();
                        }
                        
                    });
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    //console.log(task.type);

                });
            }
            else if(task.type===2 && diff>48*h*1000){
                x.style.background = "orange";
                let info = document.createElement("p");
                info.textContent = "-> Musisz dzisiaj to powtorzyc!";
                info.style.background = "red";
                info.style.fontSize = "15px";
                //info.style.paddingTop = "-5px";
                x.appendChild(info);
                let review = document.createElement("button");
                review.innerHTML = "Powtarzam!";
                review.classList.add("btn");
                x.appendChild(review);
                review.addEventListener("click", function(){
                    x.style.background = "grey";
                    info.style.background = "grey";
                    info.textContent = `-> Do powtorki pozostało ${msToTime(24*h*1000-diff)}`;
                    review.disabled = "true";
                    //changing type from 1 to 2;
                    if(localStorage.getItem('tasks')===null){
                        tasks=[];
                    }
                    else{
                        tasks=JSON.parse(localStorage.getItem('tasks'));
                    }
                    tasks.forEach(function(task, index){
                        if(x.textContent.substr(0,task.title.length)===task.title){
                            task.type = 1;
                            task.timing = Date.now();
                            
                        }
                        
                    });
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                    //console.log(task.type);

                });
            }

            else if(task.type===3 && diff < 7*24*h*1000){
                x.style.background = "grey";
                let info = document.createElement("p");                
                info.style.fontSize = "15px";
                info.style.background = "grey";
                info.textContent = `-> Do powtorki pozostało ${msToTime(7*24*h*1000-diff)}`;
                x.appendChild(info);
                let review = document.createElement("button");
                review.innerHTML = "Powtarzam!";
                review.classList.add("btn");
                x.appendChild(review);
                review.disabled = "true";
            }
        }
            //console.log(Date.now());
    }); 
    //});
    //console.log("timing");
} 


function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes; //+ ":" + seconds + "." + milliseconds;
}

//const dpr = Array.prototype.slice.call(document.querySelectorAll("li.aaac"));
//console.log(dpr);
//dpr.forEach(function(listItem){listItem.addEventListener("click", counting)});

console.log(Date.now());