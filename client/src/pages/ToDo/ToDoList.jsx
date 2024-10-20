import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ToDoList.module.css";
import { Button, Input, Modal, Divider, message, Card } from "antd"; // Added missing imports
import { getErrorMessage } from "../../util/GetError";
import { getUserDetails } from "../../util/GetUser";
import ToDoServices from "../../services/toDoServices";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const userId = getUserDetails()?.userId;
      const response = await ToDoServices.getAllToDo(userId);
      setTasks(response.data);
    } catch (err) {
      console.log(err);
      message.error("Failed to load tasks");
    }
  };

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        userId: userId,
      };

      const response = await ToDoServices.createToDo(data);
      console.log(response.data);
      message.success("To Do Task Added!");
      setIsAdding(false);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar active="myTask" />
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Your Tasks</h2>
          <Input
            style={{ width: "50%" }}
            placeholder="Search Your Task Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div>
            <Button onClick={() => setIsAdding(true)} type="primary">
              Add Task
            </Button>
          </div>
        </div>
        <Divider />

        <div className={styles.taskList}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Card key={task._id} className={styles.taskCard}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </Card>
            ))
          ) : (
            <p>No tasks found</p>
          )}
        </div>

        <Modal
          confirmLoading={loading}
          title="Add New To Do Task"
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>
      </section>
    </>
  );
}

export default ToDoList;
