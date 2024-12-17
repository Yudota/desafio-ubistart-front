import React from 'react'
import { Alert } from "@mui/material";

function SuccessAlert(message: string) {
  return <Alert severity="success">{message}</Alert>;
}

function ErrorAlert(message: string) {
  return <Alert severity="error">{message}</Alert>;
}

export { SuccessAlert, ErrorAlert };
