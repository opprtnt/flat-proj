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
import { FiltersProps } from "../ManePageType";

const { Panel } = Collapse;

const Filters = memo(({ setFilterParams }: FiltersProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: { [x: string]: any }) => {
    const searchParams = new URLSearchParams();

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const param = values[key];
        if (param != null) searchParams.append(key, param);
      }
    }

    setFilterParams(searchParams.toString());
  };

  const onReset = () => {
    form.resetFields();
    setFilterParams("");
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={8}>
        <Divider orientation="left">Количество комнат</Divider>
        <Col span={12}>
          <Form.Item name={"minRoom"} label="от">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"maxRoom"} label="до">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Divider orientation="left">Цена</Divider>
        <Col span={12}>
          <Form.Item name={"minPrice"} label="от">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"maxPrice"} label="до">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Divider orientation="left">Общая площадь</Divider>
        <Col span={12}>
          <Form.Item name={"minAreaTotal"} label="от">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"maxAreaTotal"} label="до">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Collapse ghost>
        <Panel header="Дополнительные фильтры" key="1">
          <Row gutter={8}>
            <Divider orientation="left">Площадь проживания</Divider>
            <Col span={12}>
              <Form.Item name={"minAreaLive"} label="от">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"maxAreaLive"} label="до">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Divider orientation="left">Площадь кухни</Divider>
            <Col span={12}>
              <Form.Item name={"minAreaKitchen"} label="от">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"maxAreaKitchen"} label="до">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Divider orientation="left">Площадь проживания</Divider>
            <Col span={12}>
              <Form.Item name={"minAreaLive"} label="от">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"maxAreaLive"} label="до">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Divider orientation="left">Этаж</Divider>
            <Col span={12}>
              <Form.Item name={"minFloor"} label="от">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"maxFloor"} label="до">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
      <Form.Item>
        <Space style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            Фильтровать
          </Button>
          <Button onClick={onReset}>Сбросить</Button>
        </Space>
      </Form.Item>
    </Form>
  );
});

export default Filters;
