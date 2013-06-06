<!DOCTYPE html>

<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
  if(u_name == null) {
%>
    <jsp:forward page="/hello.jsp"/>
<%
  }
%>

<html>
  <body>
    <div id ="u_info">
      User: <%= u_name%>
    </div>

    <p> 
       You are already logged in. You can start playing 
       <a href="/hello.jsp"> here. </a>
    </p>

  </body>
</html>
