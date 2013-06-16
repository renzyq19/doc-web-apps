package roomutils;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WsOutbound;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.concurrent.atomic.AtomicLong;
import java.nio.CharBuffer;
import java.nio.ByteBuffer;
import java.io.IOException;

public class PMsgInbound extends MessageInbound {

    private static final AtomicLong ID = new AtomicLong();
    private static final RoomList rooms = new RoomList();


    private int roomID = RoomList.NOT_ROOM_INDEX;
    private final PlayerInfo playerInfo = new PlayerInfo();
    private final HttpSession session; // checking purposes


    public PMsgInbound(HttpServletRequest req) {
      session = req.getSession(true);
      String username = (String)session.getAttribute("username");
      if(username == null) {
        username = generateID();
      }
      playerInfo.setUsername(username);
    }

    @Override
    protected void onOpen(WsOutbound out) {
      session.setAttribute("ingame","in");
      playerInfo.setOutbound(out);
    }

    @Override
    protected void onBinaryMessage(ByteBuffer msg) throws IOException{
      throw new IOException("Binary messages unsupported.");
    }

    @Override
    protected void onTextMessage(CharBuffer cb) throws IOException{
      String[] tokens = null;
      try {
        tokens = cb.toString().split(PtclConstants.DELIM);
        if(roomID == RoomList.NOT_ROOM_INDEX) { 
          matchTo(tokens[0],PtclConstants.HANDSHAKE);
          treatHandShake(tokens);
        } else if(tokens[0].equals(PtclConstants.MESSAGE)) {
          treatMessage(tokens);
        } else {/*junk ignored*/ }
      } catch (IndexOutOfBoundsException e) {
        session.getServletContext().log("WS Error - Room communication");
        throw new IOException("Communication with room has failed");
      } catch (Exception e) {
        throw new IOException(e.getMessage());
      }
    }


    // the function expects not-null strings
    private void matchTo(String token, String expected) throws Exception {
      if(!token.equals(expected)) {
        throw new Exception("Tokens didn't match.");
      }
    }

    private synchronized void treatHandShake(String[] tokens)
        throws IndexOutOfBoundsException {
      int reqRoomID = Integer.parseInt(tokens[1]);
      if(reqRoomID == PtclConstants.CREATE_ROOM) {
        roomID  = rooms.createRoom();
      } else {
        rooms.ping(reqRoomID); //throws an exception if it doesn't exist
        roomID  = reqRoomID;
      }
      playerInfo.receive(String.format(
            PtclConstants.HSFORM, playerInfo.getUsername(), roomID));
      rooms.accept(playerInfo, roomID);
    }

    private synchronized void treatMessage(String[] tokens)
        throws IndexOutOfBoundsException {
      if(roomID != RoomList.NOT_ROOM_INDEX) {
        rooms.broadcast(
            String.format(PtclConstants.MSGFORM, tokens[1], tokens[2]), roomID);
      }
    }

    @Override
    protected void onClose(int status) {
      if(roomID != RoomList.NOT_ROOM_INDEX) {
        rooms.disconnect(roomID, playerInfo.getIndex());
        roomID = RoomList.NOT_ROOM_INDEX;
      }
      playerInfo.closeChannel();
      session.removeAttribute("ingame");
    }

    private String generateID() {
      return "Anonymous" + ID.incrementAndGet(); 
    }

  }
