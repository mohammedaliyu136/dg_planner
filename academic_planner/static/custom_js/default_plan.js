function add_to_plan(){
    var semester = $('#semester').val();
    var course_code = $('#courses').val();
    var title = getCourseTitle(course_code);
    if(course_code!=="Select Course"){
        //check = check_pre_req(course_code,not_selected);
		//if(check == false){
            $('#'+semester).append(table_tr(course_code, title));
            $("#"+course_code).remove();
            setUnits(semester+"units", course_code);
            add_to_schedule_array(semester, course_code)
            not_selected=remove(not_selected,course_code);
        //} else{
        //    sweetAlert("Prerequisite Error", "You need "+check, "error"); // sweetAlert external library
        //}
    }
}

function add_to_schedule_array(semester_name, course_code){
	i = getIndexOfK(schedule, semester_name);  //get index of semester
	schedule[i].push(course_code);
}

function getIndexOfK(arr, k) { 				//finding index of multidimentional array
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0]==k){
    	return i
    }
  }
};

function del_schedule(semester_id, item){
	var index = schedule[0].indexOf(item)
    schedule[0].splice(index, 1);
    console.log(schedule);
}

function table_tr(course_code, title){
    str =  '<tr class="child">';
    str += '<td class="crn">'+course_code+'</td>';
    str += '<td>'+title+'</td>';
    str += '<td><button class="btnDelete">Drop</button></td>';
    str += '</tr>';
    return str
}

function restor(text){
	//delete_from_schedule(schedule, text)
	not_selected.push(text);
	clear(courses);
	populate(not_selected);
}

function del_schedule(semester_id, item){
	var index = schedule[0].indexOf(item)
    schedule[0].splice(index, 1);
    console.log(schedule);
}

function add_schedule(semester_id, item){
    schedule[semester_id].push(item)
    console.log(schedule);
}

function clear(ctrl)
    {
        ctrl.options.length = 1;
    }

function populate(options){
	var select = document.getElementById("courses");
	    for (var i = 0; i < options.length; i++) {
		var opt = options[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	    }
}

function check_pre_req(cid,arr){
	pre = null;
	for (var i=0; i <pre_req.length; i++ ) {
		if (pre_req[i][0] == cid){
			pre = pre_req[i][1]
		}
	}

	if (pre == null){
		return false
	}else{
	          if (arr.includes(pre)){ // return true or false
			return pre}
		else{ return false};
	}
}

function remove(arr, val){
	temp = [];
	for (var i=0; i <arr.length; i++ ) {
		if (arr[i] != val){temp.push(arr[i])};
	};
	return temp;
}



