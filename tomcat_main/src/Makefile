CONTEXT = ../webapps/ROOT
CLASS_DIR = $(CONTEXT)/WEB-INF/classes
CLASSES = ArrayListSpaceTracker.class PsqlQuery.class AuthServlet.class
COMPILE_CLASSPATH = .:/usr/share/java/servlet-api.jar
UNNEEDED = *.class

all: $(CLASSES)

install: $(CLASSES)
	install -m600 $(CLASSES) $(CLASS_DIR)

clean:
	rm $(CLASSES)

# some funny class
ArrayListSpaceTracker.class : ArrayListSpaceTracker.java
	javac $^

PsqlQuery.class: PsqlQuery.java
	javac $^

AuthServlet.class: AuthServlet.java
	javac $^
