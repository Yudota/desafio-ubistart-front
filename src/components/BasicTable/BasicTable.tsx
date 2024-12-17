import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { IUser } from "../../interfaces/User";
import { editRegister, getRegister } from "../../http/http-request";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicTable({
  users: initialUsers,
}: {
  users: IUser[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const [users, setUsers] = useState<IUser[]>(initialUsers); // Estado local para os usuários

  // Atualiza a lista de usuários após uma edição ou após uma requisição
  const fetchUsers = async () => {
    const updatedUsers = await getRegister(); // Supondo que getRegister retorna a lista atualizada de usuários
    setUsers(updatedUsers); // Atualiza o estado com os usuários mais recentes
  };

  useEffect(() => {
    setUsers(initialUsers); // Inicializa a lista de usuários com o valor vindo das props
  }, [initialUsers]);

  const handleOpen = (user: IUser) => {
    setEditedUser({ ...user });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (editedUser) {
      await editRegister(editedUser); // Edita o usuário
      await fetchUsers(); // Atualiza a lista de usuários após salvar

      setOpen(false);
    }
  };

  const handleChange = (field: keyof IUser, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">CEP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleOpen(user)}
              >
                <TableCell component="th" scope="row">
                  {user.nome}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.cep}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Editar Usuário
          </Typography>

          {editedUser && (
            <>
              <TextField
                id="nome"
                label="Nome"
                variant="outlined"
                fullWidth
                value={editedUser.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                sx={{ marginBottom: "20px" }}
              />

              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={editedUser.email}
                onChange={(e) => handleChange("email", e.target.value)}
                sx={{ marginBottom: "20px" }}
              />

              <TextField
                id="cep"
                label="CEP"
                variant="outlined"
                fullWidth
                value={editedUser.cep}
                onChange={(e) => handleChange("cep", e.target.value)}
                sx={{ marginBottom: "20px" }}
              />

              <Button variant="contained" color="primary" onClick={handleSave}>
                Salvar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
