import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import color from "../utils/color.js";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading.jsx";
import useFetch from "../hooks/useFetch.js";
import { getTodos } from "../services/todos.js";
import { getList } from "../redux/actions/actions.js";
import ListToDoItem from "../components/ListTodoItem.jsx";

const Home = () => {
    const { listTodo } = useSelector((state) => state.app);
    const { data, error, loading } = useFetch("getTodos", getTodos);

    const dispatch = useDispatch();
    const navigate = useNavigation();

    useEffect(() => {
        if (data.length === 0) return;
        dispatch(getList(data));
    }, [data.length]);

    if (loading) return <Loading />;

    if (error) return <Text>Server is not found...</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.todoTitle}>
                <View style={styles.wrap}>
                    <View style={styles.divider} />
                    <View
                        style={{
                            paddingHorizontal: 30,
                            flexDirection: "row",
                            gap: 5,
                        }}
                    >
                        <Text style={styles.title}>Todo</Text>
                        <Text style={[styles.title, styles.textBlue]}>
                            List
                        </Text>
                    </View>
                    <View style={styles.divider} />
                </View>
                <TouchableOpacity
                    onPress={() => navigate.navigate("CreateList")}
                >
                    <View style={styles.addButton}>
                        <AntDesign
                            name="plus"
                            size={30}
                            color={color.primary}
                        ></AntDesign>
                    </View>
                    <Text style={styles.addList}>Add List</Text>
                </TouchableOpacity>
            </View>

            {listTodo.length > 0 ? (
                <FlatList
                    ItemSeparatorComponent={() => (
                        <View style={{ width: 10 }} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({ title }) => title}
                    horizontal={true}
                    data={listTodo}
                    renderItem={({ item }) => <ListToDoItem item={item} />}
                />
            ) : (
                <View style={styles.viewTodoEmty}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        Not todo...
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 50,
    },
    todoTitle: {
        paddingVertical: 100,
        alignItems: "center",
    },
    wrap: {
        flexDirection: "row",
        gap: 5,
    },
    divider: {
        backgroundColor: color.primary,
        flex: 1,
        height: 1,
        alignSelf: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
    },
    textBlue: {
        color: color.primary,
        fontWeight: "500",
    },
    addButton: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: color.primary,
        padding: 4,
        borderRadius: 50,
        alignItems: "center",
        width: 50,
        height: 50,
        justifyContent: "center",
    },
    addList: {
        marginTop: 10,
        marginRight: 5,
        color: color.primary,
    },
});
