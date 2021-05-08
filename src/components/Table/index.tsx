import { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, IconButton, Card, makeStyles } from "@material-ui/core";
import { Add, Edit, Delete } from "@material-ui/icons";
import { IProduct } from "../../types";

import { Filter } from "../../components/Filter";
import { ModalAddProduct } from "../../components/ModalAddProduct";
import { ModalEditProduct } from "../../components/ModalEditProduct";


const data: IProduct[] = [
  {
    codSKU: 13484689,
    name: "Doce de leite",
    category: "Doce",
    price: "20,00"
  },
  {
    codSKU: 52284682,
    name: "Iogurte de morango",
    category: "Iogurte",
    price: "15,50"
  }
];

const useStyles = makeStyles({
  card: {
    height: "100%",
    fontFamily: "Roboto"
  }
})

export function TableData() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const classes = useStyles();

  const columns = [
    {
      name: "SKU",
      selector: "codSKU",
      sortable: true,
    },
    {
      name: "Nome",
      selector: "name",
      sortable: true,
    },
    {
      name: "Preço",
      selector: "price",
      sortable: true,
    },
    {
      name: "Categoria",
      selector: "category",
      sortable: true,
    },
    {
      name: "Ações",
      cell: () => (
        <>
          <IconButton color="primary" onClick={toggleEditModal}>
            <Edit />
          </IconButton>
          <IconButton color="secondary">
            <Delete />
          </IconButton>
        </>
      ),
      button: true,
    }
  ];

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const actions = (
    <Button onClick={toggleModal} variant="contained" color="primary" startIcon={<Add />} size="medium">
      Novo produto
    </Button>
  );

  return (
    <>
      <Filter />
      <Card className={classes.card}>
        <DataTable
          title=""
          columns={columns}
          data={data}
          keyField="codSKU"
          actions={actions}
          pagination
          defaultSortField="name"
        />
      </Card>

      <ModalAddProduct isOpen={modalOpen} setIsOpen={toggleModal} />
      <ModalEditProduct isOpen={editModalOpen} setIsOpen={toggleEditModal} />
    </>
  );
}
