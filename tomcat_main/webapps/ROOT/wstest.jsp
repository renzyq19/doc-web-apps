<!DOCTYPE html>

<html>
    <head>
        <title>Websocket test</title>
        <link rel='stylesheet' type='text/css' href='styles/wstest.css'>
    </head>
  <body>
      <div id="dump" > 
      <textarea readonly id="monitor"> </textarea>
      <div id="response" >
        <textarea> </textarea>
        <button> Send </button>
      </div>

    </div>
  <script>
    var connection = new WebSocket('ws://<%=request.getServerName() + ':' + request.getServerPort() %>/websocks');
    connection.onopen = function() {
      this.send("HELLO>-1");
    }
    connection.onmessage = function(evt) {
      document.getElementById("dump").innerHTML +=evt.data + "<br>";
    }
  </script>
  </body>
</html>
