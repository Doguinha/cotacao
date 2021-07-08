export const itens = [
  { id: 1, nome: "01.01 Caderno Brochura", quantidade: 1, unidadeCompra: "" },
  {
    id: 2,
    nome: "01.02 Caneta Esferográfica Azul",
    quantidade: 1,
    unidadeCompra: "",
  },
  {
    id: 3,
    nome: "01.03 Caneta Esferográfica Preta",
    quantidade: 1,
    unidadeCompra: "",
  },
  { id: 4, nome: "01.04 Borracha Branca", quantidade: 1, unidadeCompra: "" },
  { id: 5, nome: "01.05 Grampeador", quantidade: 1, unidadeCompra: "" },
];

export const fornecedores = [
  {
    cpfcnpj: "111222333444",
    nome: "Supermercados Delta",
  },
  {
    cpfcnpj: "444555666777",
    nome: "Casas Bahia",
  },
  {
    cpfcnpj: "888999911111",
    nome: "Magazine Luiza",
  },
  {
    cpfcnpj: "7744447778855",
    nome: "Lojas Americanas",
  },
];

export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
