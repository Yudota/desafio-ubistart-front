import React, { useState, useEffect } from "react";
import { Button, TextField, Alert, Snackbar } from "@mui/material";
import { createRegister, getRegister } from "./http/http-request";
import BasicTable from "./components/BasicTable/BasicTable";
import { IUser } from "./interfaces/User";

function App() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cep, setCEP] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  }>({ type: "success", message: "" });
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchRegisters = async () => {
    const data = await getRegister();
    setUsers(data);
  };

  useEffect(() => {
    fetchRegisters();
  }, []);

  const isFormValid = (): boolean => {
    return nome.trim() !== "" && email.trim() !== "" && cep.trim() !== "";
  };

  const handleCreateRegister = async () => {
    if (!isFormValid()) {
      setAlert({ type: "error", message: "Todos os campos são obrigatórios!" });
      setShowSnackbar(true);
      return;
    }

    setIsSubmitting(true);
    const response = await createRegister({ nome, email, cep });

    if (response.erro) {
      setAlert({ type: "error", message: response.erro.toString() });
    } else {
      setAlert({ type: "success", message: response.mensagem });
      setNome("");
      setEmail("");
      setCEP("");
      await fetchRegisters();
    }
    setShowSnackbar(true);
    setIsSubmitting(false);
  };

  return (
    <>
      <div
        id="form"
        style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}
      >
        <TextField
          id="nome"
          label="Nome"
          variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <TextField
          id="cep"
          label="CEP"
          variant="outlined"
          value={cep}
          onChange={(e) => setCEP(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          onClick={async (e) => {
            e.preventDefault();
            await handleCreateRegister();
          }}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </Button>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity={alert.type} onClose={() => setShowSnackbar(false)}>
          {alert.message}
        </Alert>
      </Snackbar>

      <BasicTable users={users} />
    </>
  );
}

export default App;
