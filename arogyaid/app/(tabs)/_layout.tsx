import { Tabs } from 'expo-router';
import RecordsIcon from '../../assets/images/records'
import HomeIcon from '../../assets/images/home'
import EcoIcon from '../../assets/images/ecosystem'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name="Ecosystem"
      options={{
        title: 'Ecosystem',
        headerShown:false,
        tabBarIcon: ({ color }) => <EcoIcon height={24} color={color}/>,
      }} />
      <Tabs.Screen name="index" options={{
          title: 'Home',
          headerShown:false,
          tabBarIcon: ({ color }) => <HomeIcon height={24} color={color}/>,
        }}/>
      
      <Tabs.Screen name="Records" options={{
          title: 'Records',
          headerShown:false,
          tabBarIcon: ({ color }) => <RecordsIcon height={24} color={color}/>,
        }}/>
    </Tabs>
  );
}
