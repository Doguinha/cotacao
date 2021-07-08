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

export default function Passo2({
  itensSelecionados,
  voltarPasso,
  proximoPasso,
  handleUnidadeCompra,
  handleQuantidade,
  handleRemoverItem,
}) {
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
            {itensSelecionados.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center" size="medium">
                  {item.nome}
                </TableCell>
                <TableCell align="center" size="small">
                  <Select
                    labelId="label-tipo"
                    value={item.unidadeCompra}
                    fullWidth
                    onChange={(evento) => handleUnidadeCompra(evento, item.id)}
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
                    value={item.quantidade}
                    error={false}
                    helperText=""
                    onChange={(evento) => handleQuantidade(evento, item.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => handleRemoverItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
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
          startIcon={<SaveIcon />}
          onClick={proximoPasso}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
