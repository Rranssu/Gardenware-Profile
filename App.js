import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import Overview from "./Overview";
import Grades from "./Grades";
import Attendance from "./Attendance";
import Settings from "./Settings";
import Home from "./Home";
import Search from "./Search";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OverviewStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Overview" component={Overview} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Overview") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Grades") {
              iconName = focused ? "school" : "school-outline";
            } else if (route.name === "Attendance") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1C743C",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            paddingVertical: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="Overview" component={OverviewStack} />
        <Tab.Screen name="Grades" component={Grades} />
        <Tab.Screen
          name="Attendance"
          component={Attendance}
          options={{ tabBarBadge: 2 }}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
