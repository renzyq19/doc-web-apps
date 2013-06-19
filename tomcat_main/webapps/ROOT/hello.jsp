<!DOCTYPE html>
<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
%> 


<html>
    <head>
        <title>WebApps Home</title>
        <link rel='stylesheet' type='text/css' href='styles/main.css'>
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
            <section id='joinclosed'>
                <a onclick='toggleJoinForm();'><h2>Join Game</h2></a>
                    <form id='join-form' method='get' action='/game/wstest1.jsp'>
                        <p><input id='join-game' type='text' name='join-game' value='' placeholder='Room Number'></p> 
                        <p><input id='submit' type='submit' name='join' value='Join'></p>
                        <input type='hidden' name='real-data' value=''>
                    </form>
            </section>
            <section id='create'>
                <a onclick='reqCreation();'><h2>Create Game</h2></a>
            </section>

        </div>



        <div id="test"></div>
        <script>
          function startRedir() {
            //checks if the "username" is set
            //and changes page location accordingly
            var login;// =<%= u_name==null ? "null" : u_name_arg %> ;
            if(login == null) {
              document.location.href="/login.jsp"; 
            }
            else {
              document.getElementById("test").innerHTML 
                  = "Username set to " + login + "<br>";
            }
          }
          var toggleJoinForm = showJoinForm;
            function showJoinForm(){
                document.getElementById("joinclosed").id = 'joinopen';
                document.getElementById('join-game').focus();
                toggleJoinForm = closeJoinForm;
            };

            function closeJoinForm(){
                document.getElementById("joinopen").id = 'joinclosed';
                toggleJoinForm = showJoinForm;
            };

            function reqCreation() {
                form.elements["real-data"].value="-1";
                form.submit();
            }
       </script>
  </body>
</html>
