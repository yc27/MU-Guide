// Get Sessions
function getSessions() {
    return $.get("/routine/get/sessions");
}

// Get Departments
function getDepartments() {
    return $.get("/routine/get/departments");
}

// Get Batches Id
function getBatchesId(dept_id) {
    return $.get("/routine/get/batches-id/" + dept_id);
}

// Get Batches
function getBatches(dept_id) {
    return $.get("/routine/get/batches/" + dept_id);
}

// Get Sections Id
function getSectionsId(batch_id) {
    return $.get("/routine/get/sections-id/" + batch_id);
}

// Get Sections
function getSections(batch_id) {
    return $.get("/routine/get/sections/" + batch_id);
}

// Get Teachers
function getTeachers() {
    return $.get("routine/get/teachers");
}

// Get Subjects
function getSubjects() {
    return $.get("routine/get/subjects");
}

// Set Department Options
function setDepartmentOptions(form) {
    var deferred = new $.Deferred();

    getDepartments().done(function(departments) {
        var departmentOptions = "";
        $.each(departments, function(index, value) {
            departmentOptions +=
                '<option value="' +
                value["id"] +
                '">' +
                value["short_name"] +
                "</option>";
        });
        $(form + " .Select-Department").html(departmentOptions);

        deferred.resolve();
    });

    return deferred.promise();
}

// Set Batch Options
function setBatchOptions(form, deptId) {
    var deferred = new $.Deferred();

    getBatches(deptId).done(function(batches) {
        var batchOptions = "";
        $.each(batches, function(index, value) {
            batchOptions +=
                '<option value="' +
                value["id"] +
                '">' +
                value["batch_no"] +
                "</option>";
        });
        $(form + " .Select-Batch").html(batchOptions);

        deferred.resolve();
    });

    return deferred.promise();
}

// Set Section Options
function setSectionOptions(form, batchId) {
    var deferred = new $.Deferred();

    getSections(batchId).done(function(sections) {
        var sectionOptions = "";
        $.each(sections, function(index, value) {
            sectionOptions +=
                '<option value="' +
                value["id"] +
                '">' +
                value["section_no"] +
                "</option>";
        });
        $(form + " .Select-Section").html(sectionOptions);

        deferred.resolve();
    });

    return deferred.promise();
}

// Set Session Options
function setSessionOptions(form) {
    var deferred = new $.Deferred();

    getSessions().done(function(sessions) {
        var sessionOptions = "";
        $.each(sessions, function(index, value) {
            sessionOptions +=
                '<option value="' +
                value["id"] +
                '">' +
                value["session"] +
                "</option>";
        });
        $(form + " .Select-Session").html(sessionOptions);

        deferred.resolve();
    });

    return deferred.promise();
}

// Set Subject Options
function setSubjectOptions(form) {
    var deferred = new $.Deferred();
    getSubjects().done(function(subjects) {
        var subjectOptions = "";
        $.each(subjects, function(index, value) {
            subjectOptions +=
                '<option value="' +
                value["id"] +
                '">' +
                value["name"] +
                "</option>";
        });
        $(form + " .Select-Subject").html(subjectOptions);

        deferred.resolve();
    });

    return deferred.promise();
}

// Set Teacher Options
function setTeacherOptions(form) {
    var deferred = new $.Deferred();
    getTeachers().done(function(teachers) {
        var teacherOptions = "";
        $.each(teachers, function(index, value) {
            teacherOptions +=
                '<option value="' +
                value["id"] +
                '">' +
                value["name"] +
                "</option>";
        });
        $(form + " .Select-Teacher").html(teacherOptions);

        deferred.resolve();
    });

    return deferred.promise();
}

// Create Routine Table Cell
function createEmptyRoutineCell(dayId, periodId, sessionId, sectionId) {
    const button =
        '<button class="btn btn-outline-info btn-sm btn-circle create-routine" data-day="' +
        dayId +
        '" data-period="' +
        periodId +
        '" data-session="' +
        sessionId +
        '" data-section="' +
        sectionId +
        '" data-toggle="modal" data-target="#Modal-Create-Routine-Form"><i class="fas fa-plus"></i></button>\n';

    return button;
}
function createRoutineCell(
    routineId,
    sessionId,
    sectionId,
    dayId,
    periodId,
    subject,
    teacher,
    room
) {
    const button =
        '<div class="mask flex-center rgba-blue-strong">\n' +
        '<button class="delete-routine btn btn-sm btn-danger" data-id="' +
        routineId +
        '" data-session="' +
        sessionId +
        '" data-section="' +
        sectionId +
        '" data-day="' +
        dayId +
        '" data-period="' +
        periodId +
        '"><i class="fas fa-trash-alt"></i></button>\n' +
        "</div>\n";

    const cell =
        '<div class="view overlay">\n' +
        '<span class="subject">' +
        subject +
        '</span></br>by <span class="teacher">' +
        teacher +
        '</span></br>at <span class="room">' +
        room +
        "</span>\n" +
        button +
        "</div>\n";

    return cell;
}

// Create Routine Table
function setRoutineTable(data) {
    const btnPDF =
        '<button class="btn btn-sm btn-primary ml-0 download-routine-pdf" data-session="' +
        data.sessionId +
        '" data-department="' +
        data.departmentId +
        '" data-batch="' +
        data.batchId +
        '" data-section="' +
        data.sectionId +
        '"><i class="fas fa-file-pdf mr-2"></i>Download PDF</button>';

    const btnReset =
        '<button class="btn btn-sm btn-danger mr-0 reset-routine" data-toggle="modal" data-target="#Modal-Routine-Reset" data-session="' +
        data.sessionId +
        '" data-department="' +
        data.departmentId +
        '" data-batch="' +
        data.batchId +
        '" data-section="' +
        data.sectionId +
        '"><i class="fas fa-times-circle mr-2"></i>Reset Routine</button>';

    const buttons = "<div>\n" + btnPDF + "\n" + btnReset + "\n</div>";

    var tableHeader =
        '<div class="d-flex align-items-end justify-content-between">\n' +
        "<div>Dept: <strong>" +
        data.departmentName["short_name"] +
        "</strong></br>Batch: <strong>" +
        data.batchNo["batch_no"] +
        "</strong></br>Section: <strong>" +
        data.sectionNo["section_no"] +
        "</strong></br>Session: <strong>" +
        data.session["session"] +
        "</strong></div>\n" +
        buttons +
        "\n</div>";

    var tableRows = "<tr><th></th>";
    $.each(data.periods, function (key, period) {
        var [hh_s, mm_s, ss_s] = period["start_time"].split(":");
        var [hh_e, mm_e, ss_e] = period["end_time"].split(":");

        tableRows +=
            '<th class="text-center">' +
            formatTime(parseInt(hh_s), parseInt(mm_s)) +
            " - " +
            formatTime(parseInt(hh_e), parseInt(mm_e)) +
            "</th>";
    });
    tableRows += "</tr>";

    const tableHead = "<thead>" + tableRows + "</thead>\n";

    tableRows = "";
    $.each(data.classDays, function(key, classDay) {
        tableRows +=
            '<tr><td class="align-middle">' + classDay["day"] + "</td>";
        $.each(data.periods, function(key, period) {
            var flag = false;
            $.each(data.routines, function(key, routine) {
                if (
                    routine["day"] === classDay["id"] &&
                    routine["period"] === period["id"]
                ) {
                    tableRows +=
                        '<td class="text-center align-middle" id="Routine-Cell-' +
                        classDay["id"] +
                        "-" +
                        period["id"] +
                        '">\n' +
                        createRoutineCell(
                            routine["id"],
                            data["sessionId"],
                            data["sectionId"],
                            classDay["id"],
                            period["id"],
                            routine["subject"],
                            routine["teacher"],
                            routine["room"]
                        ) +
                        "</td>\n";
                    flag = true;
                }
            });
            if (flag === false) {
                tableRows +=
                    '<td class="text-center align-middle" id="Routine-Cell-' +
                    classDay["id"] +
                    "-" +
                    period["id"] +
                    '">\n' +
                    createEmptyRoutineCell(
                        classDay["id"],
                        period["id"],
                        data["sessionId"],
                        data["sectionId"]
                    ) +
                    "</td>";
            }
        });
        tableRows += "</tr>";
    });

    const tableBody = "<tbody>" + tableRows + "</tbody>\n";
    const table =
        '<table class="table table-sm table-striped border border-dark" id="Table-Routine">\n' +
        tableHead +
        tableBody +
        "</table>";

    const result = "<hr>\n" + tableHeader + "\n" + table;

    $("#Routine-Search-Reasult").html(result);
}

// Add Row to Academic Structure Table
function addRowToAcademicStructureTable(data) {
    var cells = "";
    if ($("#Form-Academic-Structure").data("table") === "Period") {
        var [hh_s, mm_s, ss_s] = data.start_time.split(":");
        var [hh_e, mm_e, ss_e] = data.end_time.split(":");
        
        cells +=
            '<td class"align-middle">' +
            formatTime(parseInt(hh_s), parseInt(mm_s)) +
            "</td>";

        cells +=
            '<td class"align-middle">' +
            formatTime(parseInt(hh_e), parseInt(mm_e)) +
            "</td>";
    } else {
        $.each(data, function(key, item) {
            if (key !== "id") {
                cells += '<td class"align-middle">' + item + "</td>";
            }
        });
    }

    cells +=
        '<td class="align-middle py-0">\n' +
        '<button class="btn btn-danger btn-sm px-2 delete-academic-structure" data-toggle="modal" data-target="#Modal-Academic-Structure-Delete" data-id="' +
        data.id +
        '" data-table="' +
        $("#Form-Academic-Structure").data("table") +
        '"> <i class="fas fa-trash-alt"></i> </button>\n' +
        "</td>";

    const row =
        "\n<tr id=" +
        $("#Form-Academic-Structure").data("table") +
        "-Id-" +
        data.id +
        ">\n" +
        cells +
        "</tr>\n";

    $(
        "#Table-" + $("#Form-Academic-Structure").data("table") + " tbody"
    ).append(row);
}

// Academic Structure Menu Clicked
$(".academic-structure-menu .menu").click(function(e) {
    e.preventDefault();
    var animationTime = 500;

    if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $("#" + $(this).data("menu")).hide(animationTime);

        $(this)
            .parent()
            .siblings()
            .delay(animationTime)
            .not($(".academic-structure-details"))
            .show(animationTime);
    } else {
        $(this)
            .parent()
            .siblings()
            .not($(".academic-structure-details"))
            .hide(animationTime);

        $(this).addClass("active");
        $("#" + $(this).data("menu"))
            .delay(animationTime)
            .show(animationTime);
    }
});

// Clicked to Add Department
$("#Btn-Add-Dapartment").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Department");

    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Department");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/department");

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        '<label>Department Name</label><input type="text" name="name" class="form-control mb-4" required> <label>Abbreviation Of Department Name</label><input type="text" name="short-name" class="form-control mb-4" required></input>'
    );
});

// Clicked to Add Batch
$("#Btn-Add-Batch").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Batch");

    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Batch");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/batch");

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        '<label>Department Name</label> <select name="dept-id" class="Select-Department browser-default custom-select mb-4" required ></select> <label>Batch No</label><input type="number" min=1 name="batch-no" class="form-control mb-4" required >'
    );

    setDepartmentOptions("#Form-Academic-Structure");
});

// Clicked to Add Section
$("#Btn-Add-Section").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Section");
    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Section");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/section");

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        '<label>Department Name</label><select name="dept-id" class="Select-Department browser-default custom-select mb-4" required ></select> <label>Batch No</label><select name="batch-id" class="Select-Batch browser-default custom-select mb-4" required></select> <label>Section No</label><input type="text" name="section-no" class="form-control mb-4" required>'
    );

    setDepartmentOptions("#Form-Academic-Structure").done(function() {
        setBatchOptions(
            "#Form-Academic-Structure",
            $("#Form-Academic-Structure .Select-Department").val()
        );
    });
});
// Change Batch Options on Department Selection
$("#Form-Academic-Structure").on("change", ".Select-Department", function() {
    setBatchOptions("#Form-Academic-Structure", $(this).val());
});

// Clicked to Add Teacher
$("#Btn-Add-Teacher").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Teacher");

    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Teacher");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/teacher");

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        '<label>Teacher Name</label><input type="text" name="name" class="form-control mb-4" required><label>Abbreviation of Teacher\'s Name</label><input type="text" name="short-name" class="form-control mb-4" required>'
    );
});

// Clicked to Add Subject
$("#Btn-Add-Subject").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Subject");

    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Subject");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/subject");

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        '<label>Subject Name</label><input type="text" name="name" class="form-control mb-4" required><label>Abbreviation of Subject Name</label><input type="text" name="short-name" class="form-control mb-4" required><label>Subject Code</label><input type="text" name="code" class="form-control mb-4" required>'
    );
});

// Clicked to Add Period
$("#Btn-Add-Period").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Period");

    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Period");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/period");

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        '<label>Start Time</label><input type="time" name="start-time" class="form-control mb-4" required> <label>End Time</label><input type="time" name="end-time" class="form-control mb-4" required>'
    );
});

// Clicked to Add Session
$("#Btn-Add-Session").click(function() {
    $("#Modal-Academic-Structure-Title").html("Add Session");

    $("#Form-Academic-Structure").trigger("reset");
    $("#Form-Academic-Structure").data("table", "Session");
    $("#Form-Academic-Structure").attr("method", "POST");
    $("#Form-Academic-Structure").attr("action", "/routine/store/session");

    var yearSelect =
        '<label>Session Year</label><select name="year" class="browser-default custom-select mb-4" required >';
    for (var i = new Date().getFullYear(); i >= 2000; i--) {
        yearSelect += '<option value="' + i + '">' + i + "</option>";
    }
    yearSelect += "</select>";

    $("#Form-Academic-Structure-Content").empty();
    $("#Form-Academic-Structure-Content").html(
        yearSelect +
            '<label>Term</label><select name="term" class="browser-default custom-select mb-4" required ><option value="Spring">Spring</option><option value="Summer">Summer</option><option value="Autumn">Autumn</option></select>'
    );
});

// Store Academic Structure
$("#Btn-Form-Academic-Structure-Save").click(function(e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });
    $.ajax({
        type: $("#Form-Academic-Structure").attr("method"),
        url: $("#Form-Academic-Structure").attr("action"),
        data: $("#Form-Academic-Structure").serialize(),

        success: function(response) {
            $("#Btn-Form-Academic-Structure-Close").click();
            addRowToAcademicStructureTable(response.data);

            createToast("success", "Success", response.msg);
        },

        error: function(xhr) {
            $.each(xhr.responseJSON.errors, function(key, item) {
                if ($.isArray(item)) {
                    $.each(item, function(key, value) {
                        $("#Form-Academic-Structure-Error-Message").append(
                            "<li>" + value + "</li>"
                        );
                    });
                } else {
                    $("#Form-Academic-Structure-Error-Message").append(
                        "<li>" + item + "</li>"
                    );
                }
            });

            $("#Form-Academic-Structure-Error").removeClass("d-none");
            setTimeout(function() {
                $("#Form-Academic-Structure-Error").addClass("d-none");
                $("#Form-Academic-Structure-Error-Message").empty();
            }, 10000);
        }
    });
});

// Delete Academic Structure
function deleteAcademicStructure(id, tableUC, tableLC, sections, batches) {
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "DELETE",
        url: "/routine/delete/" + tableLC + "/" + id,
        success: function(response) {
            $("#" + tableUC + "-Id-" + id).remove();
            createToast("danger", "Success", response.msg);

            if (tableUC === "Department") {
                $.each(batches, function(key, item) {
                    $("#Batch-Id-" + item["id"]).remove();
                });
                $.each(sections, function(key, item) {
                    $("#Section-Id-" + item["id"]).remove();
                });
            }

            if (tableUC === "Batch") {
                $.each(sections, function(key, item) {
                    $("#Section-Id-" + item["id"]).remove();
                });
            }
        },
        error: function(response) {
            console.log("Error:", response);
        }
    });
}
$("body").on("click", "#Btn-Delete-Academic-Structure", function() {
    const id = $(this).data("id");
    const tableUC = $(this).data("table");
    const tableLC = tableUC.substr(0, 1).toLowerCase() + tableUC.substr(1);

    if (tableUC === "Department") {
        var batches = [],
            sections = [];
        getBatchesId(id)
            .done(function(batchesIds) {
                var deferred = new $.Deferred();

                batches = batchesIds;
                $.each(batches, function(key, item) {
                    getSectionsId(item["id"]).done(function(sectionIds) {
                        $.each(sectionIds, function(key, item) {
                            sections.push(item);
                        });
                    });
                });

                deferred.resolve();
                return deferred.promise();
            })
            .done(function() {
                deleteAcademicStructure(
                    id,
                    tableUC,
                    tableLC,
                    sections,
                    batches
                );
            });
    } else if (tableUC === "Batch") {
        getSectionsId(id).done(function(sections) {
            deleteAcademicStructure(id, tableUC, tableLC, sections);
        });
    } else {
        deleteAcademicStructure(id, tableUC, tableLC, sections);
    }
});
$("body").on("click", ".delete-academic-structure", function() {
    $("#Btn-Delete-Academic-Structure").data("id", $(this).data("id"));
    $("#Btn-Delete-Academic-Structure").data("table", $(this).data("table"));
});

// Set Class Days
$("#Form-Set-Days").change(function() {
    $("#Form-Set-Days-Submit")
        .removeClass("d-none")
        .addClass("d-block");
});
$("#Form-Set-Days").on("submit", function(e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "POST",
        url: "/routine/store/class-days",
        data: $("#Form-Set-Days").serialize(),
        success: function(response) {
            $("#Form-Set-Days-Submit")
                .removeClass("d-block")
                .addClass("d-none");

            createToast("success", "Success", response.msg);
        },
        error: function(response) {
            console.log("Error:", response);
        }
    });
});

// Set Options for Routine Search Form
$("#Form-Routine-Search").on("change", ".Select-Department", function() {
    setBatchOptions("#Form-Routine-Search", $(this).val()).done(function() {
        setSectionOptions(
            "#Form-Routine-Search",
            $("#Form-Routine-Search .Select-Batch").val()
        );
    });
});
$("#Form-Routine-Search").on("change", ".Select-Batch", function() {
    setSectionOptions("#Form-Routine-Search", $(this).val());
});
$(".Routines").on("click", function() {
    $("#Routine-Search-Reasult").empty();

    setSessionOptions("#Form-Routine-Search");

    setDepartmentOptions("#Form-Routine-Search").done(function() {
        setBatchOptions(
            "#Form-Routine-Search",
            $("#Form-Routine-Search .Select-Department").val()
        ).done(function() {
            setSectionOptions(
                "#Form-Routine-Search",
                $("#Form-Routine-Search .Select-Batch").val()
            );
        });
    });
});

// Generate Routin Table
$("#Form-Routine-Search").on("submit", function(e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "GET",
        url: "/routine/search",
        data: $("#Form-Routine-Search").serialize(),
        success: function(response) {
            setRoutineTable(response);
        },
        error: function(xhr) {
            $("#Routine-Search-Reasult").empty();
            $.each(xhr.responseJSON.errors, function(key, item) {
                if ($.isArray(item)) {
                    $.each(item, function(key, value) {
                        createToast("danger", "ERROR", value);
                    });
                } else {
                    createToast("danger", "ERROR", item);
                }
            });
        }
    });
});

// Create Routine Form
$("body").on("click", ".create-routine", function(e) {
    e.preventDefault();
    setSubjectOptions("#Form-Create-Routine");
    setTeacherOptions("#Form-Create-Routine");

    $("#Day-Id").val($(this).data("day"));
    $("#Period-Id").val($(this).data("period"));
    $("#Session-Id").val($(this).data("session"));
    $("#Section-Id").val($(this).data("section"));
});

// Store Routine
$("#Btn-Form-Create-Routine-Save").click(function(e) {
    e.preventDefault();
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "POST",
        url: "/routine/store",
        data: $("#Form-Create-Routine").serialize(),
        success: function(response) {
            $("#Btn-Form-Create-Routine-Close").click();
            $("#Form-Create-Routine").trigger("reset");

            var dayId = response.data.day;
            var periodId = response.data.period;

            $("#Routine-Cell-" + dayId + "-" + periodId).empty();
            $("#Routine-Cell-" + dayId + "-" + periodId).html(
                createRoutineCell(
                    response.data.id,
                    response.data.session,
                    response.data.section,
                    response.data.day,
                    response.data.period,
                    response.data.subject,
                    response.data.teacher,
                    response.data.room
                )
            );
            createToast("success", "Success", "Routine set successfully.");
        },
        error: function(xhr) {
            $.each(xhr.responseJSON.errors, function(key, item) {
                if ($.isArray(item)) {
                    $.each(item, function(key, value) {
                        $("#Form-Create-Routine-Error-Message").append(
                            "<li>" + value + "</li>"
                        );
                    });
                } else {
                    $("#Form-Create-Routine-Error-Message").append(
                        "<li>" + item + "</li>"
                    );
                }
            });

            $("#Form-Create-Routine-Error").removeClass("d-none");
            setTimeout(function() {
                $("#Form-Create-Routine-Error").addClass("d-none");
                $("#Form-Create-Routine-Error-Message").empty();
            }, 10000);
        }
    });
});

// Delete Routine
$("body").on("click", ".delete-routine", function() {
    var id = $(this).data("id");
    var dayId = $(this).data("day");
    var periodId = $(this).data("period");
    var sessionId = $(this).data("session");
    var sectionId = $(this).data("section");
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "delete",
        url: "/routine/delete/" + id,
        success: function(data) {
            $("#Routine-Cell-" + dayId + "-" + periodId).html(
                createEmptyRoutineCell(dayId, periodId, sessionId, sectionId)
            );
            createToast("danger", "Success", "Routine deleted successfully.");
        },
        error: function(data) {
            console.log("Error:", data);
        }
    });
});

// Reset Routine
$("body").on("click", "#Btn-Reset-Routine", function() {
    var sessionId = $(this).data("session");
    var departmentId = $(this).data("department");
    var batchId = $(this).data("batch");
    var sectionId = $(this).data("section");
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "delete",
        url:
            "/routine/reset/" +
            sessionId +
            "/" +
            departmentId +
            "/" +
            batchId +
            "/" +
            sectionId,
        success: function(response) {
            setRoutineTable(response);
            createToast("danger", "Success", "Routine has been reset to default.");
        },
        error: function(response) {
            console.log("Error:", response);
        }
    });
});
$("body").on("click", ".reset-routine", function() {
    $("#Btn-Reset-Routine").data("session", $(this).data("session"));
    $("#Btn-Reset-Routine").data("department", $(this).data("department"));
    $("#Btn-Reset-Routine").data("batch", $(this).data("batch"));
    $("#Btn-Reset-Routine").data("section", $(this).data("section"));
});

// Download Routine PDF
$("body").on("click", ".download-routine-pdf", function() {
    var sessionId = $(this).data("session");
    var departmentId = $(this).data("department");
    var batchId = $(this).data("batch");
    var sectionId = $(this).data("section");

    var link =
        "/routine/download/pdf/" +
        sessionId +
        "/" +
        departmentId +
        "/" +
        batchId +
        "/" +
        sectionId;

    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        }
    });

    $.ajax({
        type: "GET",
        url: link,
        success: function(response) {
            window.open(link, "_blank");
            createToast("info", "Success", "PDF Downloaded.");
        },
        error: function(response) {
            console.log("Error:", response);
        }
    });
});
