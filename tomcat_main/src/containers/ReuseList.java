package containers;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Iterator;

public class ReuseList<E> {

  private ArrayList<SpaceTrack<E> > used = new ArrayList<SpaceTrack<E> >(0);
  private LinkedList<Integer> free = new LinkedList<Integer>();

  public E erase(int pos) throws IndexOutOfBoundsException {
    SpaceTrack<E> space = used.get(pos);
    space.available = false;
    free.push(pos);
    return space.elem;
  }

  public int add(E elem) {
    if(free.size() != 0) {
      int pos = free.pop();
      used.get(pos).elem = elem;
      return pos;
    }
    used.add(new SpaceTrack<E>(elem, true));
    return used.size()-1;
  }

  public E get(int pos) throws IndexOutOfBoundsException {
    SpaceTrack<E> space = used.get(pos);
    if(!space.available) {
      throw new IndexOutOfBoundsException("");
    }
    return space.elem;
  }

  public void foreach(Function<E> function) {
    for(SpaceTrack<E> space : used) {
      if(space.available) {
        function.apply(space.elem);
      }
    }
  }

  public int size() {
    return used.size() - free.size();
  }
}
