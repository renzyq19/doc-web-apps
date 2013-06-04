import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
import ArrayListSpaceTracker;
import java.nio.CharBuffer;

public class BroadSocket extends WebSocketServlet {

  ArrayListSpaceTracker<PlayerRoom> rooms
      = new ArrayListSpaceTracker<PlayerRoom>();

  @Override
  public StreamInbound createWebSocketInbound(String protocol) {
    return new PlayerMsgInbound(protocol);
  }

  private class PlayerRoom {

    private ArrayListSpaceTracker<WsOutbound> connected
        = new ArrayListSpaceTracker<WsOutbound>();

    private synchronized void broadcast(CharBuffer msg) {
      try {
        for(WsOutbound out : connected) {
          out.writeTextMessage(CharBuffer.wrap(msg));
        }
      }
      catch (IOException ioe) {}
    }
    
    public int connect(WsOutBound out) {
      int room_id = connected.add(out);
      broadcast(CharBuffer.wrap("Player "+room_id +" has connected.\n"));
    }
  }

  private class PlayerMsgInbound extends MessageInbound {
  
}

}
