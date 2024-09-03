import { View, Text } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'
// import { Tabs } from 'expo-router'
// import TabBar from '../../components/TabBar'

const _layout = () => {
  return (
    <>
    {/* <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
        
    </Tabs> */}
    <StatusBar style='light' />
    </>
    
  )
}

export default _layout