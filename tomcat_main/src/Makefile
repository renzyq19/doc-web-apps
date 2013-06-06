CONTEXT = ../webapps/ROOT
CLASS_DIR = $(CONTEXT)/WEB-INF/classes
#LIB_DIR = $(CONTEXT)/WEB-INF/lib
CLASSES = ArrayListSpaceTracker.class PsqlQuery.class AuthServlet.class LogoutServlet.class RegisterServlet.class TimeoutListener.class
#JARS = UserInfo.jar

.SUFFIXES: .class .java

all: $(CLASSES)

install: $(CLASSES)
	install -m600 $(CLASSES) $(CLASS_DIR)

clean:
	rm -f $(CLASSES) $(JARS)

%.class : %.java
	javac $^

