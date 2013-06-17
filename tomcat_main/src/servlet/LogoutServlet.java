package servlet;
import database.PsqlQuery;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import java.io.IOException;
import java.sql.SQLException;

public class LogoutServlet extends HttpServlet {
  
  private static final String DB_LOGOUT_SEGM = "UPDATE users SET sessionid=NULL WHERE username='%s'; ";
  
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse res) {
      sendMessage(res, "", HttpServletResponse.SC_METHOD_NOT_ALLOWED);
  }

  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse res) {
    HttpSession session = req.getSession(true);
    try {
      if(!sessionAuthenticated(session)) {
        forwardTo(req,res, "/protected/guestLogout.jsp");
        return;
      }
      dbUpdate((String)session.getAttribute("username"));
      resetSessionInfo(session);
      forwardTo(req, res, "/hello.jsp");
    } catch (SQLException sqle) {
      sendMessage(res, sqle.getMessage(),
          HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }

  private boolean sessionAuthenticated(HttpSession session) {
    return session.getAttribute("username") != null ;
  }

  private void forwardTo(HttpServletRequest req,
      HttpServletResponse res, String URL) {
    try {
      RequestDispatcher rd = req.getRequestDispatcher(URL);
      rd.forward(req,res);
    } catch(IOException ioe) {}
      catch(ServletException se) {
      sendMessage(res, "", HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  }


  private void sendMessage(HttpServletResponse res, String msg, int status) {
    try {
      res.sendError(status, msg);
    } catch(IOException ioe) {}
  }

  private void dbUpdate(String user) throws SQLException {
    PsqlQuery updater = new PsqlQuery();
    updater.executeUpdate(String.format(DB_LOGOUT_SEGM, user));
  }

  private void resetSessionInfo(HttpSession session){
    session.removeAttribute("username");
  }
}
