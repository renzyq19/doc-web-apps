package roomutils;
import containers.*;
import java.nio.CharBuffer;

class RoomList {

  final static int NOT_ROOM_INDEX = -1;

  private final ReuseList<ReuseList<PlayerInfo> > rooms
      = new ReuseList<ReuseList<PlayerInfo> >();

  synchronized void accept(PlayerInfo player, int roomID) throws Exception {
    String info = createRoomInfo(roomID);
    player.setIndex(rooms.get(roomID).add(player));
    player.receive(info);
    broadcast(getConnString(player), roomID);
  }

  synchronized void ping(int roomID) throws Exception {
    rooms.get(roomID);
  }

  synchronized void disconnect(int roomID, int pID) {
    try {
      ReuseList<PlayerInfo> reqRoom = rooms.get(roomID);
      PlayerInfo player = reqRoom.erase(pID);
      if(reqRoom.size()<=0) {
        rooms.erase(roomID);
      } else {
        broadcast(getDisconnString(player),roomID);
      }
    } catch (Exception e) {}
  }

  synchronized int createRoom() {
    return rooms.add(new ReuseList<PlayerInfo>());
  }

  synchronized void broadcast(final String msg, int roomID) throws Exception {
    rooms.get(roomID).foreach(new Function<PlayerInfo>() {

      @Override
      public void apply(PlayerInfo player) {
        player.receive(msg);
      }
    });
  }

  private String createRoomInfo(int roomID) throws Exception {
    final CharBuffer info = CharBuffer.allocate(512);
    Function<PlayerInfo> acc = new Function<PlayerInfo>() {
      @Override
      public void apply(PlayerInfo player) {
        info.put(String.format(
            PtclConstants.INFO_CURRENT + "%d-%s" + PtclConstants.DELIM, 
            player.getIndex(), player.getUsername()));
      }
    };
    CharBuffer.put("");
    rooms.get(roomID).foreach(acc);
    return String.format(PtclConstants.INFORM,acc.toString());
  }

  //Warning! Assumes player is already connected
  private String getConnString(PlayerInfo player) {
    String notification = String.format(
        PtclConstants.INFO_CONN + "%d-%s" + PtclConstants.DELIM,
        player.getIndex(), player.getUsername());
    return String.format(PtclConstants.INFORM, notification);
  }

  private String getDisconnString(PlayerInfo player) {
    String notification = String.format(
        PtclConstants.INFO_DISCONN + "%d-%s" + PtclConstants.DELIM,
        player.getIndex(), player.getUsername());
    return String.format(PtclConstants.INFORM, notification);
  }
}
