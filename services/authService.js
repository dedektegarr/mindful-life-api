const { addDoc, collection, serverTimestamp } = require("@firebase/firestore");
const { db } = require("../config/firebase");

const createUser = async ({ name, username, email, password }) => {
  const userData = { name, username, email, role: "user", password };

  const user = await addDoc(collection(db, "users"), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: user.id, ...userData };
};

module.exports = { createUser };
