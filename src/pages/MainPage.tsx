import {
  Col, Descriptions,
  List,
  Modal,
  Row, Segmented,
  Select,
} from 'antd';
import React, { useEffect, useState } from "react";
import { memo } from "react";
import Filters from "./components/Filters";
import api from "../API";
import { Flats } from "./ManePageType";
import Plan from './components/Plan';

const MainPage = memo(() => {
  const [flatDataList, setFlatDataList] = useState<Array<Flats>>([]);
  const [isReady, setIsReady] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(4);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState('');
  const [filterParams, setFilterParams] = useState("");
  const [currentFlat, setCurrentFlat] = useState<Flats>();
  const [isModal, setIsModal] = useState(false);
  const [currentView, setCurrentView] = useState<string | number>('Список');
  const getData = () => {
    setIsReady(true);
    api
      .get(`flat-table?page=${page}&size=${size}${filterParams ? `&${filterParams}` : ''}${sort ? `&${sort}` : ''}`)
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
  }, [page, size, filterParams, sort]);
  
  const handleSortMenu = (value: string) => {
    const sortParams = new URLSearchParams();
    if (value !== '0') {
      const [column, dir] = value.split(';')
      sortParams.append('sortColumn', column);
      sortParams.append('sortDir', dir);
      setSort(sortParams.toString());
    } else {
      setSort('');
    }
  }

  const sortOptions = [
    {
      value: "0",
      label: "без сортировки",
    },
    {
      value: "price;asc",
      label: "цена по возрастанию",
    },
    {
      value: "price;desc",
      label: "цена по убыванию",
    },
    {
      value: "areaTotal;asc",
      label: "общ. площадь по возрастанию",
    },
    {
      value: "areaTotal;desc",
      label: "общ. площадь по убыванию",
    },
  ];
  
  const clickListItem = (listItem: Flats) => {
  setCurrentFlat(listItem);
  setIsModal(true)
  }

  return (
    <>
      <Segmented options={['Список', 'План']} value={currentView} onChange={setCurrentView} />
      {currentView === 'План' ? <Plan clickFlat={clickListItem}/> :
        <Row gutter={16}>
        <Col span={6} offset={12}>
          <Select
            defaultValue="0"
            style={{width: 120}}
            bordered={false}
            options={sortOptions}
            onChange={handleSortMenu}
          />
        </Col>
        <Col span={16}>
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
                onClick={() => clickListItem(flat)}
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
                    color: '#1677ff',
                    fontWeight: 'bold',
                    fontSize: 24,
                  }}
                >
                    {flat.price} ₽
                  </span>
              </List.Item>
            )}
            loading={isReady}
          />
        </Col>
        <Col span={8}>
          <Filters setFilterParams={setFilterParams}/>
        </Col>
      </Row>}
      <Modal open={isModal} onCancel={() => setIsModal(false)}>
        <Row gutter={8}>
          <Col span={20}>
        <Descriptions title={`${currentFlat?.rooms}-комн.`}>
          <Descriptions.Item label="Цена">{currentFlat?.price}</Descriptions.Item>
          <Descriptions.Item label="Количество комнат">{currentFlat?.rooms}</Descriptions.Item>
          <Descriptions.Item label="Общая площадь">{currentFlat?.area_total}</Descriptions.Item>
          <Descriptions.Item label="Этаж">{currentFlat?.floor}</Descriptions.Item>
          <Descriptions.Item label="Площадь кухни">{currentFlat?.area_kitchen}</Descriptions.Item>
          <Descriptions.Item label="Жилая площадь">{currentFlat?.area_live}</Descriptions.Item>
        </Descriptions></Col>
        <Col span={4}>
          <img src={currentFlat?.layout_image} alt='схема квартиры' width={272}/>
        </Col></Row>
      </Modal>
    </>
  );
});

export default MainPage;
