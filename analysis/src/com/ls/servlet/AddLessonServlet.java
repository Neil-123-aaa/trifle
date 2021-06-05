package com.ls.servlet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ls.common.Lesson;
import com.ls.common.LessonHandle;

import java.io.IOException;

public class AddLessonServlet extends HttpServlet{
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException,ServletException
    {
        doPost(request,response);
    }
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException,ServletException
    {
        Lesson lesson = new Lesson();
        LessonHandle lessonHandle = new LessonHandle();
        request.setCharacterEncoding("utf-8");
        response.setCharacterEncoding("utf-8");
        int l_id = Integer.parseInt(request.getParameter("l_id"));
        String l_name = request.getParameter("l_name");
        String l_teacher_name = request.getParameter("l_teacher_name");
        lesson.setL_id(l_id);
        lesson.setL_name(l_name);
        lesson.setL_teacher_name(l_teacher_name);
        lessonHandle.addLesson(lesson);
        response.sendRedirect("backStage.jsp");
    }
}
