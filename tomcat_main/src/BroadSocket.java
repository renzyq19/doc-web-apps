import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Cookie;
import ArrayListSpaceTracker;
import java.nio.CharBuffer;
import java.io.IOException;

public class BroadSocket extends WebSocketServlet {

  private ArrayListSpaceTracker<PlayerRoom> rooms
      = new ArrayListSpaceTracker<PlayerRoom>();

  private static final String INFO_PREFIX = "#",
                              CONN_PREFIX = "+",
                              HANG_PREFIX = "-",
                              MSG_PREFIX  = "$";

  @Override
  public StreamInbound createWebSocketInbound(String protocol,
                                              HttpServletRequest req) {
    return new PlayerMsgInbound(protocol, req);
  }

  private class Player {
    private final String name;
    private final WsOutbound outchannel;

    public Player(String name, WsOutbound out) {
      this.name = name;
      this.outChannel = out;
    }

    public void sendMessage(CharBuffer msg) throws IOException {
      out.writeTextMessage(msg);
      out.flush();
    }

    public String getName() { return name; }

  }

  private class PlayerRoom {

    private ArrayListSpaceTracker<Player> players
        = new ArrayListSpaceTracker<Player>();
    private final Player owner;

    public PlayerRoom(Player owner) {
       this.owner = owner;
    }

    public boolean isOwner(Player owner) {
    // I'll see if it needs overriding of equals, but for now it shouldn't
      return owner == this.owner;
    }

    public int connect(Player p) {
      int room_id = players.add(p);
      broadcast(CharBuffer.wrap(CONN_PREFIX + p.getName()));
      return room_id;
    }

    public void disconnect(int id) {
      Player p = players.erase(id);
      if(p != null) { broadcast(CharBuffer.wrap(HANG_PREFIX + p.getName())); }
    }

    public void closeRoom() {
      broadcast(CharBuffer.wrap(HANG_PREFIX+HANG_PREFIX));
    }

    public String presentRoom() {
      String presentation = INFO_PREFIX + owner.getName();
      for(Player p : players) {
        presentation = presentation + INFO_PREFIX + p.getName();
      }
      return presentation; 
    }

    private synchronized void broadcast(CharBuffer msg) {
      try {
        for(Player p : players) {
          p.sendMessage(CharBuffer.wrap(msg));
        }
      }
      catch (IOException ioe) {}
    }
    
  }

  private class PlayerMsgInbound extends MessageInbound {

    private final int room_id, p_idx;
    private final WsOutbound outbound;
    

    public PlayerMsgInbound(HttpServletRequest req) {
      Cookie[] cookies = req.getCookies();
      room_id = PlayerMsgInbound.findCookie(cookies, "username");
    }

    private static String findCookie(Cookie[] cookies, String name) {
      for(Cookie c : cookies) {
        if(c.getName().equals(name)) { return c.getValue(); }
      }
      return null;
    }
  }

}
