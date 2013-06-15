<!DOCTYPE html>

<html>
  <body>
    <div id="dump"> </div>

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
