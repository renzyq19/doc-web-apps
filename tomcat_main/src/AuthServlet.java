import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.sql.ResultSet;
import java.io.PrintWriter;
import java.io.IOException;
import java.sql.SQLException;


public class AuthServlet extends HttpServlet {

  public static final String QUERY_SEGMENT 
      = "SELECT password FROM Users WHERE username = "; 
  @Override
  public void doPost(HttpServletRequest request,
                     HttpServletResponse response) {
    String user = request.getParameter("username"),
           pass = request.getParameter("password");
    try {
      PsqlQuery authQuery = new PsqlQuery();
      ResultSet rs = authQuery.executeQuery(QUERY_SEGMENT + "'" + user + "';");
      if(!rs.next() || !rs.getString("password").equals(pass)) {
        sendInvalidLogin(response);
        return;
      }
      // The response is right so we redirect it to the homepage with an added cookie
      authenticateUser(authQuery, response, user);
    } catch (SQLException e) {
      sendInternalError(response, e.getMessage());
    }
  }
  private void sendInvalidLogin(HttpServletResponse res) {
    try {
      res.sendRedirect("/invalidLogin.html");
    } catch(IOException ioe) {}
  }

  private void sendInternalError(HttpServletResponse res, String msg) {
    try {
      res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, msg);
    } catch(IOException ioe) {}
  }

  private void authenticateUser(PsqlQuery query,HttpServletResponse res, String user) throws SQLException{
    try {
      String update = "UPDATE Users SET loggedIn='t' WHERE username="+"'"+user+"';";
      query.executeUpdate(update);
      res.addCookie(new Cookie("username",user));
      res.sendRedirect("/hello.html");
    } catch (IOException ioe) {}
  }
}
