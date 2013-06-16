package roomutils;
import org.apache.catalina.websocket.WsOutbound;
import java.nio.CharBuffer;
import java.io.IOException;

class PlayerInfo {
  private String name;
  private WsOutbound out;
  private int index;

  String getUsername() { return name; }

  int getIndex() { return index; }

  void setUsername(String username) { name = username; }

  void setOutbound(WsOutbound out) { this.out = out; }

  void setIndex(int id) { index = id; }

  void receive(String msg) {
    try {
      out.writeTextMessage(CharBuffer.wrap(msg));
    } catch (IOException e) {}
  }

  void closeChannel() {}

}
