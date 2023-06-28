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

import Header from '../../../components/Header'
import CondutorCards from '../../../components/Condutor'
import NewModal from '../../../components/UI/Modal/NewModal'
import FormTextField from '../../../components/UI/Forms/FormTextField'

interface IformTextFieldCondutor {
  id: string
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export default function Home() {
  const [data, setData] = useState<IformTextFieldCondutor[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
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

  // Criação de metodo post
  const handleSubmit = async (data: IformTextFieldCondutor) => {
    try {
      const response = await fetch(
        'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
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
      <NewModal
        title="Novos Condutor"
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleSubmit(dados)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="nome"
                    label="Nome"
                    name="nome"
                    autoComplete="nome"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="numeroHabilitacao"
                    label="Número de Habilitação"
                    name="numeroHabilitacao"
                    autoComplete="numeroHabilitacao"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="catergoriaHabilitacao"
                    label="Categoria de Habilitação"
                    type="catergoriaHabilitacao"
                    id="catergoriaHabilitacao"
                    autoComplete="catergoriaHabilitacao"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="vencimentoHabilitacao"
                    label="Vencimento de Habilitacao"
                    type="date"
                    id="vencimentoHabilitacao"
                    autoComplete="vencimentoHabilitacao"
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
        <Header />

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
                <CondutorCards
                  key={item.id}
                  id={item.id}
                  nome={item.nome}
                  numeroHabilitacao={item.numeroHabilitacao}
                  catergoriaHabilitacao={item.catergoriaHabilitacao}
                  vencimentoHabilitacao={item.vencimentoHabilitacao}
                />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}
