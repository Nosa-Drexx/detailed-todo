function id() {
  var randomId = "_";
  const fakeIdGen = () => Math.floor(Math.random() * 9);
  for (let i = 0; i < 10; i++) {
    randomId += fakeIdGen();
  }
  return randomId;
}
export default id;
