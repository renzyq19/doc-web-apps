import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.ResultSet;
import java.io.PrintWriter;
import java.io.IOException;
import java.sql.SQLException;


public class AuthServlet extends HttpServlet {

  private static final String QUERY_SEGMENT 
      = "SELECT password FROM users WHERE username = ",
                              UPDATE_SEGMENT
      = "UPDATE users SET sessionid = ";

  @Override
public void doGet(HttpServletRequest req, HttpServletResponse res) {
  sendMessage(res, "", HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}

  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse res) {
    String user = req.getParameter("username"),
           pass = req.getParameter("password");
    HttpSession session = req.getSession(true);
    try {
      if(inconsistentValues(user,pass)) {
        sendMessage(res, "", HttpServletResponse.SC_BAD_REQUEST);
        return;
      }
      if(session.getAttribute("username") != null) {
        redirectTo(res,"/alreadyLogged.jsp");
        return;
      }
      if(!authenticateUser(res, user, pass, session.getId())) {
        redirectTo(res,"/invalidLogin.html");
        return;
      }
      setSessionInfo(session,user);
      redirectTo(res,"/hello.jsp");
      return;
    } catch (SQLException e) {
      sendMessage(res, e.getMessage(), 
          HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    } 
  }

  private boolean inconsistentValues(String user, String pass) {
    return (user == null || pass == null);
  }

  private void redirectTo(HttpServletResponse res, String resource) {
    try {
      res.sendRedirect(resource);
    } catch(IOException ioe) {}
  }

  private void sendMessage(HttpServletResponse res, String msg, int st) {
    try {
      res.sendError(st, msg);
    } catch(IOException ioe) {}
  }

  private boolean authenticateUser(HttpServletResponse res, 
      String user, String pass, String sessionId) throws SQLException {
      PsqlQuery authQuery = new PsqlQuery();
      ResultSet rs = authQuery.executeQuery(QUERY_SEGMENT + "'" + user + "';");
      if(!rs.next() || !rs.getString("password").equals(pass)) {
        return false;
      }
      String update = UPDATE_SEGMENT + "'" + sessionId + "'" + 
          "WHERE username = " + "'" + user + "'";
      authQuery.executeUpdate(update);
      return true;
  }

  private void setSessionInfo(HttpSession session, String user) {
    session.setAttribute("username", user);
    session.setMaxInactiveInterval(900);
  }
}
