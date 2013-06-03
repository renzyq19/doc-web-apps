import java.io.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {

  public void doGet(HttpServletRequest request,
                    HttpServletResponse response) {

    String VisitorIP = request.getRemoteAddr();
    response.setContentType("text/html");
    
    try {
      PrintWriter out = response.getWriter();
      out.print("The address you connected to us is "+ VisitorIP);
    }
    catch(IOException ioe){
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }
  
  }
}
