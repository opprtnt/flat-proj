import { Col, Dropdown, List, Row, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import Filters from "./components/Filters";
import api from "../API";
import { Flats } from "./ManePageType";
import { DownOutlined } from "@ant-design/icons";

const MainPage = memo(() => {
  const [flatDataList, setFlatDataList] = useState<Array<Flats>>([]);
  const [isReady, setIsReady] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const [totalElements, setTotalElements] = useState(0);

  const getData = (params?: string) => {
    setIsReady(true);
    api
      .get(`flat-table?page=${page}&size=${size}&${params ?? ""}`)
      .then((res) => {
        setFlatDataList(res.data.data);
        setTotalElements(res.data.pagination.total);
        setIsReady(false);
      })
      .catch(() => setIsReady(false));
  };

  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  useEffect(() => {
    getData();
  }, [page, size]);
  return (
    <>
      <Row gutter={16}>
        <Col span={6} offset={12}>
          <Dropdown>
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
        <Col span={16}>
          <Spin spinning={isReady}>
            <List
              dataSource={flatDataList}
              itemLayout="vertical"
              pagination={{
                onChange: onChangePagination,
                total: totalElements,
                pageSize: size,
                showSizeChanger: true,
                pageSizeOptions: [4, 8, 16],
              }}
              renderItem={(flat) => (
                <List.Item
                  key={flat.id}
                  extra={
                    <img
                      width={272}
                      alt="схема квартиры"
                      src={flat.layout_image}
                    />
                  }
                >
                  <List.Item.Meta
                    title={`${flat.rooms}-комн.`}
                    description={`до ${flat.area_total} м.`}
                  />
                  <span
                    style={{
                      color: "#1677ff",
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  >
                    {flat.price} ₽
                  </span>
                </List.Item>
              )}
            />
          </Spin>
        </Col>
        <Col span={8}>
          <Filters getData={getData} />
        </Col>
      </Row>
    </>
  );
});

export default MainPage;
