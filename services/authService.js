const { addDoc, collection } = require("@firebase/firestore");
const { db } = require("../config/firebase");

const createUserAccount = async (email, password) => {
  const user = await addDoc(collection(db, "users"), { email, password });
  return user;
};

module.exports = { createUserAccount };
