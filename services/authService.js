const { addDoc, collection, serverTimestamp } = require("@firebase/firestore");
const { db } = require("../config/firebase");

const createUser = async (data) => {
  const userData = { ...data, role: "user" };

  const user = await addDoc(collection(db, "users"), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: user.id, ...userData };
};

module.exports = { createUser };
