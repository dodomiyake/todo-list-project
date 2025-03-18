import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../../store/todosSlice';
import { RootState } from '../../store';


export default function TodoList() {
  const dispatch = useDispatch<any>();
  const { data: todos, status, error } = useSelector((state: RootState) => state.todos);
  const [title, setTitle] = useState('');


  // Fetch todos when the component mounts
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    console.log('📝 Current Todos:', todos);
  }, [todos]); // Log whenever todos update

  // Function to add a new todo
  const handleAddTodo = async () => {
    if (title.trim()) {
      await dispatch(addTodo(title));  // Wait for the todo to be added
      dispatch(fetchTodos());          // Immediately fetch updated list
      setTitle('');
    }
  };

  // Function to toggle the completed status of a todo
  const handleToggleTodo = async (id: string, completed: boolean) => {
    await dispatch(updateTodo({ id, updates: { completed: !completed } }));
    dispatch(fetchTodos()); // Ensure UI updates immediately
  };
  

  // Function to delete a todo
  const handleDeleteTodo = async (id: string) => {
    await dispatch(deleteTodo(id));  // Wait for delete action
    dispatch(fetchTodos());         // Immediately refresh the list
  };

  if (status === 'loading') return <ActivityIndicator size="large" color="#0000ff" />;
  if (status === 'failed') return <Text>Error: {error}</Text>;

  return (
    <View style={{ padding: 20 }}>
      {/* Input Field to Add Todo */}
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>📋 Todo List</Text>
      <TextInput
        placeholder="Enter a new todo..."
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />

      {/* Ensure `todos` is defined before rendering */}
      {todos?.length === 0 ? (
        <Text>No todos available. Add some!</Text>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id} // Fixed keyExtractor
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
              }}
            >
              {/* Todo Title with Strikethrough if Completed */}
              <TouchableOpacity onPress={() => handleToggleTodo(item.id, item.completed)}>
                <Text
                  style={{
                    fontSize: 18,
                    textDecorationLine: item.completed ? 'line-through' : 'none',
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <Button title="❌" color="Oxblood" onPress={() => handleDeleteTodo(item.id)} />
            </View>
          )}
        />
      )}
    </View>
  );
}
