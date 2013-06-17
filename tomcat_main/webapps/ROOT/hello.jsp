<!DOCTYPE html>

<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
%>

<html>
  <head>
    <title>Test page.</title>
   </head>
    
  <body>
    <div id="u_info">
      User: <%= u_name==null ? "Guest" : u_name %>
    </div>
    <button type="button" onclick="startRedir()">
      Play Game
    </button>
    <button type="button" id='login' onclick="document.location.href='/login.jsp';" <%= u_name==null ? "" : "style=\"display:none;\"" %> >
      Login
    </button>
    <button type="button" id='logout' onclick="document.location.href='/logout';">
      Logout
    </button>


    <div id="test"></div>
    <script>
      function startRedir() {
        //checks if the "username" is set
        //and changes page location accordingly
        var login = <%= u_name==null ? "null" : u_name_arg %> ;
        if(login == null) {
          document.location.href="/login.jsp"; 
        }
        else {
          document.getElementById("test").innerHTML 
              = "Username set to " + login + "<br>";
        }
      }
    </script>
  </body>
</html>
