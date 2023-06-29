'use client'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  Container,
  DialogContent,
  DialogActions,
} from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import { Form } from '@unform/web'

import VeiculoCards from '../../../components/Veiculo'
import NewModal from '../../../components/UI/Modal/NewModal'
import FormTextField from '../../../components/UI/Forms/FormTextField'

interface IformTextFieldVeiculo {
  id: string
  placa: string
  marcaModelo: string
  anoFabricacao: string
  kmAtual: string
}

export default function Veiculo() {
  const [data, setData] = useState<IformTextFieldVeiculo[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
        )
        const jsonData = await response.json()
        setData(jsonData)
        console.log('catiano', jsonData)
      } catch (error) {
        console.error('Ocorreu um erro:', error)
      }
    }

    fetchData()
  }, [])

  // funcão para add novos items, usando metodo post
  const handleSubmit = async (data: IformTextFieldVeiculo) => {
    try {
      const response = await fetch(
        'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )

      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.error('Ocorreu um erro:', error)
    }
  }

  const toggleModal = () => {
    setIsOpenModal(true)
  }
  const handleClose = () => {
    setIsOpenModal(false)
  }
  return (
    <>
      <NewModal title="Novos carros" isOpen={isOpenModal} onClose={handleClose}>
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleSubmit(dados)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="placa"
                    label="Placa do veiculo"
                    name="placa"
                    autoComplete="placa"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="marcaModelo"
                    label="Marca do veiculo"
                    name="marcaModelo"
                    autoComplete="marcaModelo"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="anoFabricacao"
                    label="Ano de Fabricação"
                    type="anoFabricacao"
                    id="anoFabricacao"
                    autoComplete="anoFabricacao"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="kmAtual"
                    label="Km Atual"
                    type="kmAtual"
                    id="kmAtual"
                    autoComplete="kmAtual"
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Form>
        </Box>
      </NewModal>
      <Container maxWidth="lg">
        <div>
          <section className="headerContent">
            <Box flex={1} display="flex" justifyContent="end">
              <Button
                color="primary"
                disableElevation
                variant="contained"
                endIcon={<AddOutlinedIcon />}
                onClick={toggleModal}
              >
                Novo
              </Button>
            </Box>
          </section>

          <section>
            <div className="productCards">
              {data?.map((item) => (
                <VeiculoCards
                  key={item.id}
                  id={item.id}
                  placa={item.placa}
                  marcaModelo={item.marcaModelo}
                  anoFabricacao={item.anoFabricacao}
                  kmAtual={item.kmAtual}
                />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}
