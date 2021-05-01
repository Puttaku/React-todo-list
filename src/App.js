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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

function App() {
  return (
    <Container>
      <Space>
        <Input style={{ width: 400 }} placeholder="Enter Task Name" />
        <Button type="primary">Create Task</Button>
      </Space>
      <Space direction="vertical" style={{ marginTop: 24 }}>
        <Card
          title="Sample Task"
          style={{ width: 600 }}
          extra={
            <>
              <Button type="primary">Duplicate</Button>{" "}
              <Button type="primary" danger>
                Delete
              </Button>
            </>
          }
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Space>
              <Input placeholder="Enter Subtask Name" style={{ width: 400 }} />
              <Button type="primary">Add Subtask</Button>
            </Space>
            <Divider />
            <Row>
              <Col span={16}>
                <Typography.Text>Subtask Name (Todo)</Typography.Text>
              </Col>
              <Col span={8}>
                <Button type="primary">Done</Button>{" "}
                <Button type="danger">Delete</Button>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <Typography.Text style={{ textDecoration: "line-through" }}>
                  Subtask Name (Done)
                </Typography.Text>
              </Col>
              <Col span={8}>
                <Button type="primary">Undo</Button>{" "}
                <Button type="danger">Delete</Button>
              </Col>
            </Row>
          </Space>
        </Card>
      </Space>
    </Container>
  );
}

export default App;
