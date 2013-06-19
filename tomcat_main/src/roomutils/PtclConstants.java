package roomutils;

class PtclConstants {
  static final String HANDSHAKE    = "HELLO",
                      MESSAGE      = "MSG",
                      INFO         = "INFO", //strictly server-side
                      INFO_CONN    = "+",
                      INFO_DISCONN = "-",
                      INFO_CURRENT = "#",
                      DELIM        = "\n",
                      HSFORM       = HANDSHAKE + DELIM + "%s"
                                     + DELIM + "%d",
                      INFORM       = INFO + DELIM + "%s",
                      MSGFORM      = MESSAGE + DELIM + "%s" + DELIM + "%s";

  static final int CREATE_ROOM     = -1;
} 
