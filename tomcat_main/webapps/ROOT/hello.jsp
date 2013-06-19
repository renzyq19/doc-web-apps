<!DOCTYPE html>
<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
%> 


<html>
    <head>
        <title>WebApps Home</title>
       <!--" <link rel='stylesheet' type='text/css' href='styles/main.css'>" -->
    </head>
    
    <body>
        <div class='navbar'>
            <div id="u_info">
                User: <%= u_name==null ? "Guest" : u_name %>
            </div>
            <a id=' ' onclick="startRedir();">
                Play Game
            </a>
            <a id='login' 
                onclick="document.location.href='/login.jsp';"<%= u_name==null ? "" : "style=\"display:none;\"" %>> 
                Login
            </a>
            <a id='logout' onclick="document.location.href='/logout';">
                Logout
            </a>
        </div>
        <div class='game-accordion'>
            <section id='join'>
            <h2>Join Game</h2>
                <form method='get' action='/game/wstest1.jsp'>
                    <p><input id='join-game' type='text' name='join-game' value='' placeholder='Room Number'></p> 
                </form>
            </section>
            <section id='create'>
                <h2><a href='#create'>Create Game</a></h2>
            </section>

        </div>



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
