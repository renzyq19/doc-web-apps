CONTEXT = ../webapps/ROOT/
CLASS_DIR = $(CONTEXT)WEB-INF/classes/
#LIB_DIR = $(CONTEXT)/WEB-INF/lib
PACKAGE_DIRS = containers/ database/ misc/ roomutils/ servlet/

export CLASS_DIR

.PHONY: all clean install

all: 
	$(foreach dir,$(PACKAGE_DIRS), make -f $(dir).mksrc &&) echo "Done"

install:
	install -d $(addprefix $(CLASS_DIR), $(PACKAGE_DIRS)) && $(foreach dir, $(PACKAGE_DIRS), install -m600  $(dir)*.class $(CLASS_DIR)$(dir) &&) echo "Done" 

clean:
	$(foreach dir,$(PACKAGE_DIRS), make -f $(dir).mksrc clean &&) echo "Done"

