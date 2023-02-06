import React from "react";
import { Table } from "@nextui-org/react";
import SimpleBar from "simplebar-react";

type TablePropTypes = {
  name: string;
  balance: string;
  symbol: string;
};
const MyTable = (allMyData: any) => {
  console.log("all my data is: ", allMyData.allMyData);
  // return <div>hello world</div>
  return (
    <div className="my-5">
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
          width: "600px",
        //   overflowY: "scroll",
        }}
      >
        <Table.Header>
          <Table.Column>Token</Table.Column>
          <Table.Column>
            <div className="text-center">Amount</div>
          </Table.Column>
          <Table.Column>
            <div className="text-right">symbol</div>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {allMyData.allMyData.map((data: any, idx: number) => (
            <Table.Row key={idx}>
              <Table.Cell>
                <div className="text-white">{data.name} </div>
              </Table.Cell>
              <Table.Cell>
                <div className="text-white text-right">{data.balance}</div>
              </Table.Cell>
              <Table.Cell>
                <div className="text-white text-right">{data.symbol}</div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MyTable;
