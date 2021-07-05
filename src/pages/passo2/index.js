import { useState } from "react";
import { Delete as DeleteIcon, Save as SaveIcon } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@material-ui/core";
import Item from "./item";

export default function Passo2({ aoEnviar, dadosColetados, voltarPasso }) {
  return (
    <form>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Unidade Compra</TableCell>
              <TableCell align="center">Qtd.</TableCell>
              <TableCell align="center">Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dadosColetados.itensSelecionados.map((item) => (
              <Item
                itemSelecionado={item}
                key={item.id}
                coletarDados={aoEnviar}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          width: "100%",
          marginTop: "1em",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={voltarPasso}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          startIcon={<SaveIcon />}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
