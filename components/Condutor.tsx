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

interface Props {
  id: string
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

interface IformTextFields {
  id?: string
  nome?: string
  numeroHabilitacao?: string
  catergoriaHabilitacao?: string
  vencimentoHabilitacao: string
}

interface IformTextFieldDetalhe {
  id: string
  nome: string
  numeroHabilitacao: string
  catergoriaHabilitacao: string
  vencimentoHabilitacao: string
}

export default function CondutoCard({
  id,
  nome,
  numeroHabilitacao,
  catergoriaHabilitacao,
  vencimentoHabilitacao,
}: Props) {
  const [item, setItem] = useState<IformTextFieldDetalhe>(
    null as unknown as IformTextFieldDetalhe,
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
        `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
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
  const handleEdit = async (id: string, data: IformTextFields) => {
    try {
      const response = await fetch(
        `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${id}`,
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
      catergoriaHabilitacao,
      nome,
      vencimentoHabilitacao,
      id,
      numeroHabilitacao,
    })
  }, [
    catergoriaHabilitacao,
    id,
    nome,
    numeroHabilitacao,
    vencimentoHabilitacao,
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
        title="Editar o condutor"
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleEdit(id, dados)}>
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

      <NewModal
        title="Detalhes do condutor"
        isOpen={isOpenModalBig}
        onClose={() => setIsOpenModalBig(false)}
      >
        <Box sx={{ mt: 3, width: '345px' }}>
          <DialogContent>
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
                <Typography variant="h2">Número de Habilitação:</Typography>
              </div>
              <div>
                <Typography variant="body2">
                  {item?.numeroHabilitacao}
                </Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Categoria de Habilitação:</Typography>
              </div>
              <div>
                <Typography variant="body2">
                  {item?.catergoriaHabilitacao}
                </Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Vencimento de Habilitação:</Typography>
              </div>
              <div>
                <Typography variant="body2">
                  {item?.vencimentoHabilitacao}
                </Typography>
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
        <CardContent>
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
              <Typography variant="h2">Número de Habilitação:</Typography>
            </div>
            <div>
              <Typography variant="body2">{numeroHabilitacao}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Categoria de Habilitação:</Typography>
            </div>
            <div>
              <Typography variant="body2">{catergoriaHabilitacao}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Vencimento de Habilitação:</Typography>
            </div>
            <div>
              <Typography variant="body2">{vencimentoHabilitacao}</Typography>
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
