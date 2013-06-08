import javax.servlet.http.HttpSessionListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionEvent;
import java.sql.SQLException;

public class TimeoutListener implements HttpSessionListener {

  private static final String DB_LOGOUT_FORM
      = "UPDATE users SET sessionid = NULL WHERE sessionid = '%s';";

  @Override
  public void sessionCreated(HttpSessionEvent se) {}

  @Override
  public void sessionDestroyed(HttpSessionEvent se) {
    try {
      logoutDB(se.getSession().getId());
    } catch (SQLException sqle) {} //not sure what to do about this one
  }

  private void logoutDB(String sessionId) throws SQLException {
    PsqlQuery logoutQuery = new PsqlQuery();
    logoutQuery.executeUpdate(String.format(DB_LOGOUT_FORM, sessionId));
  }

}
