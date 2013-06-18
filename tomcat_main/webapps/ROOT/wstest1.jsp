<!DOCTYPE html>

<html>
  <body>
    <div id="chat"> 
      <div id="monitor" style="width:400px;height:300px;border:2px solid;overflow-y:scroll;"></div>
      <div id="response">
        <textarea id="res" autocomlete="off" placeholder="Type something in!" oninput="setResButton()"></textarea>
        <button id="res_button" disabled="true" onclick="sendResponse()">Send</button>
      </div>

    </div>
  <script>
    var handshake=false;
    var serverSideName;
    var connection = new WebSocket("ws://"+window.location.host+"/websocks");
    connection.onopen = function() {
      this.send("HELLO>-1");
    }
    connection.onmessage = function(evt) {
      var message = evt.data.split(">");
      if(message.length<1 || (!handshake && (message[0] != "HELLO"))) {
        this.close();
        writeToMonitor("Sorry, an unpredictable error occured. Maybe you should try again later?");
        return;
      }
        switch(message[0]) {
        case "HELLO":
          treatHandshake(message); break;
        case "INFO":
          treatInfo(message); break;
        case "MSG":
          treatMessage(message); break;
      }
    }

    function writeToMonitor(message) {
      document.getElementById("monitor").innerHTML+=message+"<br>";
    }

    function treatHandshake(message) {
      if(handshake) {
        connection.close();
        writeToMonitor("Sorry, a procedure error occured. Maybe you should try again?");
        return;
      }
      handshake = true;
      serverSideName = message[1];
      roomNumber = parseInt(message[2]); 
      writeToMonitor("Handshake successful. Waiting for room ping.");
    }

    function treatInfo(message) {
        var pair, type, index, name;
      for(var i=1; i<message.length; ++i) {
        pair = message[i].split(",");
        type = pair[0].substring(0,1);
        index = parseInt(pair[0].substring(1));
        name = pair[1];
        switch(type) {
          case "#":
            writeToMonitor(name+" is playing with index "+index+".");
            break;
          case "+":
            if(isServerSideName(name)) {
              writeToMonitor("You have connected with index "+index+".");
            } else {
              writeToMonitor(name+" has connected and has index "+index+".");
            }
            break;
          case "-":
            writeToMonitor(name+" with index "+index+" has disconnected.");
            break;
        }
      }
    }

    function treatMessage(message) {
       var prefix = isServerSideName(message[1]) ? "You" : message[1];
       var monitor = document.getElementById("monitor");
       var isAtBottom 
           = (monitor.scrollTop + monitor.clientHeight >= monitor.scrollHeight);
       writeToMonitor(prefix+" wrote: "+message[2]);
       if(isAtBottom) {
         monitor.scrollTop = monitor.scrollHeight - monitor.clientHeight;
       }
    }

    function isServerSideName(name) {
      return name == serverSideName;
    }

    function setResButton() {
      var button = document.getElementById("res_button");
      button.disabled = document.getElementById("res").value =="";
    }

    function sendResponse() {
      var responseBox = document.getElementById("res");
      connection.send("MSG>"+serverSideName+">"+responseBox.value);
      responseBox.value = "";
      responseBox.oninput();
    }
  </script>
  </body>
</html>