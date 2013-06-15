package servlet;
import database.PsqlQuery;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.RequestDispatcher;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.sql.SQLException;


public class AuthServlet extends HttpServlet {

  private static final String Q_FORM 
      = "SELECT password FROM users WHERE username = '%s';",
                              U_FORM
      = "UPDATE users SET sessionid ='%s' WHERE username = '%s';";

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
      if(sessionAuthenticated(session)) {
        forwardTo(req, res, "/protected/alreadyLogged.jsp");
        return;
      }
      if(inconsistentValues(user,pass)) {
        sendMessage(res, "", HttpServletResponse.SC_BAD_REQUEST);
        return;
      }
      if(!authenticateUser(res, user, pass, session.getId())) {
        forwardTo(req, res,"/protected/invalidLogin.html");
        return;
      }
      setSessionInfo(session,user);
      forwardTo(req, res,"/hello.jsp");
    } catch (SQLException e) {
      sendMessage(res, e.getMessage(), 
          HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    } 
  }

  private boolean sessionAuthenticated(HttpSession session) {
    return session.getAttribute("username") != null ;
  }

  private boolean inconsistentValues(String user, String pass) {
    return (user == null || pass == null);
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

  private void sendMessage(HttpServletResponse res, String msg, int st) {
    try {
      res.sendError(st, msg);
    } catch(IOException ioe) {}
  }

  private boolean authenticateUser(HttpServletResponse res, 
      String user, String pass, String sessionId) throws SQLException {
      PsqlQuery authQuery = new PsqlQuery();
      ResultSet rs = authQuery.executeQuery(String.format(Q_FORM, user));
      if(!rs.next() || !rs.getString("password").equals(pass)) {
        return false;
      }
      authQuery.executeUpdate(String.format(U_FORM, sessionId, user));
      return true;
  }

  private void setSessionInfo(HttpSession session, String user) {
    session.setAttribute("username", user);
  }
}
