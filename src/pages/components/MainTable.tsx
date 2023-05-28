import { memo, useEffect, useState } from "react";
import api from "../../API";
import { Flats, MainTableProps } from "../ManePageType";
import { List, Spin } from "antd";
import React from "react";

const MainTable = memo(({ isReady, data }: MainTableProps) => {
  return (
    <Spin spinning={isReady}>
      <List
        dataSource={data}
        itemLayout="vertical"
        renderItem={(flat) => (
          <List.Item
            key={flat.id}
            extra={
              <img width={272} alt="схема квартиры" src={flat.layout_image} />
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
  );
});

export default MainTable;
