package containers;

class SpaceTrack<E> {
  public E elem;
  public boolean available;

  public SpaceTrack(E elem, boolean available) {
    this.elem = elem;
    this.available = available;
  }
}


