import { View, Text } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"

const TodoItem = ({ item, background, handleChange, handleDelete }) => {
    return (
        <TouchableOpacity
            style={{
                padding: 10,
                borderWidth: 1,
                borderColor: background,
                borderRadius: 5,
                flexDirection: "row",
                alignItems: "center",
            }}
            key={item.id}
            onPress={() => handleChange(item.id)}
        >
            <Checkbox
                value={item.completed}
                onValueChange={() => handleChange(item.id)}
                color={item.completed ? background : undefined}
                style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "600", flex: 1 }}>{item.name}</Text>
            <TouchableOpacity
                style={{ flex: 1, alignItems: "flex-end" }}
                onPress={() => handleDelete(item.id)}
            >
                <AntDesign name="delete" size={30} color={"#71717a"} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default TodoItem;
