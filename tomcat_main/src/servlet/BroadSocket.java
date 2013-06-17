package servlet;
import database.PsqlQuery;
import roomutils.*;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.concurrent.atomic.AtomicLong;
import java.nio.CharBuffer;
import javax.servlet.ServletException;
import java.io.IOException;

public class BroadSocket extends WebSocketServlet {

  
  @Override
  public StreamInbound createWebSocketInbound(String protocol,
      HttpServletRequest req) {
    return new PMsgInbound(req);
  }


}
