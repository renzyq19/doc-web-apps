<!DOCTYPE html>

<html>
    <head>
        <title>Websocket test</title>
        <link rel='stylesheet' type='text/css' href='styles/main.css'>
        <link rel='stylesheet' type='text/css' href='styles/wstest.css'>
    </head>
    <body>
        <div id="dump" > 
            <textarea readonly id="monitor"> </textarea>
            <div id="response" >
                <form method='post'>
                    <p><input type='text' id='message' name='message' placeholder='Write something...'></p>
                    <p><input type='submit' value='Send' id='submit'></p>
                </form>
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
