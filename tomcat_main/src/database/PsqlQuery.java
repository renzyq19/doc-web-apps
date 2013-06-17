package database;
import org.postgresql.Driver;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;

public class PsqlQuery {

  private final static String CONN_STR 
      = "jdbc:postgresql://db.doc.ic.ac.uk/g1227107_u",
                              DB_USER = "g1227107_u",
                              DB_PASS = "krCgD6QJtX";

  private Connection db_conn;
  private Statement stmt;

  public PsqlQuery() throws SQLException{
    db_conn = DriverManager.getConnection(CONN_STR, DB_USER, DB_PASS);
    stmt = db_conn.createStatement();

  }

  public ResultSet executeQuery(String req) throws SQLException {
    // non-atomic query
    return stmt.executeQuery(req);
  }

  public void executeUpdate(String insert) throws SQLException {
    stmt.executeUpdate(insert);
  }

  public void finish() throws SQLException{
    db_conn.close();
  }
}

  
