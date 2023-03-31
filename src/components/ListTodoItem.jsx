import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import color from "../utils/color";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { deleteList } from "../redux/actions/actions";
import AntDesign from "react-native-vector-icons/AntDesign";
import { doc, getDoc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { getTodos } from "../services/todos";
import { getList } from "../redux/actions/actions";

const ListToDoItem = (props) => {
    const { item } = props;
    const dispatch = useDispatch();

    const handleDeleteList = async () => {
        await deleteDoc(doc(db, "todos", item.id));
        dispatch(deleteList(item.id));
    };

    const { data, error, loading } = useFetch("getTodos", getTodos);

    useEffect(() => {
        if (data?.length === 0) return;
        dispatch(getList(data));
    }, [data?.length]);

    const remaining = item.todos.filter((td) => !td.completed).length;
    const completed = item.todos.filter((td) => td.completed).length;
    const navigate = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigate.navigate("ListTodoDetail", { id: item.id })}
        >
            <View
                style={[styles.listTodo, { backgroundColor: item.background }]}
            >
                <TouchableOpacity onPress={() => handleDeleteList()}>
                    <AntDesign name="delete" size={30} color={color.white} />
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.listTodoTitle}>
                    {item.title}
                </Text>
                <View style={styles.listTodoWrap}>
                    <Text style={styles.listTodoNumber}>{remaining}</Text>
                    <Text style={styles.listTodoText}>Remaining</Text>
                </View>
                <View style={styles.listTodoWrap}>
                    <Text style={styles.listTodoNumber}>{completed}</Text>
                    <Text style={styles.listTodoText}>Completed</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default ListToDoItem;

const styles = StyleSheet.create({
    listTodo: {
        height: "100%",
        padding: 30,
        width: 250,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    listTodoTitle: {
        fontSize: 30,
        fontWeight: "700",
        color: color.white,
        textAlign: "center",
    },
    listTodoNumber: {
        color: color.white,
        fontSize: 35,
        fontWeight: "700",
    },
    listTodoText: {
        color: color.white,
        fontSize: 16,
        fontWeight: "600",
    },
    listTodoWrap: {
        alignItems: "center",
    },
});
