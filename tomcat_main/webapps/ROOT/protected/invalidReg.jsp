<!DOCTYPE html>

<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
%>

<html>
    <head>
        <title>Invalid Registration</title>
        <link rel='stylesheet' type='text/css' href='styles/main.css'>
    </head>
    <body>
      <div id ="u_info">
        User: <%= u_name%>
      </div>
        <p>
          Sorry, your registration was not accepted. Either a duplicate was 
          found or the input was not formatted correctly. In any case, you can
          <a href='/register.jsp'>try again here.</a>
        </p>
    </body>
</html>
