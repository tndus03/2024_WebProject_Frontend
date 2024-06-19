import React, { useState } from 'react';
import { Tab, Box, TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';

const AddCoffee = (props) => {
  const [item, setItem] = useState({ title: "", brand: "", beans: "", userId: "", id: "" })
  const { getItem, addItem, editItem, deleteItem, items } = props
  const [value, setValue] = useState('1')
  const [searchResults, setSearchResults] = useState([])
  const username = localStorage.getItem("USERNAME")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({ ...prevItem, [name]: value }));
  }

  const tabHandleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getEventHandler = () => {
    getItem(item.title)
      .then(data => {
        if (data.length > 0) {
          const foundItem = data[0]
          setItem({
            title: foundItem.title,
            brand: foundItem.brand,
            beans: foundItem.beans,
            userId: foundItem.userId,
            id: foundItem.id
          });
        } else {
          alert('No items found with that title.');
          setItem({ title: "", brand: "", beans: "", userId: "", id: "" })
        }
      })
      .catch(error => {
        console.error('Error retrieving items:', error);
        alert('Error during search');
      });
  }

  const searchEventHandler = () => {
    getItem(item.title)
    .then(data => {
      setSearchResults(data)
      setItem({ title: "", brand: "", beans: "", userId: "", id: "" })
    })
    .catch(error => {
      console.error('Error retrieving items:', error);
      alert('Error during search');
    })
  }

  const addEventHandler = () => {
    addItem(item)
    setItem({ title: "", brand: "", beans: "", userId: "", id: "" })
  }

  const editEventHandler = () => {
    editItem(item)
    setItem({ title: "", brand: "", beans: "", userId: "", id: "" })
  }

  const deleteEventHandler = () => {
    deleteItem({ title: item.title })
    setItem({ title: "", brand: "", beans: "", userId: "", id: "" })
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ orderBottom: 1, borderColor: 'success', display: 'flex', justifyContent: 'center' }}>
          <TabList onChange={tabHandleChange} sx={{ 
              '& .MuiTabs-indicator': { backgroundColor: 'success.main' },
              '& .Mui-selected': { color: 'success.main' },
              '& .MuiTab-root': { 
                color: 'success.main',
                '&:focus': { color: 'success.dark' }
              }
            }}>
            <Tab label="제품 추가" value="1" sx={{ color: 'success.main' }} />
            <Tab label="제품 검색" value="2" sx={{ color: 'success.main' }} />
            <Tab label="제품 수정" value="3" sx={{ color: 'success.main' }} />
            <Tab label="제품 삭제" value="4" sx={{ color: 'success.main' }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <TextField name="brand" placeholder="brand" fullWidth onChange={handleChange} value={item.brand} sx={{ mb: 2 }} />
          <TextField name="beans" placeholder="beans" fullWidth onChange={handleChange} value={item.beans} sx={{ mb: 2 }} />
          <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={addEventHandler}>
            제품 추가
          </Button>
        </TabPanel>
        <TabPanel value="2">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={searchEventHandler}>
            제품 검색
          </Button>
        </TabPanel>
        <TabPanel value="3">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={getEventHandler} sx={{ mb: 8 }}>
            제품 검색
          </Button>
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <TextField name="brand" placeholder="brand" fullWidth onChange={handleChange} value={item.brand} sx={{ mb: 2 }} />
          <TextField name="beans" placeholder="beans" fullWidth onChange={handleChange} value={item.beans} sx={{ mb: 2 }} />
          <TextField name="id" placeholder="id" fullWidth onChange={handleChange} value={item.id} sx={{ mb: 2 }} />
          <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={editEventHandler}>
            제품 수정
          </Button>
        </TabPanel>
        <TabPanel value="4">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={deleteEventHandler}>
            제품 삭제
          </Button>
        </TabPanel>
      </TabContext>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          {value === "2" && searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Brand: {item.brand}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Beans: {item.beans}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{username}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{item.id}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Brand: {item.brand}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>Beans: {item.beans}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{username}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>{item.id}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>


    // <Grid container style={{ marginTop: 20 }}>
    //   <Grid xs={10} md={10} item style={{ paddingRight: 16, paddingBottom: 20 }}>
    //     <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} />
    //   </Grid>
    //   <Grid xs={2} md={2} item>
    //     <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={addEventHandler}>
    //       제품 추가
    //     </Button>
    //   </Grid>
    //   <Grid xs={10} md={10} item style={{ paddingRight: 16, paddingBottom: 20 }}>
    //     <TextField name="brand" placeholder="brand" fullWidth onChange={handleChange} value={item.brand} />
    //   </Grid>
    //   <Grid xs={2} md={2} item>
    //     <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={getEventHandler}>
    //       제품 검색
    //     </Button>
    //   </Grid>
    //   <Grid xs={10} md={10} item style={{ paddingRight: 16, paddingBottom: 20 }}>
    //     <TextField name="beans" placeholder="beans" fullWidth onChange={handleChange} value={item.beans} />
    //   </Grid>
    //   <Grid xs={2} md={2} item>
    //     <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={editEventHandler}>
    //       제품 수정
    //     </Button>
    //   </Grid>
    //   <Grid xs={10} md={10} item style={{ paddingRight: 16, paddingBottom: 20 }}>
    //     <TextField name="id" placeholder="id" fullWidth onChange={handleChange} value={item.id} />
    //   </Grid>
    //   {/* <Grid xs={10} md={10} item style={{ paddingRight: 16, paddingBottom: 20 }}>
    //     <TextField name="userId" placeholder="userId" fullWidth onChange={handleChange} value={item.userId} />
    //   </Grid> */}
    //   <Grid xs={2} md={2} item>
    //     <Button fullWidth style={{ padding: 16 }} color="success" variant="contained" onClick={deleteEventHandler}>
    //       제품 삭제
    //     </Button>
    //   </Grid>
    // </Grid>
  )
}

export default AddCoffee;