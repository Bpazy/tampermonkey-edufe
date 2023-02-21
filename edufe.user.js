// ==UserScript==
// @name         edufe
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://training.sqkj.edufe.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 解锁课程限制
    window.toListen = function(chapterId, obj) {
        obj.disabled = true;
        var courseNodeId = document.getElementById("courseNodeId").value;
        var planId = document.getElementById("planId").value;
        var studentPlanId = document.getElementById("studentPlanId").value;
        var customerPlanCourseId = document.getElementById("customerPlanCourseId").value;
        window.location = "toListenListeningStudy.action?courseNodeId="+courseNodeId+"&planId="+planId+"&chapterId="+chapterId+"&studentPlanId="+studentPlanId+"&customerPlanCourseId="+customerPlanCourseId;
    }

    // 直接看完课程
    const $buttonContainer = $($.find('.button_div.center'));
    const $unlock = $(document.createElement('a'));
    $unlock.text('直接看完课程');
    $unlock.addClass('c_btn_blue70');
    $buttonContainer.prepend($unlock);
    $unlock.on('click', function (){
        if(isPlayEnd == "1") return false;
        var path = "http://admin.sqkj.edufe.cn/savePlayPositionInteracted.action?logNo=85c07b4c-ae84-4ee5-836a-8d142a91d5e1";
        var sec3=player.j2s_getDuration();//总时长
        var courseID = document.querySelector('input[name="chapterId"]').value;
        var studentId = document.querySelector('input[name="studentId"]').value;

        var param = "&totalSeconds="+sec3 + "&playPosition=" + sec3+ "&allSeconds=" + sec3+"&courseID="+courseID+"&userID="+studentId;
        $.ajax({
            url: path+param,
            dataType: "jsonp",
            jsonp: "callback",
            success: function (data) {
            }
        })
    });

    // 解锁进度条限制
    $($.find('.pv-video-player')).remove();
    createPolyv('0', 'off');

    // 解锁随堂随练
    window.show = function(planId, chapterId, courseNodeId, studentPlanId, studentId) {
        var needToListen = document.getElementById("needToListen").value;
        //flash 随堂add
        var logNo = document.getElementById("logNo").value;
        //验证课件是否播放完成
        var resourceType = 4;
        var enableExercise = document.getElementById("enableExercise").value;
        window.open('findExamCasualExercisesAction.action?planId=' + planId + '&courseNodeId=' + chapterId + '&parentId=' + courseNodeId + '&studentPlanId=' + studentPlanId + '&studentId=' + studentId + '&logNo=' + logNo, 'PracWindow', ' width=1000, height=800,top=50, left=50, toolbar=no, menubar=no, scrollbars=yes,resizable=yes,location=no, status=no');
    }
})();
