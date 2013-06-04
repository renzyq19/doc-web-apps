<%
  String user = session.getAttribute('user');
  if(user == null) {
%>
    <jsp:forward page="../login.html"/>
<%
  }
%>  

<html>

  <body>

    <button type="button">Create a Room</button>
    <button type="button">Join existing Room</button>
  </body>

</html>
