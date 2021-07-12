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
  FormControl,
} from "@material-ui/core";

export default function Passo2({
  cotacao,
  voltarPasso,
  proximoPasso,
  handleChangeAtributosItem,
  handleRemoverItem,
}) {
  return (
    <form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center"> Unidade Compra</TableCell>
              <TableCell align="center">Qtd.</TableCell>
              <TableCell align="center">Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cotacao.itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">
                  <TextField
                    placeholder="Dê um nome para cotação"
                    value={item.nome}
                    variant="outlined"
                    disabled
                    fullWidth
                  />
                </TableCell>
                <TableCell align="center">
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      name="unidadeCompra"
                      value={item.unidadeCompra}
                      onChange={(evento) =>
                        handleChangeAtributosItem(evento, item.id)
                      }
                    >
                      <MenuItem value={"Unidade"}>Unidade</MenuItem>
                      <MenuItem value={"Pacote"}>Pacote</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center" style={{ width: "12%" }}>
                  <TextField
                    inputProps={{ style: { textAlign: "center" } }}
                    placeholder="Informe a quantidade"
                    type="number"
                    name="quantidade"
                    value={item.quantidade}
                    error={false}
                    variant="outlined"
                    onChange={(evento) =>
                      handleChangeAtributosItem(evento, item.id)
                    }
                  />
                </TableCell>
                <TableCell align="center" style={{ width: "12%" }}>
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
