import { initializeApp, firebase } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //enter firebase credentails
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
export default app;
