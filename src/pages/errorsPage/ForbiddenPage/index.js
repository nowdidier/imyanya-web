import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { Result } from "antd";

import { TabTitle } from "../../../utils/generalFunction";

const ForbiddenPage = () => {
  TabTitle("No permission to access");
  const nav = useNavigate();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
    >
      <Result
        style={{ marginTop: "15vh" }}
        status="403"
        title="403"
        subTitle="Sorry, you do not have permission to access this page."
        extra={
          <Button type="primary" variant="contained" onClick={() => nav("/")}>
            Back to Home
          </Button>
        }
      />
    </Stack>
  );
};

export default ForbiddenPage;
