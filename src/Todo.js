import {
    Button,
    Card,
    Col,
    Divider,
    Input,
    Row,
    Space,
    Typography,
  } from "antd";
  import styled from "styled-components";
  import {useState} from "react"
  
  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 16px 24px;
  `;

  function Todo() {
    const [tasks, setTasks] = useState([])
    const [input, setInput] = useState({
      task_name: ""
    })
    const hdTaskNameChange = evt => {
      setInput({
        ...input,
        [evt.target.name]: evt.target.value
      })
    }

    const addTask = (id) => {
      if(input.task_name != ""){
        setTasks([
          ...tasks,
          {
            id: id,
            name: input.task_name,
            sub_task: []
          }
        ])
        setInput({
          ...input,
          task_name: ""
        })
      }
    }

    const addSubTask = (id, subTaskId) => {
      setTasks(
        tasks.map(task => 
          task.id == id  ? { ...task, sub_task: [ ...task.sub_task, {id: subTaskId, name: input[subTaskName(task)], done: false}]}: task
        )
      )
      setInput({
        ...tasks,
        [subTaskName(tasks.filter(elem => elem.id == id))]: ""
      })
    }

    const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id))
    }

    const deleteSubTask = (id, subTaskId) => {
      setTasks(
        tasks.map(task => 
          task.id == id ? { ...task, sub_task: task.sub_task.filter(elem => elem.id != subTaskId)}: task
        )
      )
    }

    const doneSubTask = (id, subTaskId) => {
      setTasks(
        tasks.map(task => 
          task.id == id ? { ...task, sub_task: task.sub_task.map(sub => sub.id == subTaskId ? {...sub, done: !sub.done}: sub)}: task
        )
      )
    }

    const duplicateTask = (id) => {
      const dupTask = tasks.filter(task => task.id == id)[0]
      setTasks([
        ...tasks,
        {
          id: tasks[tasks.length - 1].id + 1,
          name: dupTask.name,
          sub_task: dupTask.sub_task
        }
      ]
      )
    }

    const subTaskName = (task) => `task${task.id}`
    const subTaskId = (task) => task.sub_task[task.sub_task.length - 1] ? task.sub_task[task.sub_task.length - 1].id + 1 : 1

    return (
      <Container>
        <Space>
          <Input name="task_name" value={input.task_name} style={{ width: 400 }} placeholder="Enter Task Name" onChange={hdTaskNameChange} id="create-task-box"/>
          <Button type="primary" onClick={() => addTask(
            tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1
            )}>Create Task</Button>
        </Space>
        {
          tasks.map(task => (
            <Space direction="vertical" style={{ marginTop: 24 }} key={task.id}>
              <Card
                title={task.name}
                style={{ width: 600 }}
                extra={
                  <>
                    <Button type="primary" onClick={() => duplicateTask(task.id)}>Duplicate</Button>{" "}
                    <Button type="primary" danger onClick={() => deleteTask(task.id)}>
                      Delete
                    </Button>
                  </>
                }
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Space>
                    <Input name={subTaskName(task)}  value={input[subTaskName(task)]}
                    placeholder="Enter Subtask Name" style={{ width: 400 }} onChange={hdTaskNameChange}/>
                    <Button type="primary" onClick={() => addSubTask(task.id,subTaskId(task))}>Add Subtask</Button>
                  </Space>
                  <Divider />
                  {task.sub_task.length != 0 && task.sub_task.map(sub => (
                    !sub.done ? 
                    <Row>
                      <Col span={16}>
                        <Typography.Text>{sub.name} (Todo)</Typography.Text>
                      </Col>
                      <Col span={8}>
                        <Button type="primary" onClick={() => doneSubTask(task.id, sub.id)}>Done</Button>{" "}
                        <Button type="danger" onClick={() => deleteSubTask(task.id, sub.id)}>Delete</Button>
                      </Col>
                    </Row> : 
                    <Row>
                      <Col span={16}>
                        <Typography.Text style={{ textDecoration: "line-through" }}>
                          {sub.name} (Done)
                        </Typography.Text>
                      </Col>
                      <Col span={8}>
                        <Button type="primary" onClick={() => doneSubTask(task.id, sub.id)}>Undo</Button>{" "}
                        <Button type="danger" onClick={() => deleteSubTask(task.id, sub.id)}>Delete</Button>
                      </Col>
                    </Row>
                  ))}
                </Space>
              </Card>
            </Space>
          ))
        }
      </Container>
    );
  }
  
  export default Todo;