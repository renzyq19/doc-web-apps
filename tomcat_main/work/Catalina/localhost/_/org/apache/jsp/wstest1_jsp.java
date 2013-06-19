/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.29
 * Generated at: 2013-06-18 15:52:09 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class wstest1_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html>\n");
      out.write("\n");
      out.write("<html>\n");
      out.write("  <body>\n");
      out.write("    <div id=\"chat\"> \n");
      out.write("      <div id=\"monitor\" style=\"width:400px;height:300px;border:2px solid;overflow-y:scroll;\"></div>\n");
      out.write("      <div id=\"response\">\n");
      out.write("        <textarea id=\"res\" autocomlete=\"off\" placeholder=\"Type something in!\" oninput=\"setResButton()\"></textarea>\n");
      out.write("        <button id=\"res_button\" disabled=\"true\" onclick=\"sendResponse()\">Send</button>\n");
      out.write("      </div>\n");
      out.write("    </div>\n");
      out.write("        <div id=\"container\"></div>\n");
      out.write("        \n");
      out.write("        <script\n");
      out.write("\t\t\tsrc=\"packages/jquery.js\">\n");
      out.write("        </script>\n");
      out.write("        <script \n");
      out.write("\t\t\tsrc=\"packages/kineticjs.js\">\n");
      out.write("        </script>\n");
      out.write("        <script\n");
      out.write("            src=\"packages/createjs.js\">\n");
      out.write("        </script>\n");
      out.write("\t\t<script src=\"js/bonusrandomise.js\"></script>\n");
      out.write("        <script src=\"js/config.js\"></script>\n");
      out.write("        <script src=\"js/gunship.js\"></script>\n");
      out.write("        <script src=\"js/controller.js\"></script>\n");
      out.write("        <script src=\"js/collision.js\"></script>\n");
      out.write("        <script src=\"js/bullet.js\"></script>\n");
      out.write("        <script src=\"js/gunshipgalaxy.js\"></script>\n");
      out.write("        <script src=\"js/sound.js\"></script>\n");
      out.write("        <script src=\"js/menu.js\"></script>\n");
      out.write("\t\t<script src=\"js/ai.js\"></script>\n");
      out.write("\t\t<script src=\"js/endmenu.js\"></script>\n");
      out.write("\n");
      out.write("\n");
      out.write("  <script>\n");
      out.write("    var handshake=false;\n");
      out.write("    var serverSideName;\n");
      out.write("    var connection = new WebSocket(\"ws://\"+window.location.host+\"/websocks\");\n");
      out.write("    connection.onopen = function() {\n");
      out.write("      this.send(\"HELLO>-1\");\n");
      out.write("    }\n");
      out.write("    connection.onmessage = function(evt) {\n");
      out.write("      var message = evt.data.split(\">\");\n");
      out.write("      if(message.length<1 || (!handshake && (message[0] != \"HELLO\"))) {\n");
      out.write("        this.close();\n");
      out.write("        writeToMonitor(\"Sorry, an unpredictable error occured. Maybe you should try again later?\");\n");
      out.write("        return;\n");
      out.write("      }\n");
      out.write("        switch(message[0]) {\n");
      out.write("        case \"HELLO\":\n");
      out.write("          treatHandshake(message); break;\n");
      out.write("        case \"INFO\":\n");
      out.write("          treatInfo(message); break;\n");
      out.write("        case \"MSG\":\n");
      out.write("          treatMessage(message); break;\n");
      out.write("      }\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function writeToMonitor(message) {\n");
      out.write("      document.getElementById(\"monitor\").innerHTML+=message+\"<br>\";\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function treatHandshake(message) {\n");
      out.write("      if(handshake) {\n");
      out.write("        connection.close();\n");
      out.write("        writeToMonitor(\"Sorry, a procedure error occured. Maybe you should try again?\");\n");
      out.write("        return;\n");
      out.write("      }\n");
      out.write("      handshake = true;\n");
      out.write("      serverSideName = message[1];\n");
      out.write("      roomNumber = parseInt(message[2]); \n");
      out.write("      writeToMonitor(\"Handshake successful. Waiting for room ping.\");\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function treatInfo(message) {\n");
      out.write("        var pair, type, index, name;\n");
      out.write("      for(var i=1; i<message.length; ++i) {\n");
      out.write("        pair = message[i].split(\",\");\n");
      out.write("        type = pair[0].substring(0,1);\n");
      out.write("        index = parseInt(pair[0].substring(1));\n");
      out.write("        name = pair[1];\n");
      out.write("        switch(type) {\n");
      out.write("          case \"#\":\n");
      out.write("            writeToMonitor(name+\" is playing with index \"+index+\".\");\n");
      out.write("            break;\n");
      out.write("          case \"+\":\n");
      out.write("            if(isServerSideName(name)) {\n");
      out.write("              writeToMonitor(\"You have connected with index \"+index+\".\");\n");
      out.write("            } else {\n");
      out.write("              writeToMonitor(name+\" has connected and has index \"+index+\".\");\n");
      out.write("            }\n");
      out.write("            break;\n");
      out.write("          case \"-\":\n");
      out.write("            writeToMonitor(name+\" with index \"+index+\" has disconnected.\");\n");
      out.write("            break;\n");
      out.write("        }\n");
      out.write("      }\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function treatMessage(message) {\n");
      out.write("       var prefix = isServerSideName(message[1]) ? \"You\" : message[1];\n");
      out.write("       var monitor = document.getElementById(\"monitor\");\n");
      out.write("       var isAtBottom \n");
      out.write("           = (monitor.scrollTop + monitor.clientHeight >= monitor.scrollHeight);\n");
      out.write("       writeToMonitor(prefix+\" wrote: \"+message[2]);\n");
      out.write("       if(isAtBottom) {\n");
      out.write("         monitor.scrollTop = monitor.scrollHeight - monitor.clientHeight;\n");
      out.write("       }\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function isServerSideName(name) {\n");
      out.write("      return name == serverSideName;\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function setResButton() {\n");
      out.write("      var button = document.getElementById(\"res_button\");\n");
      out.write("      button.disabled = document.getElementById(\"res\").value ==\"\";\n");
      out.write("    }\n");
      out.write("\n");
      out.write("    function sendResponse() {\n");
      out.write("      var responseBox = document.getElementById(\"res\");\n");
      out.write("      connection.send(\"MSG>\"+serverSideName+\">\"+responseBox.value);\n");
      out.write("      responseBox.value = \"\";\n");
      out.write("      responseBox.oninput();\n");
      out.write("    }\n");
      out.write("  </script>\n");
      out.write("  </body>\n");
      out.write("</html>\n");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
