function testContext(namespace) {
  const tests = [];

  async function add(msg, fn) {
    tests.push([msg, fn]);
  }

  async function run() {
    console.log(namespace);
    try {
    for (const [index, [msg, test]] of tests.entries()) {
      try {
        console.log(`\t${msg}`);
        await test();
      } catch (e) {
        throw new Error(console.log(`Test Failed: ${msg} \n${e}`));
        continue;
      }
    }
    } catch(e) {
      console.log(`${namespace} test Run failed`);
      process.exit(1);
    }
  }
  return {
    add,
    run
  };
}

module.exports = {
  testContext
};
