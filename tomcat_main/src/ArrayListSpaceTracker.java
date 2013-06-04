import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Iterator;

public class ArrayListSpaceTracker<E> implements Iterable<E>{
  private ArrayList<E> used = new ArrayList<E>(0);
  private LinkedList<Integer> free = new LinkedList<Integer>();

  public synchronized int add(E elem) {
    if(free.size() != 0) {
      int pos = free.pop();
      used.set(pos, elem);
      return pos;
    }
    used.add(elem);
    return used.size()-1;
  }

  public synchronized void erase(int pos) {
    try {
      used.set(pos, null);
      free.push(pos);
    } catch (IndexOutOfBoundsException be) {}
  }

  public E get(int pos) {
    return used.get(pos);
  }

  public Iterator<E> iterator() {
    return used.iterator();
  }
}
