<!DOCTYPE html>

<html>
  <body>
    <div id="dump" style="width:600px;height:400px;"> 
      <textarea readonly style="margin:0% auto 0% 0%;padding:0%;height:85%;width:95%;resize:none;display:block;" id="monitor"> </textarea>
      <div id="response" style="margin:0% auto 0% 0%;padding:1%;display:block;width:95%;height:5%;">
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
