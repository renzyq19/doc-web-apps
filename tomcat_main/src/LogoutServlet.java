import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Cookie;
import java.io.IOException;

public class LogoutServlet extends HttpServlet {
  
  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse res) {
    
    if(userAuthenticated(req)) {
      Cookie killerCookie = new Cookie("username", null);
      killerCookie.setMaxAge(0);
      res.addCookie(killerCookie);
      try {
        res.sendRedirect("/logoutproc.html");
      } catch(IOException ioe) {}
    }
  }

  private boolean userAuthenticated(HttpServletRequest req) {
    return true;
  }
}
