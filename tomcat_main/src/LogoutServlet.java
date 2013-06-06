import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.io.IOException;
import java.sql.SQLException;

public class LogoutServlet extends HttpServlet {
  
  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse res) {
    
    if(userAuthenticated(req)) {
      try {
        dbUpdate(req, res);
        Cookie killerCookie = new Cookie("username", null);
        killerCookie.setMaxAge(0);
        res.addCookie(killerCookie);
        try {
          res.sendRedirect("/logoutproc.html");
        } catch(IOException ioe) {}
      } catch (SQLException sqle) {
        sendInternalError(res, sqle.getMessage());
      }
    }
  }

  private void sendInternalError(HttpServletResponse res, String msg) {
    try {
      res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, msg);
    } catch(IOException ioe) {}
  }

  private void dbUpdate(HttpServletRequest req, HttpServletResponse res) throws SQLException {
    PsqlQuery updater = new PsqlQuery();
    String user = findCookie(req.getCookies(), "username");
    String change ="UPDATE Users SET loggedIn='f' WHERE username="+"'"+user+"';";
    updater.executeUpdate(change);
  }

  private boolean userAuthenticated(HttpServletRequest req) {
    return true;
  }


  private static String findCookie(Cookie[] cookies, String name) {
      for(Cookie c : cookies) {
        if(c.getName().equals(name)) { return c.getValue(); }
      }
      return null;
    }


}
