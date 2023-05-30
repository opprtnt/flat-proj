import { Col, Dropdown, List, MenuProps, Row, Space, Spin } from "antd";
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
  const [sort, setSort] = useState({ dir: "", column: "" });
  const [filterParams, setFilterParams] = useState("");

  const getData = () => {
    setIsReady(true);
    api
      .get(`flat-table?page=${page}&size=${size}&${filterParams ?? ""}`)
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
  }, [page, size, filterParams]);

  const sortMenu: MenuProps["items"] = [
    {
      key: "1",
      label: "Цена по возрастанию",
      onClick: () => setSort({ dir: "asc", column: "price" }),
    },
    {
      key: "2",
      label: "Цена по убыванию",
      onClick: () => setSort({ dir: "desc", column: "price" }),
    },
    {
      key: "4",
      label: "Общ. площади по возрастанию",
      onClick: () => setSort({ dir: "asc", column: "areaTotal" }),
    },
    {
      key: "4",
      label: "Общ. площади по убыванию",
      onClick: () => setSort({ dir: "desc", column: "areaTotal" }),
    },
  ];

  return (
    <>
      <Row gutter={16}>
        <Col span={6} offset={12}>
          <Dropdown menu={{ items: sortMenu }}>
            <Space>
              Сортировка
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
          <Filters setFilterParams={setFilterParams} />
        </Col>
      </Row>
    </>
  );
});

export default MainPage;
