'use client'

import React, { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Grid,
  Typography,
  CardContent,
  Card,
  DialogContent,
  DialogActions,
} from '@mui/material'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined'

import { Form } from '@unform/web'

import NewModal from '../components/UI/Modal/NewModal'
import FormTextField from '../components/UI/Forms/FormTextField'
import Swal from 'sweetalert2'

import IclienteListerDTO from '../src/interfaces/clientes/dtos/IclienteListerDTO'
import IclienteEditDTO from '../src/interfaces/clientes/dtos/IclienteEditDTO'

export default function ActionAreaCard({
  id,
  numeroDocumento,
  tipoDocumento,
  nome,
  logradouro,
  numero,
  bairro,
  cidade,
  uf,
}: IclienteListerDTO) {
  const [item, setItem] = useState<IclienteListerDTO>(
    null as unknown as IclienteListerDTO,
  )
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModalBig, setIsOpenModalBig] = useState(false)

  const handleDeleteAlert = (id: string) => {
    Swal.fire({
      title: 'Você realmente quer excluir esse item?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim, tenho certeza',
      denyButtonText: `Não, mudei de ideia`,
      icon: 'question',
    }).then((result) => {
      handleDelete(id)
      if (result.isConfirmed) {
        Swal.fire('O item foi excluido com sucesso!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Nenhuma mudanção foi feita', '', 'info')
      }
    })
  }

  // função para deletar o cliente
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      )

      if (response.ok) {
        console.log('Cliente deletado com sucesso')
      } else {
        console.error('Ocorreu um erro ao deletar o cliente')
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error)
    }
  }

  // função editar o cliente
  const handleEdit = async (id: string, data: IclienteEditDTO) => {
    try {
      const response = await fetch(
        `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, ...data }),
        },
      )

      if (response.ok) {
        console.log('Cliente editado com sucesso')
      } else {
        console.error('Ocorreu um erro ao editar o cliente')
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error)
    }
  }

  // permite que busca os elementos do meu card e mostra de forma simplificada,
  // como são as mesmas informações que aparecerem no card, em vez de ir buscar pelo api
  useEffect(() => {
    setItem({
      id,
      numeroDocumento,
      tipoDocumento,
      nome,
      logradouro,
      numero,
      bairro,
      cidade,
      uf,
    })
  }, [
    id,
    numeroDocumento,
    tipoDocumento,
    nome,
    logradouro,
    numero,
    bairro,
    cidade,
    uf,
  ])

  const toggleModal = () => {
    setIsOpenModal(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  return (
    <div>
      <NewModal
        title="Editar o cliente"
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleEdit(id, dados)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    autoComplete="numeroDocumento"
                    name="numeroDocumento"
                    fullWidth
                    id="numeroDocumento"
                    label="Numero do Documento"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="tipoDocumento"
                    label="Tipo de Documento"
                    name="tipoDocumento"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="nome"
                    label="Nome"
                    name="nome"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    id="logradouro"
                    label="Logradouro"
                    name="logradouro"
                    autoComplete="logradouro"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
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

      <NewModal
        title="Detalhes do cliente"
        isOpen={isOpenModalBig}
        onClose={() => setIsOpenModalBig(false)}
      >
        <Box sx={{ mt: 3, width: '345px' }}>
          <DialogContent>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Número de Documento:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.numeroDocumento}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Tipo de Documento:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.tipoDocumento}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Nome:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.nome}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Logradouro:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.logradouro}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Número:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.numero}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Bairro:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.bairro}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Cidade:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.cidade}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">uf:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.uf}</Typography>
              </div>
            </div>
          </DialogContent>
        </Box>
      </NewModal>
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AutoDeleteOutlinedIcon
            sx={{ cursor: 'pointer', color: 'red' }}
            fontSize="large"
            onClick={() => handleDeleteAlert(id)}
          />
          <EditNoteOutlinedIcon
            sx={{ cursor: 'pointer', color: '#3B4B95', marginLeft: '8px' }}
            fontSize="large"
            onClick={toggleModal}
          />
        </CardContent>

        <CardContent sx={{ textAlign: 'initial' }}>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Número de Documento:</Typography>
            </div>
            <div>
              <Typography variant="body2">{numeroDocumento}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Tipo de Documento:</Typography>
            </div>
            <div>
              <Typography variant="body2">{tipoDocumento}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Nome:</Typography>
            </div>
            <div>
              <Typography variant="body2">{nome}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Logradouro:</Typography>
            </div>
            <div>
              <Typography variant="body2">{logradouro}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Número:</Typography>
            </div>
            <div>
              <Typography variant="body2">{numero}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Bairro:</Typography>
            </div>
            <div>
              <Typography variant="body2">{bairro}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Cidade:</Typography>
            </div>
            <div>
              <Typography variant="body2">{cidade}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">uf:</Typography>
            </div>
            <div>
              <Typography variant="body2">{uf}</Typography>
            </div>
          </div>
        </CardContent>
        <CardContent>
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenModalBig(true)
            }}
            sx={{ width: '100%' }}
          >
            Ver detalhes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
