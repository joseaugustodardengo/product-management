import { useState, ChangeEvent } from "react";
import { useProducts } from "../../hooks/useProducts";
import DataTable from "react-data-table-component";
import { Button, IconButton, Card, makeStyles } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { IProduct } from "../../types";

import { Filter } from "../../components/Filter";
import { ModalAddProduct } from "../../components/ModalAddProduct";

const useStyles = makeStyles({
  card: {
    height: "100%",
    fontFamily: "Roboto"
  }
})

export function TableData() {
  const { products, removeProduct } = useProducts();

  const [modalOpen, setModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const classes = useStyles();

  const filteredItems = products.filter((item) =>
    item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleDeleteClicked = (row: IProduct) => {
    removeProduct(row.id);
  };

  function handleFilter(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    setFilterText(event.target.value);
  }

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
    }
  };

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
      cell: (row: IProduct) => (
        <>
          <IconButton color="secondary" onClick={() => handleDeleteClicked(row)}>
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

  const actions = (
    <Button onClick={toggleModal} variant="contained" color="primary" startIcon={<Add />} size="medium">
      Novo produto
    </Button>
  );

  return (
    <>
      <Filter
        onFilter={handleFilter}
        onClear={handleClear}
        filterText={filterText}
      />
      <Card className={classes.card}>
        <DataTable
          title=""
          columns={columns}
          data={filteredItems}
          keyField="id"
          actions={actions}
          pagination
          defaultSortField="name"
        />
      </Card>

      <ModalAddProduct isOpen={modalOpen} setIsOpen={toggleModal} />
    </>
  );
}
