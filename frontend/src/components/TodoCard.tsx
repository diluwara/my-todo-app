import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoCardProps {
  title: string;
  items?: TodoItem[];
  onDelete: () => void;
  onAddTask: (taskText: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  title,
  items = [],
  onDelete,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addItem = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue.trim());
      setInputValue("");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const confirmRemoveItem = (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDeleteTask(taskId);
    }
  };

  return (
    <Card
      style={{
        minWidth: "300px",
        border: "1px solid black",
        height: "370px",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent style={{ padding: 0, flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid black",
            padding: "5px 5px 5px 30px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ margin: 0 }}>{title}</h3>
          <IconButton onClick={onDelete}>
            <CloseIcon style={{ color: "red", fontSize: "2rem" }} />
          </IconButton>
        </div>
        <ul
          style={{
            flexGrow: 1,
            margin: 0,
            padding: "10px 20px",
            overflowY: "auto",
          }}
        >
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Checkbox
                  checked={item.completed}
                  onChange={() => onToggleTask(item.id)}
                />
                <span
                  style={{
                    textDecoration: item.completed ? "line-through" : "none",
                    color: item.completed ? "grey" : "black",
                  }}
                >
                  {item.text}
                </span>
              </div>
              <IconButton onClick={() => confirmRemoveItem(item.id)}>
                <CloseIcon />
              </IconButton>
            </li>
          ))}
        </ul>
      </CardContent>
      <Box
        sx={{
          height: "50px",
          padding: "5px",
          borderTop: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <input
          type="text"
          placeholder="Type here to add to the list"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            padding: "0px",
            boxSizing: "border-box",
          }}
        />
        <button
          onClick={addItem}
          style={{ marginLeft: "10px", height: "100%", width: "70px" }}
        >
          Add
        </button>
      </Box>
    </Card>
  );
};

export default TodoCard;
