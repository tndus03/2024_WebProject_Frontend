import React, { useState, useEffect } from 'react';
import { Tab, Box, TextField, Button, Grid, Card, CardContent, Typography, IconButton, Tooltip, Divider } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UserIcon from '@mui/icons-material/Person';
import CoffeeIcon from '@mui/icons-material/Coffee';
import PublicIcon from '@mui/icons-material/Public';

const AddCoffee = (props) => {
  const [item, setItem] = useState({ title: "", brand: "", beans: "", userId: "", id: "" })
  const [value, setValue] = useState('1')
  const [searchResults, setSearchResults] = useState([])
  const username = localStorage.getItem("USERNAME")

  const { getItem, addItem, editItem, deleteItem, items, setItems, toggleFavorite, refreshFavorites, favorites } = props

  useEffect(() => {
    if (value === '5') {
      refreshFavorites()
    }
  }, [value])

  const handleChange = (e) => {
    const { name, value } = e.target
    setItem(prevItem => ({ ...prevItem, [name]: value }))
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
            id: foundItem.id,
            favorite: foundItem.favorite
          })
        } else {
          alert('No items found with that title.')
          setItem({ title: "", brand: "", beans: "", userId: "", id: "", favorite: false })
        }
      })
      .catch(error => {
        console.error('Error retrieving items:', error)
        alert('Error during search')
      })
  }

  const searchEventHandler = () => {
    getItem(item.title)
      .then(data => {
        setSearchResults(data)
        setItem({ title: "", brand: "", beans: "", userId: "", id: "", favorite: false })
      })
      .catch(error => {
        console.error('Error retrieving items:', error)
        alert('Error during search')
      });
  }

  const addEventHandler = () => {
    addItem(item)
    setItem({ title: "", brand: "", beans: "", userId: "", id: "", favorite: false })
  }

  const editEventHandler = () => {
    editItem(item)
    setItem({ title: "", brand: "", beans: "", userId: "", id: "", favorite: false })
  }

  const deleteEventHandler = () => {
    deleteItem({ title: item.title })
    setItem({ title: "", brand: "", beans: "", userId: "", id: "", favorite: false })
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ orderBottom: 1, borderColor: '#c9a16b', display: 'flex', justifyContent: 'center' }}>
          <TabList onChange={tabHandleChange} sx={{ 
              '& .MuiTabs-indicator': { backgroundColor: '#c9a16b' },
              '& .MuiTab-root': { 
                color: '#c9a16b',
                '&:focus': { color: '#c9a16b' },
                '&:hover': { color: '#c9a16b' },
                '&.Mui-selected': { color: '#c9a16b' }
              }
            }}>
            <Tab label="제품 추가" value="1" sx={{ color: '#c9a16b' }} />
            <Tab label="제품 검색" value="2" sx={{ color: '#c9a16b' }} />
            <Tab label="제품 수정" value="3" sx={{ color: '#c9a16b' }} />
            <Tab label="제품 삭제" value="4" sx={{ color: '#c9a16b' }} />
            <Tab label="즐겨찾기" value="5" sx={{ color: '#c9a16b' }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <TextField name="brand" placeholder="brand" fullWidth onChange={handleChange} value={item.brand} sx={{ mb: 2 }} />
          <TextField name="beans" placeholder="beans" fullWidth onChange={handleChange} value={item.beans} sx={{ mb: 2 }} />
          <Button fullWidth sx={{ padding: 2, backgroundColor: '#c9a16b', color: '#fff', '&:hover': { backgroundColor: '#d4b886' } }} variant="contained" onClick={addEventHandler}>
            제품 추가
          </Button>
        </TabPanel>
        <TabPanel value="2">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <Button fullWidth sx={{ padding: 2, backgroundColor: '#c9a16b', color: '#fff', '&:hover': { backgroundColor: '#d4b886' } }} variant="contained" onClick={searchEventHandler}>
            제품 검색
          </Button>
        </TabPanel>
        <TabPanel value="3">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <Button fullWidth variant="contained" onClick={getEventHandler} sx={{ mb: 8, padding: 2, backgroundColor: '#c9a16b', color: '#fff', '&:hover': { backgroundColor: '#d4b886' } }}>
            제품 검색
          </Button>
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <TextField name="brand" placeholder="brand" fullWidth onChange={handleChange} value={item.brand} sx={{ mb: 2 }} />
          <TextField name="beans" placeholder="beans" fullWidth onChange={handleChange} value={item.beans} sx={{ mb: 2 }} />
          <TextField name="id" placeholder="id" fullWidth onChange={handleChange} value={item.id} sx={{ mb: 2 }} />
          <Button fullWidth sx={{ padding: 2, backgroundColor: '#c9a16b', color: '#fff', '&:hover': { backgroundColor: '#d4b886' } }} variant="contained" onClick={editEventHandler}>
            제품 수정
          </Button>
        </TabPanel>
        <TabPanel value="4">
          <TextField name="title" placeholder="title" fullWidth onChange={handleChange} value={item.title} sx={{ mb: 2 }} />
          <Button fullWidth sx={{ padding: 2, backgroundColor: '#c9a16b', color: '#fff', '&:hover': { backgroundColor: '#d4b886' } }} variant="contained" onClick={deleteEventHandler}>
            제품 삭제
          </Button>
        </TabPanel>
        <TabPanel value="5">
          <Grid container spacing={2}>
            {favorites.data && favorites.data.length > 0 ? (
              favorites.data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ backgroundColor: '#d4b886' }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ mb: 2 }}>{item.title}</Typography>
                      <Tooltip title="Brand">
                        <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CoffeeIcon sx={{ mr: 1 }} /> {item.brand}
                        </Typography>
                      </Tooltip>
                      <Tooltip title="Beans">
                        <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <PublicIcon sx={{ mr: 1 }} /> {item.beans}
                        </Typography>
                      </Tooltip>
                      <Tooltip title="User ID">
                        <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <UserIcon sx={{ mr: 1 }} /> {username}
                        </Typography>
                      </Tooltip>
                      <Typography variant="body2" sx={{ mb: 1 }}>{item.id}</Typography>
                      <IconButton onClick={() => toggleFavorite(item.id)}>
                        {item.favorite ? <StarIcon sx={{ color: '#ff0000'}} /> : <StarBorderIcon />}
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" sx={{ mb: 1 }}>No favorites added yet.</Typography>
            )}
          </Grid>
        </TabPanel>
      </TabContext>

      <Divider sx={{ mb: 2, background: '#000000' }} />

      {value !== '5' && (
        <>
          <Box sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ maxWidth: 400 }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>{item.title}</Typography>
                        <Tooltip title="Brand">
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CoffeeIcon sx={{ mr: 1 }} /> {item.brand}
                          </Typography>
                        </Tooltip>
                        <Tooltip title="Beans">
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PublicIcon sx={{ mr: 1 }} /> {item.beans}
                          </Typography>
                        </Tooltip>
                        <Tooltip title="User ID">
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <UserIcon sx={{ mr: 1 }} /> {username}
                          </Typography>
                        </Tooltip>
                        <Typography variant="body2" sx={{ mb: 1 }}>{item.id}</Typography>
                        <IconButton onClick={() => toggleFavorite(item.id)}>
                          {item.favorite ? <StarIcon sx={{ color: '#ff0000'}} /> : <StarBorderIcon />}
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                items.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ maxWidth: 400 }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>{item.title}</Typography>
                        <Tooltip title="Brand">
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CoffeeIcon sx={{ mr: 1 }} /> {item.brand}
                          </Typography>
                        </Tooltip>
                        <Tooltip title="Beans">
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <PublicIcon sx={{ mr: 1 }} /> {item.beans}
                          </Typography>
                        </Tooltip>
                        <Tooltip title="User ID">
                          <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <UserIcon sx={{ mr: 1 }} /> {username}
                          </Typography>
                        </Tooltip>
                        <Typography variant="body2" sx={{ mb: 1 }}>{item.id}</Typography>
                        <IconButton onClick={() => toggleFavorite(item.id)}>
                          {item.favorite ? <StarIcon sx={{ color: '#ff0000'}} /> : <StarBorderIcon />}
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  )
}

export default AddCoffee;
