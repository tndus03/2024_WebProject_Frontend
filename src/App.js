import './App.css';
import React, { useState, useEffect } from 'react';
import CoffeeRow from './CoffeeRow';
import AddCoffee from './AddCoffee';
import { Grid, Button, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { call, signout } from "./service/ApiService"

function App() {

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const username = localStorage.getItem("USERNAME")

  useEffect(() => {
    call("/coffee", "GET", null)
    .then((response) => {
      if (response && response.data) {
        setLoading(false)
        setItems(response.data)
      }
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  const getItem = (title) => {
    return call(`/coffee?title=${encodeURIComponent(title)}`, "GET")
      .then((response) => {
        if (response && response.data) {
          return response.data
        }
      })
  }

  const addItem = (item) => {
    call("/coffee", "POST", item)
    .then((response) => {
      if (response && response.data) {
        setItems(response.data)
      }
    })
  }
  
  const editItem = (item) => {
    call("/coffee", "PUT", item)
    .then((response) => {
      if (response && response.id) {
        setItems([response])
      }
    })
  }

  const deleteItem = (item) => {
    call("/coffee", "DELETE", item)
    .then((response) => {
      if (response && response.data) {
        setItems(response.data);
      }
    })
  }

  const coffeeRows = items.length > 0 && items.map((item) => (
    <CoffeeRow
      key={item.id}
      item={item}
    />
  ))

  let navigationBar = (
    <AppBar position="static" color="success">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">Coffee Mall</Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Typography variant="h6" style={{ marginRight: '16px' }}>Welcome, {username}</Typography>
              <Button color="inherit" variant="outlined" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )

  let coffeeListPage = (
    <>
      <div className='coffee-table'>
        {navigationBar}
        <Container maxWidth="md">
          <AddCoffee getItem={getItem} addItem={addItem} editItem={editItem} deleteItem={deleteItem} items={items} />
        </Container>
        <table>
          <caption>Coffee List</caption>
          <thead>
            <tr>
              <th>title</th>
              <th>brand</th>
              <th>beans</th>
              <th>userId</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {coffeeRows}
          </tbody>
        </table>
      </div>
    </>
  )

  let loadingPage = <h1> 로딩중.. </h1>;
  let content = loadingPage;

  if (!loading) {
    content = coffeeListPage;
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default App;