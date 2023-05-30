import React, {memo, useEffect, useMemo, useState} from 'react';
import api from '../../API';
import {Flats, PlanProps} from '../ManePageType';
import {Col, Row, Select, Spin} from 'antd';

const Plan = memo(({clickFlat}: PlanProps) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [flatDataList, setFlatDataList] = useState<Flats[]>();
  const [isReady, setIsReady] = useState(false);
  
  const getData = () => {
    api
      .get(`flat-table?floor=${currentFloor}&sortColumn=pos_on_floor&sortDir=asc`)
      .then((res) => {
      setFlatDataList(res.data.data);
      setIsReady(false);
    })
  }
  
  const floorOptions = useMemo(() => new Array(8).fill(1)
    .map((value, index) => ({label: (index + 1).toString(), value: index + 1})), [])
  
  useEffect(() => {
    getData()
  }, [currentFloor])
  return (
    <div style={{margin: '24px 32px'}}>
      <Row>
        Этаж:
      <Select
        value={currentFloor}
        style={{width: 120}}
        bordered={false}
        options={floorOptions}
        onChange={setCurrentFloor}
      />
        </Row>
    <Spin spinning={isReady}>
      <Row gutter={8}>
      {flatDataList?.map((flatData) =>
        <Col md={6} xs={24} key={flatData.id}>
          <div className='flat-card' onClick={() => clickFlat(flatData)}><img src={flatData.layout_image} alt='схема квартиры'/></div>
        </Col>)}
    </Row></Spin>
    </div>
  );
});
export default Plan;
