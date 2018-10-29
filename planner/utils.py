from .models import *


def remainingReqCourses(requiredCourses, coursesTaken):
    """ returns remaining courses for program """
    remainingReqCourses = []
    for course in requiredCourses:
        if course not in coursesTaken:
            remainingReqCourses.append(course)
    return remainingReqCourses


def allPrereqCoreq(course, remainingReqCourses):
    """ returns required courses that have course as a prereq or coreq """
    allPrereqCoreq = []
    for requiredCourse in remainingReqCourses:
        for prereq in course.prereqs:
            if prereq is requiredCourse:
                allPrereqCoreq.append(prereq)
        for coreq in course.coreqs:
            if coreq is requiredCourse:
                allPrereqCoreq.append(coreq)
    return allPreqCoreq


# run on each coursecollection
def nextCourses(coursesTaken, remainingReqCourses):
    """ returns the courses student can take given what's been taken """
    nextCourses = []
    for course in remainingReqCourses:
        if course.coreqField not in coursesTaken:
            nextCourses.append(course)
        # you have to take the prereqs for something first
        elif course.prereqField not in coursesTaken:
            nextCourses.append(course)
        else:
            possibility = allPrereqCoreq(course, remainingReqCourses)
            nextCourses.append(possibility)
    return nextCourses


def getGenEds(programs, isHonors):
    # this algorithm sucks because if there's a change to the number of allowed
    # majors then this will break

    # (fix this obvi)
    return True


def getGenEds(program, isHonors):
    """ returns the gen eds a student has to take based on their selected
        programs """
    genEdList = []
    if isHonors:
        genEdList.append("Honors")
        # will require a program in the database called "Honors"
        return genEdList
    else:
        firstMajorType = program[0].degreeType
        genEdList.append(firstMajorType)
        try:
            secondMajor = program[1].degreeType
            if firstMajorType is secondMajorType:
                genEdList.append(secondMajorType)
                return genEdList
        except:
            return genEdList


def maxProgramsAllowed(programList, maxProgramNumber):
    """ called to ensure student can't sign up for more than 2 majors, etc """
    if (len(programList) + 1) > maxProgramNumer:
        return False
    else:
        return True


def fulfilledReq(coursesTaken, courseCollection, numReq):
    """ makes CourseCollection.isCompleted True if completed
        should only use where isCompleted is False
        can also be used for Program.isCompleted """
    finished = 0
    for reqCourse in courseCollection:
        if reqCourse in coursesTaken:
            finished += 1
            if finished >= numReq:
                courseCollection.isCompleted = True
                break


def topTrajectories(trajectories):
    """ Only shows the uppermost level of trajectories--
        there's no reason that *all* of the previously loaded classes
        need be gone through; furthermore, students only need to see
        the top level of each of their trajectories on their homepage """

    names = set()
    for trajectory in trajectories:
        names.append(trajectory.name)

    topTrajectories = []
    for name in names:
        namedTrajectories = trajectories.filter(name=name)
        topNamedTrajectory = namedTrajectories.aggregate(Max('semester'))
        topTrajectories.append(topNamedTrajectory)

    return topTrajectories


def enoughCourses(coursesTaken, degreeCreditsReqNum):
    """ required credits for degree program """
    if len(coursesTaken) > degreeCreditsReqNum:  # 120
        return True
    else:
        return False


def prereqCompleted(course, coursesTaken):
    for courseTaken in coursesTaken:
        for pre in course.prereqField.all():
            if pre in coursesTaken:
                return True
            else:
                return False
        if len(courseTaken.prereqField.all()) == 0:
            return True


def getnextCourses(coursesTaken, remainingReqCourses):
    """ returns the courses student can take given what's been taken """
    nextCourses = []
    for remainingCourse in remainingReqCourses:
        if prereqCompleted(remainingCourse, coursesTaken):
            nextCourses.append(remainingCourse)

    return getPossibilityRank(nextCourses)


# =====================
def prereqCompletedd(course, coursesTaken):
    for courseTaken in coursesTaken:
        for pre in course.prerequisites.all():
            if pre in coursesTaken:
                return True
            else:
                return False
        if len(courseTaken.prereqField.all()) == 0:
            return True
    return True


def getnextCoursess(coursesTaken, remainingReqCourses):
    """ returns the courses student can take given what's been taken """
    nextCourses = []
    for remainingCourse in remainingReqCourses:
        if prereqCompletedd(remainingCourse, coursesTaken):
            nextCourses.append(remainingCourse)

    return getPossibilityRank(nextCourses)


# =====================

def getPossibilityRank(courses):
    n = len(courses)
    for i in range(n):
        for j in range(0, n - i - 1):
            if (courses[j].courseNumber > courses[j + 1].courseNumber):  # or (len(courses[j].prereqField.all()) > len(courses[j+1].prereqField.all())):
                courses[j], courses[j + 1] = courses[j + 1], courses[j]

    return courses


def getGenEdCourses(gened):
    all_gen_courses = []
    group_course = []
    for gen in gened:
        for group in gen.course_group_1.all():
            if group.is_group:
                all_gen_courses.append([])
                for group_courses in group.group_courses.all():
                    for course in group_courses.course.all():
                        all_gen_courses[-1].append(course)
            else:
                all_gen_courses.append(group.courses.all()[0])
    return all_gen_courses


# =======sep-30==========================================================================================================
# notes
# check all course in prereq not in required.
# give major requirement priority

def remainingReqCourses_r(requiredCourses, coursesTaken):
    """ returns remaining courses for program """
    remainingReqCourses = []
    for course in requiredCourses:
        if course not in coursesTaken:
            remainingReqCourses.append(course)
    return remainingReqCourses


def getnextCourses_r(coursesTaken, remainingReqCourses):
    """ returns the courses student can take given what's been taken """
    nextCourses = []
    for remainingCourse in remainingReqCourses:
        if prereqCompleted_r(remainingCourse, coursesTaken):
            nextCourses.append(remainingCourse)

    return getPossibilityRank(nextCourses)


def prereqCompleted_r(course, coursesTaken):
    for courseTaken in coursesTaken:
        for pre in course.prerequisites.all():
            if pre in coursesTaken:
                return True
            else:
                return False
        if len(courseTaken.prereqField.all()) == 0:
            return True
    return True


def getNotListedCourses(courses):
    notlisted = []
    for course in courses:
        for course in courses:
            for pre in course.prerequisites.all():
                print pre
            if len(course.prereqField.all()) == 0:
                break
    return notlisted


def fix_sechedule(schedule):
    i = 0
    for sched in schedule:
        if len(sched)<5:
            i+=1
            print len(sched)
            completed = []
            for c in xrange(0, i-1):
                completed.append(c)
            print "------------nn---------------------"
            print len(completed)
            print "------------ee---------------------"




def plannner(mgr, gened, completed):
    courses = merge_all(gened, mgr)
    remaining = remainingReqCourses_r(courses, completed)
    schedule = []
    a = 13
    while (a > 0):
        units = 0
        remaining = remainingReqCourses_r(courses, completed)
        options = getnextCourses_r(completed, remaining)
        data = []
        for option in options:
            units += option.credits
            if units > 16:
                break

            data.append(option)
            completed.append(option)
        # print option#, option.prerequisites.all(), prereqCompleted_r(option, completed)

            #        completed.append(selected)
            #else:
        print "----------------------"

        print len(options)
        schedule.append(data)
        print len(remaining)
        a -= 1
    schedule.pop()
    return schedule

def plannnerr(mgr, gened, completed, opt):
    courses = merge_all(gened, mgr)
    remaining = remainingReqCourses_r(courses, completed)
    schedule = []
    plann(courses, completed, schedule, opt)
    return schedule

def plannner_final(schedule, notCompleted, completed, opt):
    #courses = merge_all(gened, mgr)
    remaining = remainingReqCourses_r(notCompleted, completed)
    #schedule = []
    plann(notCompleted, completed, schedule, opt, 0)
    return schedule

def clean_query_set(obj):
    data = []
    for i in obj:
        data.append(i)
    return data

def remove_obj(obj, el):
    for i in xrange(0, len(obj)-1):
        if(obj[i].name==el.name):
            obj.pop(i)
    return obj

def get_completed(completed, semester, semester_new):
    data = []
    for com in completed:
        if com in semester:
            pass
        else:
            data.append(com)
    for sem in semester_new:
        data.append(sem)
        #pass
    print "----------------------"
    print data
    return data


def plan_editor(plan, courses_selected):
    semester_1_new = []
    plan.completedCourses.remove(*plan.semester_1.all())
    plan.notCompletedCourses.add(*plan.semester_1.all())
    for i in courses_selected:
        c = i.split("_")
        course = Course.objects.get(departmentAbbr=c[0], courseNumber=c[1])
        plan.completedCourses.add(course)
        semester_1_new.append(course)

    plan.notCompletedCourses.remove(*semester_1_new)
    plan.semester_1.clear()
    plan.semester_1.add(*semester_1_new)
    plan.save()

def get_first_sem_courses(courses, completed, first_sem_opt):
    units = 0
    remaining = remainingReqCourses_r(courses, completed)
    options = getnextCourses_r(completed, remaining)
    for op in options:
        first_sem_opt.append(op)

    first_sem = []
    for option in options:
        units += option.credits
        if units > 16:
            break
        first_sem.append(option)
    return first_sem

def plann(courses, completed, schedule, opt, passes):
    units = 0
    remaining = remainingReqCourses_r(courses, completed)
    options = getnextCourses_r(completed, remaining)
    data = []
    for option in options:
        units += option.credits
        if units > 16:
            break
        data.append(option)
        completed.append(option)
    schedule.append(data)
    opt.append(options)
    remaining = remainingReqCourses_r(courses, completed)
    if len(remaining)>0:
        if(passes<60):
            passes+=1
            return plann(courses, completed, schedule, opt, passes)
        else:
            return schedule
    else: return schedule


def getGenEdCourses_2(gened):
    data = []
    for gen in gened:
        credits = gen.creadits
        if True:  # gen.course_group_1.all()[0]:
            for course in gen.course_group_1.all():
                if course.is_group:
                    group = []
                    for c in course.group_courses.all()[0].course.all():
                        group.append(c)
                    data.append(group[0])
                else:
                    for c in course.courses.all():
                        data.append(c)
            for course in gen.course_group_2.all():
                if course.is_group:
                    group = []
                    for c in course.group_courses.all()[0].course.all():
                        group.append(c)
                    data.append(group[0])
                else:
                    for c in course.courses.all():
                        data.append(c)
            for course in gen.course_group_3.all():
                if course.is_group:
                    # for c in course.group_courses.all[0].course.all:
                    #    data.append(c)
                    course.group_courses.all()[0].course.all()[0]
                else:
                    for c in course.courses.all():
                        data.append(c)
    return data


def merge_all(gen, major):
    gen = getGenEdCourses_2(gen)
    mgr = []
    for m in major:
        for p in m.prerequisites.all():
            if p not in major:
                mgr.append(p)
        mgr.append(m)
    # for g in gen:
    #    all.append(g)
    all = list(set(mgr) | set(gen))
    return b_sort(all)


def b_sort(courses):
    for passnum in range(len(courses) - 1, 0, -1):
        for i in range(passnum):
            if courses[i].departmentAbbr > courses[i + 1].departmentAbbr:
                temp = courses[i]
                courses[i] = courses[i + 1]
                courses[i + 1] = temp
    return courses


def b_sort_co_req(courses):
    for passnum in range(len(courses) - 1, 0, -1):
        for i in range(passnum):
            if courses[i].departmentAbbr > courses[i + 1].departmentAbbr:
                temp = courses[i]
                courses[i] = courses[i + 1]
                courses[i + 1] = temp
    return courses


def save_major(pk, request):
    m = Major_r.objects.filter(id=pk)
    p = Profile.objects.filter(user_name=request.user.username)
    if p.count() is not 0:
        error = "user profile already exist"
    else:
        Profile(user_name=request.user.username, major=m[0].name).save()
        return True
    return False
