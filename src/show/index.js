function Show(props) {
  if (!props.show) {
    return null;
  }

  return props.children;
}

export default Show;
