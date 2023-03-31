import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import Home from "./src/screens/Home";
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack"; 
import ListTodoDetail from "./src/screens/ListTodoDetail";
import CreateList from "./src/screens/CreateList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ListTodoDetail" component={ListTodoDetail} />
          <Stack.Screen name="CreateList" component={CreateList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
