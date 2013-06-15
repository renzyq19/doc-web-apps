package servlet;
import database.PsqlQuery;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.RequestDispatcher;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.ServletException;
import java.io.IOException;

public class RegisterServlet extends HttpServlet {
  private static final String QUERY_FORM
      = "SELECT * FROM users WHERE username = '%s';",
                              INSERT_FORM
      = "INSERT INTO users (username, password) VALUES ('%s','%s')";
  
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse res) {
    String user  = req.getParameter("username"),
           pass1 = req.getParameter("password1"),
           pass2 = req.getParameter("password2");
    try {
      if(sessionAuthenticated(req.getSession(true))) {
        forwardTo(req, res, "/protected/alreadyLogged.jsp");
        return;
      }
      PsqlQuery regQuery = new PsqlQuery();
      if(!checkInput(regQuery, user, pass1, pass2)) {
        forwardTo(req, res, "/protected/invalidReg.jsp");
        return;
      }
      registerUser(regQuery, user, pass1);
      forwardTo(req, res, "/login.jsp");
    } catch (SQLException e) {
      sendMessage(res, e.getMessage(),
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

  private boolean checkInput(PsqlQuery query, String user,
      String pass1, String pass2) throws SQLException{
    return user != null && pass1 != null && pass2!=null
        && inRange(user,6,15) && user.matches("[a-zA-z](\\w*)")
        && inRange(pass1,6,15) && pass1.equals(pass2)
        && query.executeQuery(String.format(QUERY_FORM, user)).next();
  }

  private boolean inRange(String credential, int low, int high) {
    return credential.length() >= low && credential.length() <= high;
  }

  private void registerUser(PsqlQuery dbQuery, String user, String pass)
      throws SQLException {
     dbQuery.executeUpdate(String.format(INSERT_FORM,user,pass));
  }

}

