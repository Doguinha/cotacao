import { useState } from "react";
import {
  TableCell,
  TableRow,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

export default function Item({ itemSelecionado, coletarDados }) {
  const [quantidade, setQuantidade] = useState(itemSelecionado.quantidade);
  const [unidadeCompra, setUnidadeCompra] = useState(
    itemSelecionado.unidadeCompra
  );

  const handleQuantidade = (evento) => {
    setQuantidade(evento.target.value);
    coletarDados({
      ...itemSelecionado,
      quantidade: evento.target.value,
      unidadeCompra: unidadeCompra,
    });
  };
  const handleUnidadeCompra = (evento) => {
    setUnidadeCompra(evento.target.value);
    coletarDados({
      ...itemSelecionado,
      unidadeCompra: evento.target.value,
      quantidade: quantidade,
    });
  };


  return (
    <TableRow>
      <TableCell align="center" size="medium">
        {itemSelecionado.nome}
      </TableCell>
      <TableCell align="center" size="small">
        <Select
          labelId="label-tipo"
          value={unidadeCompra}
          fullWidth
          onChange={handleUnidadeCompra}
        >
          <MenuItem value={"Unidade"}>Unidade</MenuItem>
          <MenuItem value={"Pacote"}>Pacote</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="center" size="small">
        <TextField
          inputProps={{ style: { textAlign: "center" } }}
          required
          type="number"
          placeholder="Informe a quantidade"
          value={quantidade}
          error={false}
          helperText=""
          onChange={handleQuantidade}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton aria-label="delete" color="secondary">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
