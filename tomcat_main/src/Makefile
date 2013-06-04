CONTEXT = ../webapps/ROOT
CLASS_DIR = $(CONTEXT)/WEB-INF/classes
CLASSES = HelloServlet.class ArrayListSpaceTracker.class
COMPILE_CLASSPATH = .:/usr/share/java/servlet-api.jar

all: $(CLASSES)

install: $(CLASSES)
	install -m600 $(CLASSES) $(CLASS_DIR)

clean:
	echo */*.class

HelloServlet.class: HelloServlet.java
	javac -cp $(COMPILE_CLASSPATH) HelloServlet.java

# some funny class
ArrayListSpaceTracker.class : ArrayListSpaceTracker.java
	javac $^

