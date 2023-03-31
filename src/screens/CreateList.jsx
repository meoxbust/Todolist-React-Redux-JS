import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard,
    TouchableNativeFeedback,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import color from "../utils/color";
import { useDispatch } from "react-redux";
import { addList } from "../redux/actions/actions";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";


const colors = [
    "#9ca3af",
    "#dc2626",
    "#d97706",
    "#16a34a",
    "#0284c7",
    "#7c3aed",
    "#f43f5e" 
];


const CreateList = () => {
    const [currentColor, setCurrentColor] = useState(color.primary);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigation();

    const handleCreateList = async () => {
        Keyboard.dismiss()
        try{
            if(!text.trim()) return Alert.alert("List name is required!!!");
            setLoading(true);
            const newInfoList = {
                title: text,
                background: currentColor,
                todos: [],
                createAt: Timestamp.now(),
            };
            const docRef = await addDoc(collection(db, "todos"), newInfoList);
            dispatch(addList({...newInfoList, id: docRef.id}));
            navigate.navigate("Home");
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput
                    value={text}
                    placeholder="ListName?"
                    style={styles.textInput}
                    onChangeText = {(newText) => setText(newText)}
                />
                <View style={styles.wrapColor}>
                    {colors.map((color) => 
                        <TouchableOpacity
                            key={color}
                            onPress={() => setCurrentColor(color)}
                            style={[styles.colorItem, {backgroundColor: color}]}
                        />
                    )}
                </View>
                <TouchableOpacity 
                    onPress={handleCreateList}
                    style={[
                        styles.createButton,
                        { backgroundColor: currentColor, opacity: loading ? 0.5 : 1 },
                ]}>
                    <Text style={styles.createButtonText}>
                        {loading ? <ActivityIndicator color="#fff" /> : "Create"}
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableNativeFeedback>
    );
}
export default CreateList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: { fontSize: 30, fontWeight: "700", color: "#1e293b"},
    textInput: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        width: "100%",
        marginTop: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    wrapColor: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 30,
        gap: 5,
    },
    colorItem: {
        height: 40,
        width: 40,
        borderRadius: 8,
    },
    createButton: {
        marginTop: 30,
        width: "100%",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    createButtonText: { color: color.white, fontSize: 16, fontWeight: "700" },
    closeIcons: { position: "absolute", top: 0, right: 0, padding: 10 },
});
