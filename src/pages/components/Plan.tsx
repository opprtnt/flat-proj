import React, { memo, useEffect, useMemo, useState } from "react";
import api from "../../API";
import { Flats, PlanProps } from "../ManePageType";
import { Col, Row, Select, Space, Spin } from "antd";
import { isDesktop } from "react-device-detect";

const Plan = memo(({ clickFlat }: PlanProps) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [flatDataList, setFlatDataList] = useState<Flats[]>();
  const [isReady, setIsReady] = useState(false);

  const getData = () => {
    api
      .get(
        `flat-table?floor=${currentFloor}&sortColumn=pos_on_floor&sortDir=asc`
      )
      .then((res) => {
        setFlatDataList(res.data.data);
        setIsReady(false);
      });
  };

  const floorOptions = useMemo(
    () =>
      new Array(4).fill(1).map((value, index) => ({
        label: (index + 1).toString(),
        value: index + 1,
      })),
    []
  );

  useEffect(() => {
    getData();
  }, [currentFloor]);
  return (
    <div style={{ margin: "24px 32px" }}>
      <Row>
        <Space style={{ marginBottom: 32 }}>
          <span style={{ marginRight: 8 }}>Этаж:</span>
          <Select
            value={currentFloor}
            options={floorOptions}
            onChange={setCurrentFloor}
          />
        </Space>
      </Row>
      <Spin spinning={isReady}>
        <Row gutter={8}>
          {flatDataList?.map((flatData) => (
            <Col sm={4} key={flatData.id}>
              <div className="flat-card" onClick={() => clickFlat(flatData)}>
                <img
                  src={flatData.layout_image}
                  alt="схема квартиры"
                  width={isDesktop ? 150 : 200}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
});
export default Plan;
