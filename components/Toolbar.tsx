'use client'

import { useState } from 'react'
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

import NewModal from '../components/UI/Modal/NewModal'
import FormTextField from '../components/UI/Forms/FormTextField'

interface IformTextFieldClients {
  id: string
  numeroDocumento: string
  tipoDocumento: string
  nome: string
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}

export default function BarraDeFerramentas() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  // Criação de metodo post
  const handleSubmit = async (data: IformTextFieldClients) => {
    try {
      const response = await fetch(
        'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
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
        title="Novos Clientes"
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleSubmit(dados)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    autoComplete="numeroDocumento"
                    name="numeroDocumento"
                    required
                    fullWidth
                    id="numeroDocumento"
                    label="Numero do Documento"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    required
                    fullWidth
                    id="tipoDocumento"
                    label="Tipo de Documento"
                    name="tipoDocumento"
                    autoComplete="tipoDocumento"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    required
                    fullWidth
                    id="nome"
                    label="Nome"
                    name="nome"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    required
                    fullWidth
                    id="logradouro"
                    label="Logradouro"
                    name="logradouro"
                    autoComplete="logradouro"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    fullWidth
                    name="numero"
                    label="Numero"
                    type="numero"
                    id="numero"
                    autoComplete="numero"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    fullWidth
                    name="bairro"
                    label="Bairro"
                    type="bairro"
                    id="bairro"
                    autoComplete="bairro"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    fullWidth
                    name="cidade"
                    label="Cidade"
                    type="cidade"
                    id="cidade"
                    autoComplete="cidade"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    required
                    fullWidth
                    name="uf"
                    label="Uf"
                    type="uf"
                    id="uf"
                    autoComplete="uf"
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
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', padding: '0px', gap: '8px' }}
      >
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
      </Container>
    </>
  )
}
