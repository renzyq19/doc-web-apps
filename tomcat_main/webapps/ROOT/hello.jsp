<!DOCTYPE html>
<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
%> 


<html>
    <head>
        <title>WebApps Home</title>
        <link rel='stylesheet' type='text/css' href='styles/main.css'>
        <link rel='stylesheet' type='text/css' href='styles/home.css'>
    </head>
    
    <body>
        <div class='navbar'>
            <div id="u_info">
                User: <%= u_name==null ? "Guest" : u_name %>
            </div>
            <a id='login' 
                onclick="document.location.href='/login.jsp';"<%= u_name==null ? "" : "style=\"display:none;\"" %>> 
                Login
            </a>
            <a id='logout' onclick="document.location.href='/logout';"<%= u_name==null ? "style=\"display:none;\"" : "" %>>
                Logout
            </a>
        </div>
        <div class='game-accordion'>
            <section id='joinclosed'>
                <a onclick='toggleJoinForm();'><h2>Join Game</h2></a>
                    <form id='join-form' method='get' action='/wstest1.jsp'>
                        <p><input id='join-game' type='text' value='' placeholder='Room Number'></p> 
                        <p><input id='submit-btn' type='button' onClick='reqJoin();' value='Join'></p>
                        <input type='hidden' name='real-data' value=''>
                    </form>
            </section>
            <section id='create'>
                <a onclick='reqCreation();'><h2>Create Game</h2></a>
            </section>

        </div>



        <div id="test"></div>
        <script>
          var joinForm = document.getElementById("join-form");

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
                joinForm.elements["real-data"].value="-1";
                joinForm.submit();
            }

            function reqJoin() {
                var joinField = document.getElementById('join-game');
                joinForm.elements["real-data"].value
                    =joinField.value;
                joinField.value="";
                joinForm.submit();
            }
       </script>
  </body>
</html>
