import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native'
import UserAvatar from 'react-native-user-avatar'

export default function Users() {
  const [users, setUsers] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async (size = 10) => {
    try {
      const url = `https://random-data-api.com/api/v2/users?size=${size}&is_xml=true`
      const data = await fetch(url).then((res) => res.json())
      const filteredData = data.map((item) => {
        return {
          uid: item.uid,
          first_name: item.first_name,
          last_name: item.last_name,
          avatar: item.avatar
        }
      })
      setUsers(filteredData)
    } catch (error) {}
  }

  const addUsers = async (size = 1) => {
    try {
      const url = `https://random-data-api.com/api/v2/users?size=${size}&is_xml=true`
      const data = await fetch(url).then((res) => res.json())
      const filteredData = data.map((item) => {
        return {
          uid: item.uid,
          first_name: item.first_name,
          last_name: item.last_name,
          avatar: item.avatar
        }
      })
      setUsers([...filteredData, ...users])
    } catch (error) {}
  }

  const onRefresh = () => {
    setRefreshing(true)
    getUsers()
    setRefreshing(false)
  }

  const ItemComponent = ({ item }) => (
    <View style={styles.item}>
      <UserAvatar size={50} src={item.avatar} />
      <View style={styles.names}>
        <Text>{item.first_name}</Text>
        <Text>{item.last_name}</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return <ItemComponent item={item} />
        }}
        keyExtractor={(item) => {
          return item.uid
        }}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <Pressable onPress={() => addUsers(2)}>
        <View style={styles.floatingActionButton}>
          <Text style={styles.floatingActionButton.Plus}>+</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48
  },
  item: {
    width: '100%',
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1
  },
  floatingActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2daaf4',
    position: 'absolute',
    bottom: 20,
    right: -160,
    Plus: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      margin: 'auto'
    }
  }
})
