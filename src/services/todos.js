import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";

export const getTodos = async () => {
    const list = [];
    const q = query(collection(db, "todos"), orderBy("createAt", "desc"));
    const querySnapShot = await getDocs(q);
    querySnapShot?.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
    });
    return list;
};
