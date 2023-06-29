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

import IdeslocamentoListerDTO from '../src/interfaces/deslocamento/dtos/IdeslocamentoListerDTO'
import IdeslocamentoEditDTO from '../src/interfaces/deslocamento/dtos/IdeslocamentoEditDTO'

export default function DeslocamentoCard({
  id,
  kmInicial,
  kmFinal,
  inicioDeslocamento,
  fimDeslocamento,
  checkList,
  motivo,
  observacao,
  idCondutor,
  idVeiculo,
  idCliente,
}: IdeslocamentoListerDTO) {
  const [item, setItem] = useState<IdeslocamentoListerDTO>(
    null as unknown as IdeslocamentoListerDTO,
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
        `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      )

      if (response.ok) {
        console.log('O Deslocamento deletado com sucesso')
      } else {
        console.error('Ocorreu um erro ao deletar o cliente')
      }
    } catch (error) {
      console.error('Ocorreu um erro:', error)
    }
  }

  // função editar o cliente
  const handleEdit = async (id: string, data: IdeslocamentoEditDTO) => {
    try {
      const response = await fetch(
        `https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/${id}/EncerrarDeslocamento`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, ...data }),
        },
      )

      if (response.ok) {
        console.log('O Deslocamento editado com sucesso')
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
      kmInicial,
      kmFinal,
      inicioDeslocamento,
      fimDeslocamento,
      checkList,
      motivo,
      observacao,
      idCondutor,
      idVeiculo,
      idCliente,
    })
  }, [
    id,
    kmInicial,
    kmFinal,
    inicioDeslocamento,
    fimDeslocamento,
    checkList,
    motivo,
    observacao,
    idCondutor,
    idVeiculo,
    idCliente,
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
        title="Editar o deslocamento"
        isOpen={isOpenModal}
        onClose={handleClose}
      >
        <Box sx={{ mt: 3 }}>
          <Form onSubmit={(dados) => handleEdit(id, dados)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    name="kmFinal"
                    type="number"
                    fullWidth
                    id="kmFinal"
                    label="Km Final"
                    autoComplete="kmFinal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormTextField
                    fullWidth
                    type="date"
                    id="fimDeslocamento"
                    name="fimDeslocamento"
                    autoComplete="fimDeslocamento"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormTextField
                    fullWidth
                    name="observacao"
                    label="Observação"
                    type="text"
                    id="observacao"
                    autoComplete="observacao"
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
        title="Detalhes do deslocamento"
        isOpen={isOpenModalBig}
        onClose={() => setIsOpenModalBig(false)}
      >
        <Box sx={{ mt: 3, width: '345px' }}>
          <DialogContent>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Km Inicial:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.kmInicial}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography gutterBottom variant="h2">
                  Km Final:
                </Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.kmFinal}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Deslocamento Inicial:</Typography>
              </div>
              <div>
                <Typography variant="body2">
                  {item?.inicioDeslocamento}
                </Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Deslocamento Final:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.fimDeslocamento}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Check List:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.checkList}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Motivo:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.motivo}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Observação:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.observacao}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Id de Condutor:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.idCondutor}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Id de Veiculo:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.idVeiculo}</Typography>
              </div>
            </div>
            <div className="typographyContent">
              <div>
                <Typography variant="h2">Id de Cliente:</Typography>
              </div>
              <div>
                <Typography variant="body2">{item?.idCliente}</Typography>
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
              <Typography gutterBottom variant="h2">
                Km Inicial:
              </Typography>
            </div>
            <div>
              <Typography variant="body2">{kmInicial}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Km Final:</Typography>
            </div>
            <div>
              <Typography variant="body2">{kmFinal}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Deslocamento Inicial:</Typography>
            </div>
            <div>
              <Typography variant="body2">{inicioDeslocamento}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Deslocamento Final:</Typography>
            </div>
            <div>
              <Typography variant="body2">{fimDeslocamento}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Check List:</Typography>
            </div>
            <div>
              <Typography variant="body2">{checkList}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Motivo:</Typography>
            </div>
            <div>
              <Typography variant="body2">{motivo}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Observação:</Typography>
            </div>
            <div>
              <Typography variant="body2">{observacao}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Id de Condutor:</Typography>
            </div>
            <div>
              <Typography variant="body2">{idCondutor}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Id de Veiculo:</Typography>
            </div>
            <div>
              <Typography variant="body2">{idVeiculo}</Typography>
            </div>
          </div>
          <div className="typographyContent">
            <div>
              <Typography variant="h2">Id de Cliente:</Typography>
            </div>
            <div>
              <Typography variant="body2">{idCliente}</Typography>
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
