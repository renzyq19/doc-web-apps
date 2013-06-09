<!DOCTYPE html>

<%
  final String u_name = (String)session.getAttribute("username"),
               u_name_arg = u_name==null ? null : "\"" + u_name + "\"";
  if(u_name != null) {
%>
    <jsp:forward page="/protected/alreadyLogged.jsp"/>
<%
  }
%>

<html>
    <head>
        <title>Login</title>
        <link rel='stylesheet' type='text/css' href='styles/main.css'>
    </head>
    <body>
        <section class='container'> 
            <div class='login'>
                <form name='login' action='/auth' method='post'>
                    <h2>Login</h2>
                    <p><input id='username' type='text' name='username' value='' placeholder='Username'></p>
                    <div id='after-username'></div>
                    <p><input id='password' type='password' name='password' value='' placeholder='Password'></p>
                    <div id='after-password'></div>
                    <p><input id='submit' type='submit' value='Login'></p>
                </form>
            </div>
            <div class='not-registered'>
                <p>Haven't registered? You can <a href='register.jsp'>sign up here.</a></p>
            </div>
        </section>
   </body>
</html>
