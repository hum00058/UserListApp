import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Platform
} from 'react-native'
import UserAvatar from 'react-native-user-avatar'

export default function Users() {
  const [users, setUsers] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async (size = 10) => {
    try {
      const url = `https://random-data-api.com/api/v2/users?size=${size}`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error fetching data')
      }

      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addUsers = async (size) => {
    try {
      const url = `https://random-data-api.com/api/v2/users?size=1`
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Error fetching data')
      }
      const data = await response.json()
      setUsers([data, ...users])
    } catch (error) {
      console.log(error)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    getUsers()
    setRefreshing(false)
  }

  const ItemComponent = ({ item }) => (
    <View style={styles.item}>
      {Platform.OS === 'android' ? (
        <>
          <UserAvatar size={50} src={item.avatar} />
          <View style={styles.names}>
            <Text>{item.first_name}</Text>
            <Text>{item.last_name}</Text>
          </View>
        </>
      ) : (
        <>
          <View style={styles.names}>
            <Text>{item.first_name}</Text>
            <Text>{item.last_name}</Text>
          </View>
          <UserAvatar size={50} src={item.avatar} />
        </>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
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
      <Pressable onPress={() => addUsers(1)}>
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
  list: {
    width: '100%',
    padding: 40
  },
  item: {
    paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd'
  },
  floatingActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2daaf4',
    position: 'absolute',
    bottom: 40,
    right: -160,
    Plus: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      margin: 'auto'
    }
  }
})
