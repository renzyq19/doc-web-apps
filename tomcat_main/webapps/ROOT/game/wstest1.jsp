<!DOCTYPE html>

<html>
    <head>
        <title>Gunship Galaxy</title>
        <link rel='stylesheet' type='text/css' href='../styles/main.css'>
        <link rel='stylesheet' type='text/css' href='../styles/wstest.css'>
    </head>

    <body>
        <div id="chat"> 
            <div id='display'>
                <textarea readonly class='display' id="monitor"></textarea>
                <div readonly class='display' id='connected'></div>
            </div>
            <div id="response">
                <form onsubmit='return sendResponse();'>
                    <p><input type='text' autocomplete='off' id='message' placeholder='Say something!'></p>
                </form>
            </div>
        </div>
        <div id="container"></div>
        <script src="packages/jquery.js"></script>
        <script src="packages/kineticjs.js"></script>
        <script src="packages/createjs.js"></script>
        <script src="js/bonusrandomise.js"></script>
        <script src="js/config.js"></script>
        <script src="js/gunship.js"></script>
        <script src="js/controller.js"></script>
        <script src="js/collision.js"></script>
        <script src="js/bullet.js"></script>
        <script src="js/gunshipgalaxy.js"></script>
        <script src="js/sound.js"></script>
        <script src="js/menu.js"></script>
        <script src="js/ai.js"></script>
        <script src="js/endmenu.js"></script>
        <script>
            var handshake=false;
            var serverSideName;
            var connection = new WebSocket("ws://"+window.location.host+"/websocks");
            connection.onopen = function() {
                this.send("HELLO\n" + <%="\""+request.getParameter("real-data")+"\""%>);
            }
            connection.onmessage = function(evt) {
                var message = evt.data.split("\n");
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
            connection.onClose = function() {
                document.getElementById("connected").innerHTML = "";
            }

            function writeToMonitor(message) {
                document.getElementById("monitor").innerHTML+=message+"\n";
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
                        case "#": addPlayer(name,index);break;
                        case "+":
                          if(isServerSideName(name)) {
                            writeToMonitor("You have connected.");
                          } else {
                            addPlayer(name,index);
                          }
                          break;
                        case "-":
                          removePlayer(name,index);
                        break;
                    }
                }
            }

            var currentPlayers = document.getElementById("connected");

            function addPlayer(name, index) {
              var p = document.createElement("p");
              p.id = "_p"+index;
              p.innerHTML = name;
              currentPlayers.appendChild(p);
              writeToMonitor(name+" has connected.");
            }

            function removePlayer(name, index) {
              var p =document.getElementById("_p"+index);
              p.parentNode.removeChild(p);
              writeToMonitor(name+" has disconnected.");
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
                var responseBox = document.getElementById("message");
                if(responseBox.value != '') connection.send("MSG\n"+serverSideName+"\n"+responseBox.value);
                responseBox.value = "";
                responseBox.focus();
                return false;
            }
        </script>
    </body>
</html>
