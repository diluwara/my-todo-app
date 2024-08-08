import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TodoCard from "../components/TodoCard";
import todoService from "../services/todoService";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify"; // Add this import
import "react-toastify/dist/ReactToastify.css"; // Add this import

const TodoListPage: React.FC = () => {
  const [todoLists, setTodoLists] = useState<any[]>([]);
  const [newListName, setNewListName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodoLists = async () => {
      const data = await todoService.getTodoLists();
      setTodoLists(data);
    };
    fetchTodoLists();
  }, []);

  const handleCreateTodoList = async () => {
    if (newListName.trim()) {
      const newList = await todoService.createTodoList(newListName);
      setTodoLists([...todoLists, { ...newList, tasks: [] }]);
      setNewListName("");
    }
  };

  const handleDeleteTodoList = async (listId: string) => {
    setListToDelete(listId);
    setDialogOpen(true);
  };

  const confirmDeleteTodoList = async () => {
    if (listToDelete) {
      await todoService.deleteTodoList(listToDelete);
      setTodoLists(todoLists.filter((list) => list.id !== listToDelete));
      toast.success("List deleted successfully!"); // Show toast on successful deletion
      setListToDelete(null);
      setDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setListToDelete(null);
    setDialogOpen(false);
  };

  const handleAddTask = async (listId: string, taskText: string) => {
    const newTask = await todoService.createTask(listId, taskText);
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
      )
    );
  };

  const handleToggleTask = async (listId: string, taskId: string) => {
    await todoService.toggleTask(taskId);
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task: { id: string; completed: any }) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  };

  const handleDeleteTask = async (listId: string, taskId: string) => {
    await todoService.deleteTask(taskId);
    setTodoLists(
      todoLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter(
                (task: { id: string }) => task.id !== taskId
              ),
            }
          : list
      )
    );
  };

  return (
    <>
      <Header />
      <Container>
        <TextField
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New list name"
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleCreateTodoList}
          variant="contained"
          color="primary"
        >
          New List
        </Button>
        <Grid
          container
          spacing={{ xs: 4, md: 5 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ marginTop: "32px", marginBottom: "32px" }}
        >
          {todoLists.map((list) => (
            <Grid size={{ xs: 12, sm: 4, md: 4 }} key={list.id}>
              <TodoCard
                title={list.name}
                items={list.tasks || []}
                onDelete={() => handleDeleteTodoList(list.id)}
                onAddTask={(taskText) => handleAddTask(list.id, taskText)}
                onToggleTask={(taskId) => handleToggleTask(list.id, taskId)}
                onDeleteTask={(taskId) => handleDeleteTask(list.id, taskId)}
              />
            </Grid>
          ))}
        </Grid>
        <Dialog open={dialogOpen} onClose={handleCancelDelete}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this list? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteTodoList} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </Container>
    </>
  );
};

export default TodoListPage;
