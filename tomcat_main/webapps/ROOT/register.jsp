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
        <title>Register</title>
        <link rel='stylesheet' type='text/css' href='styles/main.css'>
        <link rel='stylesheet' type='text/css' href='styles/register.css'>
    </head>
    <body>
        <section class='container'> 
            <div class='login'>
                <form name='register' action='/reg' method='post' onsubmit='return checkForm(this);'>
                    <h2>Register</h2>
                    <p><input id='username' type='text' name='username' value='' placeholder='Username' required pattern='^.{6,}$'></p>
                    <div id='after-username'></div>
                    <p><input id='password' type='password' name='password1' value='' placeholder='Password' required pattern='^.{6,}$'></p>
                    <div id='after-password'></div>
                    <p><input id='password' type='password' name='password2' value='' placeholder='Confirm Password' required pattern='^.{6,}$'></p>
                    <div id='after-password2'></div>
                    <p><input id='submit' type='submit' value='Register'></p>
                </form>
            </div>
        </section>
        <script type='text/javascript'>
            function checkForm(form){
                if(form.password1.value == form.password2.value){
                    return true;
                } else {
                    document.getElementById('after-password2').innerHTML= "Your passwords don't match!";
                    form.password2.value = '';
                    form.password2.focus();
                    return false;
                }
                
            };
        </script>
   </body>
</html>
