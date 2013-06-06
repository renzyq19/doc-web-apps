import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.sql.ResultSet;
import java.io.IOException;

public class RegisterServlet extends HttpServlet {
  private static final String QUERY_SEGMENT 
      = "SELECT * FROM Users WHERE username = ",
                              INSERT_SEGMENT
      = "INSERT INTO Users VALUES ";
  
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse res) {
    String user = req.getParameter("username"),
           pass = req.getParameter("password1");
    try {
      PsqlQuery regQuery = new PsqlQuery();
      ResultSet rs = regQuery.executeQuery(QUERY_SEGMENT + "'" + user+ "';");
      if(rs.next()) {
        sendInvalidReg(res);
        return;
      }
      // The response is right so we redirect it to the homepage with an added cookie
      registerUser(regQuery, user, pass);
      redirectToLogin(res);
    } catch (SQLException e) {
      sendInternalError(res, e.getMessage());
    }
  }

  private void redirectToLogin(HttpServletResponse res) {
    try {
      res.sendRedirect("/login.html");
    } catch (IOException e) {}
  }

  private void registerUser(PsqlQuery dbQuery, String user, String pass)
      throws SQLException {
     String tuple = "('"+user+"','"+pass+"','f')";
     dbQuery.executeUpdate(INSERT_SEGMENT + tuple + ";");
  }

  private void sendInvalidReg(HttpServletResponse res) {
    try {
      res.sendRedirect("/invalidReg.html");
    } catch(IOException ioe) {}
  }

  private void sendInternalError(HttpServletResponse res, String msg) {
    try {
      res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, msg);
    } catch(IOException ioe) {}
  }

}

