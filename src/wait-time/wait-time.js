function waitTime(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default waitTime;
