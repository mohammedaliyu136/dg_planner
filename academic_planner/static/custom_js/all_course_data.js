
all_course.pop;
console.log("all_course");
console.log(all_course);

function getCourseTitle(code){
    for(i=0; i<all_course.length; i++){
        if(all_course[i][0] == code){
            return (all_course[i][1]);
        }
    }
}
function getCourseUnits(code){
    for(i=0; i<all_course.length; i++){
        if(all_course[i][0] == code){
            return (all_course[i][4]);
        }
    }
}

function setTitle(courseCode){
    $("#"+courseCode+">.title").text(getCourseTitle(courseCode));
    console.log(getCourseTitle(courseCode));
}

function setUnits(tableID, courseCode){
    var units = parseInt(getCourseUnits(courseCode));
    var oldUnits = parseInt($("#"+tableID).text());
    console.log($("#"+tableID).text(oldUnits+units));
    console.log("tableID "+tableID+",    courseCode "+units)
}

function removeUnits(tableID, courseCode){
    var units = parseInt(getCourseUnits(courseCode));
    var oldUnits = parseInt($("#"+tableID).text());
    console.log($("#"+tableID).text(oldUnits-units));
    console.log("tableID "+tableID+",    courseCode "+units)
}
