export const createMutex = () => {
  let token = true;
  return (f: any, g?: any) => {
    if (token) {
      token = false;
      try {
        f();
      } finally {
        token = true;
      }
    } else if (g !== undefined) {
      g();
    }
  };
};

const mutex = createMutex();
mutex(() => {
  console.log("hello");
  mutex(() => {
    console.log("second");
  });
});
