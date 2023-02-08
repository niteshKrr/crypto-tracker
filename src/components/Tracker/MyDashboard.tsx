import React from "react";
import {
  Collapse,
  Text,
  Grid,
  Avatar,
  Link,
  Table,
  Divider,
} from "@nextui-org/react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const myChains = ["Ethereum", "Polygon", "Arbitrum", "Optimism"];
const myImg = ["eth.jpg", "polygon.png", "Arbitrum.png", "optimism.png"];

const MyDashboard = ({ allData }: any) => {
  const { address, chains } = useSelector(
    (state: RootState) => state.userDetails
  );

  return (
    <div className=" bg-gradient-to-r from-purple-600 to-pink-600 h-screen">
      <SimpleBar
        style={{
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        <div className="mx-80 py-60">
          <Collapse.Group shadow>
            {chains.map((chain, idx1) => (
              <div key={idx1}>
                <Collapse
                  title={<Text h4>{myChains[Number(chain)]}</Text>}
                  contentLeft={
                    <Avatar
                      size="lg"
                      src={myImg[Number(chain)]}
                      color="secondary"
                      bordered
                      squared
                    />
                  }
                >
                  <Collapse.Group shadow>
                    <SimpleBar
                      style={{
                        maxHeight: "300px",
                        overflowY: "scroll",
                      }}
                    >
                      {address.map((addr, idx2) => (
                        <div key={idx2}>
                          <Collapse
                            title={<Text h4>Account address : {addr}</Text>}
                          >
                            <div className="my-4">
                              <Table
                                aria-label="Example table with static content"
                                css={{
                                  height: "auto",
                                  minWidth: "100%",
                                  width: "600px",
                                }}
                              >
                                <Table.Header>
                                  <Table.Column>TOKEN</Table.Column>
                                  <Table.Column>AMOUNT</Table.Column>
                                  <Table.Column>SYMBOL</Table.Column>
                                </Table.Header>
                                <Table.Body>
                                  {allData[idx1][idx2].map(
                                    (data: any, idx3: number) => (
                                      <Table.Row key={idx3}>
                                        <Table.Cell>{data.name}</Table.Cell>
                                        <Table.Cell>{data.balance}</Table.Cell>
                                        <Table.Cell>{data.symbol}</Table.Cell>
                                      </Table.Row>
                                    )
                                  )}
                                </Table.Body>
                              </Table>
                            </div>
                          </Collapse>
                        </div>
                      ))}
                    </SimpleBar>
                  </Collapse.Group>
                </Collapse>
                <Divider />
              </div>
            ))}
          </Collapse.Group>
        </div>
      </SimpleBar>
    </div>
  );
};

export default MyDashboard;
