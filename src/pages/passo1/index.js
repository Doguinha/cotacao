import React from "react";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  FormControl,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import { itens } from "../../api";

export default function Passo1(props) {
  const handleSubmit = (evento) => {
    evento.preventDefault();
    props.proximoPasso();
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: "1em" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="combo-box-demo"
              fullWidth
              options={itens}
              value={props.cotacao.itens}
              getOptionLabel={(option) => option.nome}
              getOptionSelected={(option, value) => option.id === value.id}
              filterSelectedOptions={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Escolha os itens"
                  variant="outlined"
                />
              )}
              onChange={props.handleItemSelecionado}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Nome"
              placeholder="Dê um nome para cotação"
              fullWidth
              value={props.cotacao.nome}
              name="nome"
              error={false}
              onChange={props.handleChangeAtributosCotacao}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Objeto"
              placeholder="Informe o objeto da cotação"
              fullWidth
              name="objeto"
              value={props.cotacao.objeto}
              error={false}
              onChange={props.handleChangeAtributosCotacao}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="label-tipo">Tipo</InputLabel>
              <Select
                labelId="label-tipo"
                name="tipo"
                value={props.cotacao.tipo}
                onChange={props.handleChangeAtributosCotacao}
                label="Tipo"
              >
                <MenuItem value={"CompraGlobal"}>Compra Global</MenuItem>
                <MenuItem value={"CompraPorItem"}>Compra por Item</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
