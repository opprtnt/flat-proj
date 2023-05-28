import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { memo } from "react";
import MainTable from "./components/MainTable";
import Filters from "./components/Filters";
import api from "../API";
import { Flats } from "./ManePageType";

const MainPage = memo(() => {
  const [flatDataList, setFlatDataList] = useState<Array<Flats>>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(false);
    api
      .get("flat-table?page=1&size=4")
      .then((res) => {
        setFlatDataList(res.data);
        setIsReady(false);
      })
      .catch(() => setIsReady(false));
  }, []);
  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <MainTable isReady={isReady} data={flatDataList} />
        </Col>
        <Col span={8}>
          <Filters />
        </Col>
      </Row>
    </>
  );
});

export default MainPage;
