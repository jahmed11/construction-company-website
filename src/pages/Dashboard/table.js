import React, { useState, useEffect } from "react";
import { Table, Space, Button } from "antd";
import { Link } from "react-router-dom";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const ShowTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteModelHandler = async (key) => {
    setLoading(true);
    let filteredModels = data.filter((model) => model.key !== key);
    setData(filteredModels);
    try {
      await API.graphql(
        graphqlOperation(mutations.deleteBuilding, { input: { id: key } })
      );
    } catch (err) {
      console.log("unable to delete model", err);
    }
    setLoading(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <span>
            <Link to={`/dashboard/editModel/${record.key}`}>Edit</Link>
          </span>
          <span onClick={() => deleteModelHandler(record.key)}>Delete</span>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getBuildingList();
  }, []);

  const getBuildingList = async () => {
    setLoading(true);
    let list;
    try {
      list = await API.graphql(graphqlOperation(queries.listBuildings));
      let newArray = list.data.listBuildings.items.map((item) => {
        let name = `${item.shortAddress} ${item.city},${item.state} ${item.zipCode}`;
        name.toString();
        return { key: item.id, name: name };
      });
      setData(newArray);
    } catch (err) {
      console.log("unable to get building list");
    }
    setLoading(false);
  };
  const creatModelRoute = () => {
    props.history.push("/dashboard/addModel");
  };
  return (
    <>
      <div style={{ width: "100px" }}>
        <Button
          onClick={creatModelRoute}
          style={{ width: "100px" }}
          type="primary"
        >
          Create
        </Button>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  );
};

export default ShowTable;
