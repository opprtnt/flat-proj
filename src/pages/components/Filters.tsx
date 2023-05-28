import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  InputNumber,
  Row,
  Space,
} from "antd";
import React from "react";
import { memo } from "react";

const { Panel } = Collapse;

const Filters = memo(({ getData }) => {
  const onFinish = (values) => {
    const searchParams = new URLSearchParams();

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const param = values[key];
        searchParams.append(key, param);
      }
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Row gutter={8}>
        <Divider orientation="left">Количество комнат</Divider>
        <Col span={6}>
          <Form.Item name={"minRooms"} label="от">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={"maxRooms"} label="до">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Divider orientation="left">Цена</Divider>
        <Col span={6}>
          <Form.Item name={"minPrice"} label="от">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={"maxPrice"} label="до">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Divider orientation="left">Общая площадь</Divider>
        <Col span={6}>
          <Form.Item name={"minAreaTotal"} label="от">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name={"maxAreaTotal"} label="до">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Collapse ghost>
          <Panel header="Дополнительные фильтры" key="1">
            <Col span={6}>
              <Form.Item name={"maxAreaTotal"} label="до">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Panel>
        </Collapse>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Фильтровать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
});

export default Filters;
